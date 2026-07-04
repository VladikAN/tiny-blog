import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import { LoginForm, AllProps } from '../login-form';

const renderForm = (props: AllProps) => render(
    <ConfigProvider>
        <LoginForm {...props} />
    </ConfigProvider>
);

describe('<LoginForm />', () => {
    const defaultProps: AllProps = {
        authCredentials: jest.fn()
    };

    it('should render login form with username and password inputs', () => {
        renderForm(defaultProps);
        expect(document.querySelector('input[name="username"]')).toBeTruthy();
        expect(document.querySelector('input[name="password"]')).toBeTruthy();
        expect(screen.getByRole('button', { name: /sign in/i })).toBeTruthy();
    });

    it('call for authorize with username/password from state', () => {
        const authCredentials = jest.fn();
        renderForm({ ...defaultProps, authCredentials });

        fireEvent.change(document.querySelector('input[name="username"]')!, {
            target: { name: 'username', value: 'my-name' }
        });
        fireEvent.change(document.querySelector('input[name="password"]')!, {
            target: { name: 'password', value: 'my-password' }
        });
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        expect(authCredentials.mock.calls.length).toEqual(1);
        expect(authCredentials.mock.calls[0][0]).toEqual('my-name');
        expect(authCredentials.mock.calls[0][1]).toEqual('my-password');
    });
});
