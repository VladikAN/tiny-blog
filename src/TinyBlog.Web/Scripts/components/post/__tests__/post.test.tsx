import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import { MemoryRouter } from 'react-router-dom';
import { Post, AllProps } from '..';
import { strings } from '../../../localization';

jest.mock('../../shared/zone-post-publish', () => {
    const MockZonePostPublish = () => <div data-testid="zone-publish" />;
    return MockZonePostPublish;
});
jest.mock('../../shared/zone-post-delete', () => {
    const MockZonePostDelete = () => <div data-testid="zone-delete" />;
    return MockZonePostDelete;
});

const renderPost = (props: AllProps) => render(
    <ConfigProvider>
        <MemoryRouter>
            <Post {...props} />
        </MemoryRouter>
    </ConfigProvider>
);

describe('<Post />', () => {
    const editProps: AllProps = {
        entityId: '1',
        post: {
            id: '1',
            title: 'title',
            linkText: 'link',
            previewText: 'preview',
            fullText: 'full',
            tags: ['tg1'],
            isPublished: true,
            isFetching: false,
            isFetched: true
        },
        loadPost: jest.fn(),
        resetPost: jest.fn(),
        savePost: jest.fn()
    };

    const createProps: AllProps = {
        entityId: undefined,
        post: {
            id: '',
            title: '',
            linkText: '',
            previewText: '',
            fullText: '',
            isFetching: false,
            isFetched: true
        },
        loadPost: jest.fn(),
        resetPost: jest.fn(),
        savePost: jest.fn()
    };

    it('should show publish/unpublish zone for edit mode', () => {
        renderPost({ ...editProps, post: { ...editProps.post } });
        expect(screen.getByTestId('zone-publish')).toBeTruthy();
    });

    it('should hide publish/unpublish zone for create mode', () => {
        renderPost({ ...createProps, post: { ...createProps.post } });
        expect(screen.queryByTestId('zone-publish')).toBeNull();
    });

    it('should show delete zone for edit mode and unpublished post', () => {
        renderPost({
            ...editProps,
            post: { ...editProps.post, isPublished: false }
        });
        expect(screen.getByTestId('zone-delete')).toBeTruthy();
    });

    it('should hide delete zone for edit mode and published post', () => {
        renderPost({ ...editProps, post: { ...editProps.post } });
        expect(screen.queryByTestId('zone-delete')).toBeNull();
    });

    it('should hide delete zone for create mode', () => {
        renderPost({ ...createProps, post: { ...createProps.post } });
        expect(screen.queryByTestId('zone-delete')).toBeNull();
    });
});
