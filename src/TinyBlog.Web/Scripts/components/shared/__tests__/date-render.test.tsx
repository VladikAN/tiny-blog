import * as React from "react";
import { shallow } from "enzyme";
import DateRender, { AllProps } from "../date-render";

describe("<DateRender />", () => {
    it("should render month name and year", () => {
        const props: AllProps = { date: new Date(2019, 4, 1) };
        const wrapper = shallow(<DateRender {...props} />);
        expect(wrapper.find("span").text()).toEqual("may 2019");
    });

    it ("should not render for null props", () => {
        const props: AllProps = { date: null };
        const wrapper = shallow(<DateRender {...props} />);
        expect(wrapper.find("span").length).toEqual(0);
    });
});