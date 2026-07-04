import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfigProvider, Modal } from 'antd';
import { ZonePostPublish, AllProps } from '../zone-post-publish';
import { strings } from '../../../localization';

const renderZone = (props: AllProps) => render(
    <ConfigProvider>
        <ZonePostPublish {...props} />
    </ConfigProvider>
);

describe('<ZonePostPublish />', () => {
    let modalConfirm: jest.SpyInstance;

    beforeEach(() => {
        modalConfirm = jest.spyOn(Modal, 'confirm').mockImplementation(() => ({ destroy: jest.fn(), update: jest.fn() }));
    });

    afterEach(() => {
        modalConfirm.mockRestore();
    });

    const defaultPublished: AllProps = { id: '1', isPublished: true, togglePost: jest.fn() };
    const defaultUnpublished: AllProps = { id: '1', isPublished: false, togglePost: jest.fn() };

    it('should render description and action button for published post', () => {
        renderZone(defaultPublished);
        expect(screen.getByText(strings.post_zone_unpublish_description)).toBeTruthy();
        expect(screen.getByRole('button', { name: strings.post_zone_unpublish_button })).toBeTruthy();
    });

    it('should render description and action button for unpublished post', () => {
        renderZone(defaultUnpublished);
        expect(screen.getByText(strings.post_zone_publish_description)).toBeTruthy();
        expect(screen.getByRole('button', { name: strings.post_zone_publish_button })).toBeTruthy();
    });

    it('should show confirmation on unpublish attempt', () => {
        renderZone(defaultPublished);
        fireEvent.click(screen.getByRole('button', { name: strings.post_zone_unpublish_button }));
        expect(modalConfirm.mock.calls).toHaveLength(1);
        expect(modalConfirm.mock.calls[0][0].title).toEqual(strings.post_zone_unpublish_confirm);
    });

    it('should show confirmation on publish attempt', () => {
        renderZone(defaultUnpublished);
        fireEvent.click(screen.getByRole('button', { name: strings.post_zone_publish_button }));
        expect(modalConfirm.mock.calls).toHaveLength(1);
        expect(modalConfirm.mock.calls[0][0].title).toEqual(strings.post_zone_publish_confirm);
    });

    it('should not call dispatch on rejected confirmation to unpublish', () => {
        const togglePostMock = jest.fn();
        renderZone({ ...defaultPublished, togglePost: togglePostMock });
        fireEvent.click(screen.getByRole('button', { name: strings.post_zone_unpublish_button }));
        expect(togglePostMock.mock.calls).toHaveLength(0);
    });

    it('should call dispatch on confirm to unpublish', () => {
        const togglePostMock = jest.fn();
        modalConfirm.mockImplementation(({ onOk }) => {
            onOk?.();
            return { destroy: jest.fn(), update: jest.fn() };
        });

        renderZone({ ...defaultPublished, togglePost: togglePostMock });
        fireEvent.click(screen.getByRole('button', { name: strings.post_zone_unpublish_button }));

        expect(togglePostMock.mock.calls).toHaveLength(1);
        expect(togglePostMock.mock.calls[0][0]).toEqual('1');
        expect(togglePostMock.mock.calls[0][1]).toEqual(false);
    });

    it('should not call dispatch on rejected confirmation to publish', () => {
        const togglePostMock = jest.fn();
        renderZone({ ...defaultUnpublished, togglePost: togglePostMock });
        fireEvent.click(screen.getByRole('button', { name: strings.post_zone_publish_button }));
        expect(togglePostMock.mock.calls).toHaveLength(0);
    });

    it('should call dispatch on confirm to publish', () => {
        const togglePostMock = jest.fn();
        modalConfirm.mockImplementation(({ onOk }) => {
            onOk?.();
            return { destroy: jest.fn(), update: jest.fn() };
        });

        renderZone({ ...defaultUnpublished, togglePost: togglePostMock });
        fireEvent.click(screen.getByRole('button', { name: strings.post_zone_publish_button }));

        expect(togglePostMock.mock.calls).toHaveLength(1);
        expect(togglePostMock.mock.calls[0][0]).toEqual('1');
        expect(togglePostMock.mock.calls[0][1]).toEqual(true);
    });
});
