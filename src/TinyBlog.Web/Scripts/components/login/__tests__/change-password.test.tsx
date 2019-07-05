import * as React from 'react';
import { shallow } from 'enzyme';
import { ChangePassword, AllProps } from '../change-password';

describe('<ChangePassword />', () => {
    const defaultProps: AllProps = {
        auth: {
            username: 'user',
            passwordToken: 'token',
            isAuthorized: false,
            isFetching: false
        },
        changePassword: jest.fn()
    };

    it('should render change password form with input', () => {
        const wrapper = shallow(<ChangePassword {...defaultProps} />);
        expect(wrapper.exists('form input[type=\'password\'][name=\'password\']')).toBeTruthy();
        expect(wrapper.exists('form button[type=\'submit\']')).toBeTruthy();
    });

    it('update password state on input change', () => {
        const wrapper = shallow(<ChangePassword {...defaultProps} />);
        wrapper
            .find('form input[type=\'password\'][name=\'password\']')
            .simulate('change', { currentTarget: { name: 'password', value: 'my-password' } });
        expect(wrapper.state('password')).toEqual('my-password');
    });

    it('call for change password on submit', () => {
        const changePassword = jest.fn();
        const props = {...defaultProps, changePassword};
        const wrapper = shallow(<ChangePassword {...props} />);

        wrapper.setState({password: 'my-password'});
        wrapper
            .find('form')
            .simulate('submit', { preventDefault: jest.fn() });

        expect(changePassword.mock.calls.length).toEqual(1);
        expect(changePassword.mock.calls[0][0]).toEqual(props.auth.username);
        expect(changePassword.mock.calls[0][1]).toEqual('my-password');
        expect(changePassword.mock.calls[0][2]).toEqual(props.auth.passwordToken);
    });

    it('can\'t submit empty password', () => {
        const changePassword = jest.fn();
        const props = {...defaultProps, changePassword};
        const wrapper = shallow(<ChangePassword {...props} />);

        wrapper.setState({password: ''});
        wrapper
            .find('form')
            .simulate('submit', { preventDefault: jest.fn() });

        expect(changePassword.mock.calls.length).toEqual(0);
    });
});