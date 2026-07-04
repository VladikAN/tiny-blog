import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Login, AllProps } from '../index';

jest.mock('../login-form', () => {
    const MockLoginForm = () => <div data-testid="login-form" />;
    return MockLoginForm;
});
jest.mock('../change-password', () => {
    const MockChangePassword = () => <div data-testid="change-password" />;
    return MockChangePassword;
});

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
        render(<Login {...defaultProps} getToken={getToken} />);
        expect(getToken.mock.calls.length).toEqual(1);
    });

    it('should render child component if authorized', () => {
        const newProps = { ...defaultProps, auth: { ...defaultProps.auth, isAuthorized: true } };
        render(<Login {...newProps}><div data-testid="child" /></Login>);
        expect(screen.getByTestId('child')).toBeTruthy();
    });

    it('should not render child component if not authorized', () => {
        render(<Login {...defaultProps}><div data-testid="child" /></Login>);
        expect(screen.queryByTestId('child')).toBeNull();
        expect(screen.getByTestId('login-form')).toBeTruthy();
    });

    it('should render change password form if token present', () => {
        const newProps = { ...defaultProps, auth: { ...defaultProps.auth, passwordToken: 'token' } };
        render(<Login {...newProps}><div data-testid="child" /></Login>);
        expect(screen.queryByTestId('child')).toBeNull();
        expect(screen.getByTestId('change-password')).toBeTruthy();
    });
});
