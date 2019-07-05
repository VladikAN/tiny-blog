import * as React from 'react';
import { AllProps, Users } from '../index';
import { shallow } from 'enzyme';
import { User } from '../../../store/user/types';
import { strings } from '../../../localization';

describe('<User />', () => {
    const simpleUser: User = { username: 'simple-user', email: '@simple', isActive: true };
    const superUser: User = { username: 'super-user', email: '@super', isActive: true, isSuper: true };
    const currentUser: User = { username: 'current-user', email: '@current', isActive: true };
    let defaultProps: AllProps = {
        getUsers: jest.fn(),
        activateUser: jest.fn(),
        deactivateUser: jest.fn(),
        deleteUser: jest.fn(),
        saveUser: jest.fn(),
        isFetched: true,
        isFetching: false,
        username: currentUser.username,
        users: [
            simpleUser
        ],
        operation: null
    };

    let confirmMock:jest.Mock = null;
    beforeEach(() => {
        confirmMock = jest.fn();
        window.confirm = confirmMock;
    });

    it('display list of all users', () => {
        const newProps = { ...defaultProps, users: [simpleUser, superUser, currentUser] };
        const wrapper = shallow(<Users {...newProps} />);
        const rows = wrapper.find('table tbody tr');
        expect(rows).toHaveLength(3);

        const simpleRows = rows.at(0).find('td');
        expect(simpleRows.at(0).text()).toEqual(simpleUser.username);
        expect(simpleRows.at(1).text()).toEqual(simpleUser.email);

        const superRows = rows.at(1).find('td');
        expect(superRows.at(0).text()).toEqual(superUser.username);
        expect(superRows.at(1).text()).toEqual(superUser.email);

        const currentRows = rows.at(2).find('td');
        expect(currentRows.at(0).text()).toEqual(currentUser.username);
        expect(currentRows.at(1).text()).toEqual(currentUser.email);
    });

    it('simple user has button to edit', () => {
        const wrapper = shallow(<Users {...defaultProps} />);
        const actions = wrapper.find('td.entities__actions ActionButton');
        const action = actions.find(`[title="${strings.user_form_edit_action}"]`);
        expect(action).toHaveLength(1);
    });

    it('simple user has button to activate', () => {
        const newProps = { ...defaultProps, users: [{...simpleUser, isActive: false}] };
        const wrapper = shallow(<Users {...newProps} />);
        const actions = wrapper.find('td.entities__actions ActionButton');
        const action = actions.find(`[title="${strings.user_form_activate_action}"]`);
        expect(action).toHaveLength(1);
    });

    it('simple user has button to deactivate', () => {
        const wrapper = shallow(<Users {...defaultProps} />);
        const actions = wrapper.find('td.entities__actions ActionButton');
        const action = actions.find(`[title="${strings.user_form_deactivate_action}"]`);
        expect(action).toHaveLength(1);
    });

    it('simple user has button to delete', () => {
        const wrapper = shallow(<Users {...defaultProps} />);
        const actions = wrapper.find('td.entities__actions ActionButton');
        const action = actions.find(`[title="${strings.user_form_delete_action}"]`);
        expect(action).toHaveLength(1);
    });

    it('super user has button to edit only', () => {
        const newProps = { ...defaultProps, users: [superUser] };
        const wrapper = shallow(<Users {...newProps} />);
        const actions = wrapper.find('td.entities__actions ActionButton');
        const action = actions.find(`[title="${strings.user_form_edit_action}"]`);
        expect(actions).toHaveLength(1);
        expect(action).toHaveLength(1);
    });

    it('current user has button to edit only other himself', () => {
        const newProps = { ...defaultProps, users: [currentUser] };
        const wrapper = shallow(<Users {...newProps} />);
        const actions = wrapper.find('td.entities__actions ActionButton');
        const action = actions.find(`[title="${strings.user_form_edit_action}"]`);
        expect(actions).toHaveLength(1);
        expect(action).toHaveLength(1);
    });

    it('activate button promts for confirmation', () => {
        const newProps = { ...defaultProps, users: [{...simpleUser, isActive: false}] };
        shallow(<Users {...newProps} />)
            .find(`ActionButton[title="${strings.user_form_activate_action}"]`)
            .prop('onClick')
            .call(simpleUser);
        expect(confirmMock.mock.calls).toHaveLength(1);
        expect(confirmMock.mock.calls[0][0]).toEqual(strings.user_form_activate_confirm);
    });

    it('activation is not called on user declined', () => {
        window.confirm = jest.fn(() => false);
        const activateUserMock = jest.fn();

        const newProps = { ...defaultProps, activateUser: activateUserMock, users: [{...simpleUser, isActive: false}] };
        shallow(<Users {...newProps} />)
            .find(`ActionButton[title="${strings.user_form_activate_action}"]`)
            .prop('onClick')
            .call(simpleUser);
        expect(activateUserMock.mock.calls).toHaveLength(0);
    });

    it('activation is called on user confirm', () => {
        window.confirm = jest.fn(() => true);
        const activateUserMock = jest.fn();

        const newProps = { ...defaultProps, activateUser: activateUserMock, users: [{...simpleUser, isActive: false}] };
        shallow(<Users {...newProps} />)
            .find(`ActionButton[title="${strings.user_form_activate_action}"]`)
            .prop('onClick')
            .call(simpleUser);
        expect(activateUserMock.mock.calls).toHaveLength(1);
        expect(activateUserMock.mock.calls[0][0]).toEqual(simpleUser.username);
    });

    it('deactivate button promts for confirmation', () => {
        shallow(<Users {...defaultProps} />)
            .find(`ActionButton[title="${strings.user_form_deactivate_action}"]`)
            .prop('onClick')
            .call(simpleUser);
        expect(confirmMock.mock.calls).toHaveLength(1);
        expect(confirmMock.mock.calls[0][0]).toEqual(strings.user_form_deactivate_confirm);
    });

    it('deactivation is not called on user declined', () => {
        window.confirm = jest.fn(() => false);
        const deactivateUserMock = jest.fn();
        const newProps = { ...defaultProps, deactivateUser: deactivateUserMock };

        shallow(<Users {...newProps} />)
            .find(`ActionButton[title="${strings.user_form_deactivate_action}"]`)
            .prop('onClick')
            .call(simpleUser);
        expect(deactivateUserMock.mock.calls).toHaveLength(0);
    });

    it('deactivation is called on user confirm', () => {
        window.confirm = jest.fn(() => true);
        const deactivateUserMock = jest.fn();
        const newProps = { ...defaultProps, deactivateUser: deactivateUserMock };

        shallow(<Users {...newProps} />)
            .find(`ActionButton[title="${strings.user_form_deactivate_action}"]`)
            .prop('onClick')
            .call(simpleUser);
        expect(deactivateUserMock.mock.calls).toHaveLength(1);
        expect(deactivateUserMock.mock.calls[0][0]).toEqual(simpleUser.username);
    });

    it('delete button promts for confirmation', () => {
        shallow(<Users {...defaultProps} />)
            .find(`ActionButton[title="${strings.user_form_delete_action}"]`)
            .prop('onClick')
            .call(simpleUser);
        expect(confirmMock.mock.calls).toHaveLength(1);
        expect(confirmMock.mock.calls[0][0]).toEqual(strings.user_form_delete_confirm);
    });

    it('delete is not called on user declined', () => {
        window.confirm = jest.fn(() => false);
        const deleteUserMock = jest.fn();
        const newProps = { ...defaultProps, deleteUser: deleteUserMock };

        shallow(<Users {...newProps} />)
            .find(`ActionButton[title="${strings.user_form_delete_action}"]`)
            .prop('onClick')
            .call(simpleUser);
        expect(deleteUserMock.mock.calls).toHaveLength(0);
    });

    it('delete is called on user confirm', () => {
        window.confirm = jest.fn(() => true);
        const deleteUserMock = jest.fn();
        const newProps = { ...defaultProps, deleteUser: deleteUserMock };

        shallow(<Users {...newProps} />)
            .find(`ActionButton[title="${strings.user_form_delete_action}"]`)
            .prop('onClick')
            .call(simpleUser);
        expect(deleteUserMock.mock.calls).toHaveLength(1);
        expect(deleteUserMock.mock.calls[0][0]).toEqual(simpleUser.username);
    });

    it('add button will show new line with empty controls', () => {
        const wrapper = shallow(<Users {...defaultProps} />);
        wrapper
            .find(`ActionButton[title="${strings.user_form_add_action}"]`)
            .prop('onClick')
            .call({});

        const rows = wrapper.find('table tbody tr');
        expect(rows).toHaveLength(2);

        const simpleRows = rows.at(0).find('input[type="text"]');
        expect(simpleRows.at(0).prop('value')).toEqual('');
        expect(simpleRows.at(1).prop('value')).toEqual('');
    });

    it('user save is not called on declined', () => {
        const saveUserMock = jest.fn();
        const newProps = { ...defaultProps, saveUser: saveUserMock };
        const wrapper = shallow(<Users {...newProps} />);

        wrapper
            .find(`ActionButton[title="${strings.user_form_add_action}"]`)
            .prop('onClick')
            .call({});

        wrapper
            .find('input[type="text"][name="rawUsername"]')
            .simulate('change', { currentTarget: { name: 'rawUsername', value: 'new-name' } });

        wrapper
            .find('input[type="text"][name="rawEmail"]')
            .simulate('change', { currentTarget: { name: 'rawEmail', value: 'new-email' } });

        wrapper
            .find(`ActionButton[title="${strings.user_form_cancel_action}"]`)
            .prop('onClick')
            .call({});

        expect(saveUserMock.mock.calls).toHaveLength(0);
    });

    it('user save is called on confirm', () => {
        const saveUserMock = jest.fn();
        const newProps = { ...defaultProps, saveUser: saveUserMock };
        const wrapper = shallow(<Users {...newProps} />);

        wrapper
            .find(`ActionButton[title="${strings.user_form_add_action}"]`)
            .prop('onClick')
            .call({});

        wrapper
            .find('input[type="text"][name="rawUsername"]')
            .simulate('change', { currentTarget: { name: 'rawUsername', value: 'new-name' } });

        wrapper
            .find('input[type="text"][name="rawEmail"]')
            .simulate('change', { currentTarget: { name: 'rawEmail', value: 'new-email' } });

        wrapper
            .find(`ActionButton[title="${strings.user_form_save_action}"]`)
            .prop('onClick')
            .call({});

        expect(saveUserMock.mock.calls).toHaveLength(1);
        const user = saveUserMock.mock.calls[0][0] as User;
        expect(user.username).toEqual('new-name');
        expect(user.email).toEqual('new-email');
    });

    it('edit button will show controls to edit user info', () => {
        const wrapper = shallow(<Users {...defaultProps} />);
        wrapper
            .find(`ActionButton[title="${strings.user_form_edit_action}"]`)
            .prop('onClick')
            .call(simpleUser);

        const rows = wrapper.find('table tbody tr');
        expect(rows).toHaveLength(1);

        const simpleRows = rows.at(0).find('input[type="text"]');
        expect(simpleRows.at(0).prop('value')).toEqual(simpleUser.username);
        expect(simpleRows.at(1).prop('value')).toEqual(simpleUser.email);
    });

    it('not allowed to edit username for super user', () => {
        const newProps = { ...defaultProps, users: [superUser] };
        const wrapper = shallow(<Users {...newProps} />);
        wrapper
            .find(`ActionButton[title="${strings.user_form_edit_action}"]`)
            .prop('onClick')
            .call(simpleUser);

        const controls = wrapper.at(0).find('input[type="text"]');
        expect(controls).toHaveLength(1);
        expect(controls.at(0).prop('name')).toEqual('rawEmail');
    });

    it('not allowed to edit username for current user', () => {
        const newProps = { ...defaultProps, users: [currentUser] };
        const wrapper = shallow(<Users {...newProps} />);
        wrapper
            .find(`ActionButton[title="${strings.user_form_edit_action}"]`)
            .prop('onClick')
            .call(simpleUser);

        const controls = wrapper.at(0).find('input[type="text"]');
        expect(controls).toHaveLength(1);
        expect(controls.at(0).prop('name')).toEqual('rawEmail');
    });
});