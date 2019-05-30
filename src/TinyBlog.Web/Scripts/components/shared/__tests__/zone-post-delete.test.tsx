import * as React from "react";
import { ZonePostDelete, AllProps } from "../zone-post-delete";
import { mount } from "enzyme";
import { strings } from "../../../localization";

describe("<ZonePostDelete />", () => {
    let confirmMock:jest.Mock = null;
    beforeEach(() => {
        confirmMock = jest.fn();
        window.confirm = confirmMock;
    });
    
    const defaultProps: AllProps = { id: "1", deletePost: jest.fn() };

    it ("should render description and action button for delete zone", () => {
        const wrapper = mount(<ZonePostDelete {...defaultProps} />);
        expect(wrapper.find(".zone__text").text()).toEqual(strings.post_zone_delete_description);
        expect(wrapper.find(".zone__button button").text()).toEqual(strings.post_zone_delete_button);
    });

    it ("should show confirmation on delete attempt", () => {
        const wrapper = mount(<ZonePostDelete {...defaultProps} />);
        wrapper.find(".zone__button button").simulate("click");
        expect(confirmMock.mock.calls).toHaveLength(1);
        expect(confirmMock.mock.calls[0][0]).toEqual(strings.post_zone_delete_confirm);
    });

    it ("should not call dispatch on rejected confirmation to delete", () => {
        const deletePostMock = jest.fn();
        confirmMock = jest.fn(() => false);
        window.confirm = confirmMock;

        const props = {...defaultProps, deletePost: deletePostMock };
        const wrapper = mount(<ZonePostDelete {...props } />);
        wrapper.find(".zone__button button").simulate("click");

        expect(deletePostMock.mock.calls).toHaveLength(0);
    });

    it ("should call dispatch on confirm to delete", () => {
        const deletePostMock = jest.fn();
        confirmMock = jest.fn(() => true);
        window.confirm = confirmMock;

        const props = {...defaultProps, deletePost: deletePostMock };
        const wrapper = mount(<ZonePostDelete {...props } />);
        wrapper.find(".zone__button button").simulate("click");

        expect(deletePostMock.mock.calls).toHaveLength(1);
        expect(deletePostMock.mock.calls[0][0]).toEqual(props.id);
    });
});