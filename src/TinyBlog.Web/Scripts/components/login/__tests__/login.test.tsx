import * as React from 'react';
import { shallow } from 'enzyme';
import { Login, AllProps } from '../index';

describe('<Login />', () => {
    const defaultProps: AllProps = {
        auth: {
            username: '',
            passwordToken: null,
            isAuthorized: false,
            isFetching: false
        },
        getToken: jest.fn()
    };

    it('call for token on create', () => {
        const getToken = jest.fn();
        const props = {...defaultProps, getToken};
        shallow(<Login {...props} />);
        expect(getToken.mock.calls.length).toEqual(1);
    });

    it('should render child component if authorized', () => {
        const newProps = { ...defaultProps, auth: {...defaultProps.auth, isAuthorized: true} };
        const wrapper = shallow(<Login {...newProps}><div className="test-flag" /></Login>);
        expect(wrapper.exists('.test-flag')).toBeTruthy();
    });

    it('should not render child component if not authorized', () => {
        const wrapper = shallow(<Login {...defaultProps}><div className="test-flag" /></Login>);
        expect(wrapper.exists('.test-flag')).toBeFalsy();
        expect(wrapper.exists('Connect(LoginForm)')).toBeTruthy();
    });

    it('should render change password form if token present', () => {
        const newProps = { ...defaultProps, auth: { ...defaultProps.auth, passwordToken: 'token' } };
        const wrapper = shallow(<Login {...newProps}><div className="test-flag" /></Login>);
        expect(wrapper.exists('.test-flag')).toBeFalsy();
        expect(wrapper.exists('Connect(ChangePassword)')).toBeTruthy();
    });
});