import * as React from "react";
import { shallow } from "enzyme";
import { Login, AllProps } from "./../index";

describe("<Login />", () => {
    const defaultProps: AllProps = { 
        auth: { 
            isAuthorized: false, 
            isFetching: false 
        }, 
        getToken: jest.fn(), 
        authCredentials: jest.fn()  };

    it("should render child component if authorized", () => {
        const props = { ...defaultProps, auth: {...defaultProps.auth, isAuthorized: true} };
        const wrapper = shallow(<Login {...props}><div className="test-flag"></div></Login>);
        const child = wrapper.find(".test-flag");
        expect(child).toHaveLength(1);

    });

    it("should not render child component if not authorized", () => {
        const props = { ...defaultProps };
        const wrapper = shallow(<Login {...props}><div className="test-flag"></div></Login>);
        const child = wrapper.find(".test-flag");
        expect(child).toHaveLength(0);
    });

    it("should render login form with username and password inputs", () => {
        const props = { ...defaultProps };
        const wrapper = shallow(<Login {...props} />);

        const username = wrapper.find("form input[type='text'][name='username']");
        expect(username).toHaveLength(1);
        const password = wrapper.find("form input[type='password'][name='password']");
        expect(password).toHaveLength(1);
        const submit = wrapper.find("form button[type='submit']");
        expect(submit).toHaveLength(1);
    });
});