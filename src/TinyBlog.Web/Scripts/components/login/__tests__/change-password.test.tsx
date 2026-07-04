import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import { ChangePassword, AllProps } from '../change-password';

const renderForm = (props: AllProps) => render(
    <ConfigProvider>
        <ChangePassword {...props} />
    </ConfigProvider>
);

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
        renderForm(defaultProps);
        expect(document.querySelector('input[name="password"]')).toBeTruthy();
        expect(document.querySelector('input[name="confirmPassword"]')).toBeTruthy();
    });

    it('call for change password on submit', () => {
        const changePassword = jest.fn();
        renderForm({ ...defaultProps, changePassword });

        fireEvent.change(document.querySelector('input[name="password"]')!, {
            target: { name: 'password', value: 'my-password' }
        });
        fireEvent.change(document.querySelector('input[name="confirmPassword"]')!, {
            target: { name: 'confirmPassword', value: 'my-password' }
        });
        fireEvent.click(screen.getByRole('button', { name: /change password/i }));

        expect(changePassword.mock.calls.length).toEqual(1);
        expect(changePassword.mock.calls[0][0]).toEqual(defaultProps.auth.username);
        expect(changePassword.mock.calls[0][1]).toEqual('my-password');
        expect(changePassword.mock.calls[0][2]).toEqual(defaultProps.auth.passwordToken);
    });

    it('can\'t submit empty password', () => {
        const changePassword = jest.fn();
        renderForm({ ...defaultProps, changePassword });
        fireEvent.click(screen.getByRole('button', { name: /change password/i }));
        expect(changePassword.mock.calls.length).toEqual(0);
    });

    it('can\'t submit password which is not matched', () => {
        const changePassword = jest.fn();
        renderForm({ ...defaultProps, changePassword });

        fireEvent.change(document.querySelector('input[name="password"]')!, {
            target: { name: 'password', value: 'my-password' }
        });
        fireEvent.change(document.querySelector('input[name="confirmPassword"]')!, {
            target: { name: 'confirmPassword', value: 'wrong-password' }
        });
        fireEvent.click(screen.getByRole('button', { name: /change password/i }));

        expect(changePassword.mock.calls.length).toEqual(0);
    });
});
