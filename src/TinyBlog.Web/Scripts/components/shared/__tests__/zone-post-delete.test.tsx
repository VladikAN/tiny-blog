import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfigProvider, Modal } from 'antd';
import { ZonePostDelete, AllProps } from '../zone-post-delete';
import { strings } from '../../../localization';

const renderZone = (props: AllProps) => render(
    <ConfigProvider>
        <ZonePostDelete {...props} />
    </ConfigProvider>
);

describe('<ZonePostDelete />', () => {
    let modalConfirm: jest.SpyInstance;

    beforeEach(() => {
        modalConfirm = jest.spyOn(Modal, 'confirm').mockImplementation(() => ({ destroy: jest.fn(), update: jest.fn() }));
    });

    afterEach(() => {
        modalConfirm.mockRestore();
    });

    const defaultProps: AllProps = { id: '1', deletePost: jest.fn() };

    it('should render description and action button for delete zone', () => {
        renderZone(defaultProps);
        expect(screen.getByText(strings.post_zone_delete_description)).toBeTruthy();
        expect(screen.getByRole('button', { name: strings.post_zone_delete_button })).toBeTruthy();
    });

    it('should show confirmation on delete attempt', () => {
        renderZone(defaultProps);
        fireEvent.click(screen.getByRole('button', { name: strings.post_zone_delete_button }));
        expect(modalConfirm.mock.calls).toHaveLength(1);
        expect(modalConfirm.mock.calls[0][0].title).toEqual(strings.post_zone_delete_confirm);
    });

    it('should not call dispatch on rejected confirmation to delete', () => {
        const deletePostMock = jest.fn();
        renderZone({ ...defaultProps, deletePost: deletePostMock });
        fireEvent.click(screen.getByRole('button', { name: strings.post_zone_delete_button }));
        expect(deletePostMock.mock.calls).toHaveLength(0);
    });

    it('should call dispatch on confirm to delete', () => {
        const deletePostMock = jest.fn();
        modalConfirm.mockImplementation(({ onOk }) => {
            onOk?.();
            return { destroy: jest.fn(), update: jest.fn() };
        });

        renderZone({ ...defaultProps, deletePost: deletePostMock });
        fireEvent.click(screen.getByRole('button', { name: strings.post_zone_delete_button }));

        expect(deletePostMock.mock.calls).toHaveLength(1);
        expect(deletePostMock.mock.calls[0][0]).toEqual('1');
    });
});
