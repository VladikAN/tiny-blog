import * as React from 'react';
import { Post, AllProps } from '..';
import { shallow } from 'enzyme';

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
        savePost: jest.fn
    };

    const createProps: AllProps = {
        entityId: null,
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
        savePost: jest.fn
    };

    it ('should show publish/unpublish zone for edit mode', () => {
        const props = { ...editProps, post: { ...editProps.post } };
        const wrapper = shallow(<Post {...props} />);
        expect(wrapper.exists('Connect(ZonePostPublish)')).toBeTruthy();
    });

    it ('should hide publish/unpublish zone for create mode', () => {
        const props = { ...createProps, post: { ...createProps.post } };
        const wrapper = shallow(<Post {...props} />);
        expect(wrapper.exists('Connect(ZonePostPublish)')).toBeFalsy();
    });

    it ('should show delete zone for edit mode and unpublished post', () => {
        const props = { ...editProps, post: { ...editProps.post, isPublished: false } };
        const wrapper = shallow(<Post {...props} />);
        expect(wrapper.exists('Connect(ZonePostDelete)')).toBeTruthy();
    });

    it ('should hide delete zone for edit mode and published post', () => {
        const props = { ...editProps, post: { ...editProps.post } };
        const wrapper = shallow(<Post {...props} />);
        expect(wrapper.exists('Connect(ZonePostDelete)')).toBeFalsy();
    });

    it ('should hide delete zone for create mode', () => {
        const props = { ...createProps, post: { ...createProps.post } };
        const wrapper = shallow(<Post {...props} />);
        expect(wrapper.exists('Connect(ZonePostDelete)')).toBeFalsy();
    });
});