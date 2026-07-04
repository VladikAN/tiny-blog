import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfigProvider, Modal } from 'antd';
import { AllProps, Users } from '../index';
import { User } from '../../../store/user/types';
import { strings } from '../../../localization';

const renderUsers = (props: AllProps) => render(
    <ConfigProvider>
        <Users {...props} />
    </ConfigProvider>
);

describe('<User />', () => {
    const simpleUser: User = { username: 'simple-user', email: '@simple', isActive: true };
    const superUser: User = { username: 'super-user', email: '@super', isActive: true, isSuper: true };
    const currentUser: User = { username: 'current-user', email: '@current', isActive: true };
    let defaultProps: AllProps;
    let modalConfirm: jest.SpyInstance;

    beforeEach(() => {
        modalConfirm = jest.spyOn(Modal, 'confirm').mockImplementation(() => ({ destroy: jest.fn(), update: jest.fn() }));
        defaultProps = {
            getUsers: jest.fn(),
            activateUser: jest.fn(),
            deactivateUser: jest.fn(),
            deleteUser: jest.fn(),
            saveUser: jest.fn(),
            isFetched: true,
            isFetching: false,
            username: currentUser.username,
            users: [simpleUser],
            operation: null
        };
    });

    afterEach(() => {
        modalConfirm.mockRestore();
    });

    it('display list of all users', () => {
        renderUsers({ ...defaultProps, users: [simpleUser, superUser, currentUser] });
        expect(screen.getByText(simpleUser.username)).toBeTruthy();
        expect(screen.getByText(superUser.username)).toBeTruthy();
        expect(screen.getByText(currentUser.username)).toBeTruthy();
    });

    it('simple user has button to edit', () => {
        renderUsers(defaultProps);
        expect(screen.getByTitle(strings.user_form_edit_action)).toBeTruthy();
    });

    it('simple user has button to activate', () => {
        renderUsers({ ...defaultProps, users: [{ ...simpleUser, isActive: false }] });
        expect(screen.getByTitle(strings.user_form_activate_action)).toBeTruthy();
    });

    it('simple user has button to deactivate', () => {
        renderUsers(defaultProps);
        expect(screen.getByTitle(strings.user_form_deactivate_action)).toBeTruthy();
    });

    it('simple user has button to delete', () => {
        renderUsers(defaultProps);
        expect(screen.getByTitle(strings.user_form_delete_action)).toBeTruthy();
    });

    it('super user has button to edit only', () => {
        renderUsers({ ...defaultProps, users: [superUser] });
        expect(screen.getByTitle(strings.user_form_edit_action)).toBeTruthy();
        expect(screen.queryByTitle(strings.user_form_delete_action)).toBeNull();
    });

    it('current user has button to edit only other himself', () => {
        renderUsers({ ...defaultProps, users: [currentUser] });
        expect(screen.getByTitle(strings.user_form_edit_action)).toBeTruthy();
        expect(screen.queryByTitle(strings.user_form_delete_action)).toBeNull();
    });

    it('activate button promts for confirmation', () => {
        renderUsers({ ...defaultProps, users: [{ ...simpleUser, isActive: false }] });
        fireEvent.click(screen.getByTitle(strings.user_form_activate_action));
        expect(modalConfirm.mock.calls).toHaveLength(1);
        expect(modalConfirm.mock.calls[0][0].title).toEqual(strings.user_form_activate_confirm);
    });

    it('activation is not called on user declined', () => {
        const activateUserMock = jest.fn();
        renderUsers({
            ...defaultProps,
            activateUser: activateUserMock,
            users: [{ ...simpleUser, isActive: false }]
        });
        fireEvent.click(screen.getByTitle(strings.user_form_activate_action));
        expect(activateUserMock.mock.calls).toHaveLength(0);
    });

    it('activation is called on user confirm', () => {
        const activateUserMock = jest.fn();
        modalConfirm.mockImplementation(({ onOk }) => {
            onOk?.();
            return { destroy: jest.fn(), update: jest.fn() };
        });

        renderUsers({
            ...defaultProps,
            activateUser: activateUserMock,
            users: [{ ...simpleUser, isActive: false }]
        });
        fireEvent.click(screen.getByTitle(strings.user_form_activate_action));

        expect(activateUserMock.mock.calls).toHaveLength(1);
        expect(activateUserMock.mock.calls[0][0]).toEqual(simpleUser.username);
    });

    it('deactivate button promts for confirmation', () => {
        renderUsers(defaultProps);
        fireEvent.click(screen.getByTitle(strings.user_form_deactivate_action));
        expect(modalConfirm.mock.calls).toHaveLength(1);
        expect(modalConfirm.mock.calls[0][0].title).toEqual(strings.user_form_deactivate_confirm);
    });

    it('deactivation is called on user confirm', () => {
        const deactivateUserMock = jest.fn();
        modalConfirm.mockImplementation(({ onOk }) => {
            onOk?.();
            return { destroy: jest.fn(), update: jest.fn() };
        });

        renderUsers({ ...defaultProps, deactivateUser: deactivateUserMock });
        fireEvent.click(screen.getByTitle(strings.user_form_deactivate_action));

        expect(deactivateUserMock.mock.calls).toHaveLength(1);
        expect(deactivateUserMock.mock.calls[0][0]).toEqual(simpleUser.username);
    });

    it('delete is called on user confirm', () => {
        const deleteUserMock = jest.fn();
        modalConfirm.mockImplementation(({ onOk }) => {
            onOk?.();
            return { destroy: jest.fn(), update: jest.fn() };
        });

        renderUsers({ ...defaultProps, deleteUser: deleteUserMock });
        fireEvent.click(screen.getByTitle(strings.user_form_delete_action));

        expect(deleteUserMock.mock.calls).toHaveLength(1);
        expect(deleteUserMock.mock.calls[0][0]).toEqual(simpleUser.username);
    });

    it('add button will show new line with empty controls', () => {
        renderUsers(defaultProps);
        fireEvent.click(screen.getByText(strings.user_form_add_action));

        expect(document.querySelector('input[name="rawUsername"]')).toBeTruthy();
        expect(document.querySelector('input[name="rawEmail"]')).toBeTruthy();
    });

    it('user save is called on confirm', () => {
        const saveUserMock = jest.fn();
        renderUsers({ ...defaultProps, saveUser: saveUserMock });

        fireEvent.click(screen.getByText(strings.user_form_add_action));
        fireEvent.change(document.querySelector('input[name="rawUsername"]')!, {
            target: { name: 'rawUsername', value: 'new-name' }
        });
        fireEvent.change(document.querySelector('input[name="rawEmail"]')!, {
            target: { name: 'rawEmail', value: 'new-email' }
        });
        fireEvent.click(screen.getByTitle(strings.user_form_save_action));

        expect(saveUserMock.mock.calls).toHaveLength(1);
        const user = saveUserMock.mock.calls[0][0] as User;
        expect(user.username).toEqual('new-name');
        expect(user.email).toEqual('new-email');
    });

    it('edit button will show controls to edit user info', () => {
        renderUsers(defaultProps);
        fireEvent.click(screen.getByTitle(strings.user_form_edit_action));
        expect(document.querySelector('input[name="rawEmail"]')).toBeTruthy();
        expect(document.querySelector('input[name="rawUsername"]')).toBeNull();
    });
});
