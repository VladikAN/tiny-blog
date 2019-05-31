import * as React from 'react';
import { ZonePostPublish, AllProps } from '../zone-post-publish';
import { mount } from 'enzyme';
import { strings } from '../../../localization';

describe('<ZonePostPublish />', () => {
    let confirmMock:jest.Mock = null;
    beforeEach(() => {
        confirmMock = jest.fn();
        window.confirm = confirmMock;
    });
    
    const defaultPublished: AllProps = { id: '1', isPublished: true, togglePost: jest.fn() };
    const defaultUnpublished: AllProps = { id: '1', isPublished: false, togglePost: jest.fn() };

    it ('should render description and action button for published post', () => {
        const wrapper = mount(<ZonePostPublish {...defaultPublished} />);
        expect(wrapper.find('.zone__text').text()).toEqual(strings.post_zone_unpublish_description);
        expect(wrapper.find('.zone__button button').text()).toEqual(strings.post_zone_unpublish_button);
    });

    it ('should render description and action button for unpublished post', () => {
        const wrapper = mount(<ZonePostPublish {...defaultUnpublished} />);
        expect(wrapper.find('.zone__text').text()).toEqual(strings.post_zone_publish_description);
        expect(wrapper.find('.zone__button button').text()).toEqual(strings.post_zone_publish_button);
    });

    it ('should show confirmation on unpublish attempt', () => {
        const wrapper = mount(<ZonePostPublish {...defaultPublished} />);
        wrapper.find('.zone__button button').simulate('click');
        expect(confirmMock.mock.calls).toHaveLength(1);
        expect(confirmMock.mock.calls[0][0]).toEqual(strings.post_zone_unpublish_confirm);
    });

    it ('should show confirmation on publish attempt', () => {
        const wrapper = mount(<ZonePostPublish {...defaultUnpublished} />);
        wrapper.find('.zone__button button').simulate('click');
        expect(confirmMock.mock.calls).toHaveLength(1);
        expect(confirmMock.mock.calls[0][0]).toEqual(strings.post_zone_publish_confirm);
    });

    it ('should not call dispatch on rejected confirmation to unpublish', () => {
        const togglePostMock = jest.fn();
        confirmMock = jest.fn(() => false);
        window.confirm = confirmMock;

        const props = {...defaultPublished, togglePost: togglePostMock };
        const wrapper = mount(<ZonePostPublish {...props } />);
        wrapper.find('.zone__button button').simulate('click');

        expect(togglePostMock.mock.calls).toHaveLength(0);
    });

    it ('should call dispatch on confirm to unpublish', () => {
        const togglePostMock = jest.fn();
        confirmMock = jest.fn(() => true);
        window.confirm = confirmMock;

        const props = {...defaultPublished, togglePost: togglePostMock };
        const wrapper = mount(<ZonePostPublish {...props } />);
        wrapper.find('.zone__button button').simulate('click');

        expect(togglePostMock.mock.calls).toHaveLength(1);
        expect(togglePostMock.mock.calls[0][0]).toEqual(props.id);
        expect(togglePostMock.mock.calls[0][1]).toEqual(!props.isPublished);
    });

    it ('should not call dispatch on rejected confirmation to publish', () => {
        const togglePostMock = jest.fn();
        confirmMock = jest.fn(() => false);
        window.confirm = confirmMock;

        const props = {...defaultUnpublished, togglePost: togglePostMock };
        const wrapper = mount(<ZonePostPublish {...props} />);
        wrapper.find('.zone__button button').simulate('click');

        expect(togglePostMock.mock.calls).toHaveLength(0);
    });

    it ('should call dispatch on confirm to publish', () => {
        const togglePostMock = jest.fn();
        confirmMock = jest.fn(() => true);
        window.confirm = confirmMock;

        const props = {...defaultUnpublished, togglePost: togglePostMock };
        const wrapper = mount(<ZonePostPublish {...props} />);
        wrapper.find('.zone__button button').simulate('click');

        expect(togglePostMock.mock.calls).toHaveLength(1);
        expect(togglePostMock.mock.calls[0][0]).toEqual(props.id);
        expect(togglePostMock.mock.calls[0][1]).toEqual(!props.isPublished);
    });
});