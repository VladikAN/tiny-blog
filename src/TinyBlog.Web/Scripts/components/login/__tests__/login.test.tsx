import * as React from 'react';
import { shallow } from 'enzyme';
import { Login, AllProps } from '../index';

describe('<Login />', () => {
    const defaultProps: AllProps = {
        auth: {
            username: '',
            isAuthorized: false,
            isFetching: false
        },
        getToken: jest.fn(),
        authCredentials: jest.fn() };

    it('should render child component if authorized', () => {
        const props = { ...defaultProps, auth: {...defaultProps.auth, isAuthorized: true} };
        const wrapper = shallow(<Login {...props}><div className="test-flag" /></Login>);
        const child = wrapper.find('.test-flag');

        expect(child).toHaveLength(1);

    });

    it('should not render child component if not authorized', () => {
        const wrapper = shallow(<Login {...defaultProps}><div className="test-flag" /></Login>);
        const child = wrapper.find('.test-flag');

        expect(child).toHaveLength(0);
    });

    it('should render login form with username and password inputs', () => {
        const wrapper = shallow(<Login {...defaultProps} />);
        const username = wrapper.find('form input[type=\'text\'][name=\'username\']');
        const password = wrapper.find('form input[type=\'password\'][name=\'password\']');
        const submit = wrapper.find('form button[type=\'submit\']');

        expect(username).toHaveLength(1);
        expect(password).toHaveLength(1);
        expect(submit).toHaveLength(1);
    });

    it('update username state on input change', () => {
        const wrapper = shallow(<Login {...defaultProps} />);
        const input = wrapper.find('form input[type=\'text\'][name=\'username\']');

        input.simulate('change', { currentTarget: { name: 'username', value: 'my-name' } });

        expect(wrapper.state('username')).toEqual('my-name');
    });

    it('update password state on input change', () => {
        const wrapper = shallow(<Login {...defaultProps} />);
        const input = wrapper.find('form input[type=\'password\'][name=\'password\']');

        input.simulate('change', { currentTarget: { name: 'password', value: 'my-password' } });

        expect(wrapper.state('password')).toEqual('my-password');
    });

    it('call for token on create', () => {
        const getToken = jest.fn();
        const props = {...defaultProps, getToken};
        shallow(<Login {...props} />);

        expect(getToken.mock.calls.length).toEqual(1);
    });

    it('call for authorize with username/password from state', () => {
        const authCredentials = jest.fn();
        const props = {...defaultProps, authCredentials};
        const wrapper = shallow(<Login {...props} />);

        wrapper.setState({username: 'my-name', password: 'my-password'});
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        expect(authCredentials.mock.calls.length).toEqual(1);
        expect(authCredentials.mock.calls[0][0]).toEqual('my-name');
        expect(authCredentials.mock.calls[0][1]).toEqual('my-password');
    });
});