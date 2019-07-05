import * as React from 'react';
import { shallow } from 'enzyme';
import { LoginForm, AllProps } from '../login-form';

describe('<LoginForm />', () => {
    const defaultProps: AllProps = {
        authCredentials: jest.fn()
    };

    it('should render login form with username and password inputs', () => {
        const wrapper = shallow(<LoginForm {...defaultProps} />);
        const username = wrapper.find('form input[type=\'text\'][name=\'username\']');
        const password = wrapper.find('form input[type=\'password\'][name=\'password\']');
        const submit = wrapper.find('form button[type=\'submit\']');

        expect(username).toHaveLength(1);
        expect(password).toHaveLength(1);
        expect(submit).toHaveLength(1);
    });

    it('update username state on input change', () => {
        const wrapper = shallow(<LoginForm {...defaultProps} />);
        const input = wrapper.find('form input[type=\'text\'][name=\'username\']');

        input.simulate('change', { currentTarget: { name: 'username', value: 'my-name' } });

        expect(wrapper.state('username')).toEqual('my-name');
    });

    it('update password state on input change', () => {
        const wrapper = shallow(<LoginForm {...defaultProps} />);
        const input = wrapper.find('form input[type=\'password\'][name=\'password\']');

        input.simulate('change', { currentTarget: { name: 'password', value: 'my-password' } });

        expect(wrapper.state('password')).toEqual('my-password');
    });

    it('call for authorize with username/password from state', () => {
        const authCredentials = jest.fn();
        const props = {...defaultProps, authCredentials};
        const wrapper = shallow(<LoginForm {...props} />);

        wrapper.setState({username: 'my-name', password: 'my-password'});
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        expect(authCredentials.mock.calls.length).toEqual(1);
        expect(authCredentials.mock.calls[0][0]).toEqual('my-name');
        expect(authCredentials.mock.calls[0][1]).toEqual('my-password');
    });
});