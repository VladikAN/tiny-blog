import * as React from 'react';
import { AllProps, Layout } from '../index';
import { shallow } from 'enzyme';

describe('<Layout />', () => {
    let getLayout:jest.Mock = null;
    let saveLayout:jest.Mock = null;
    let defaultProps: AllProps = {
        layout: {
            title: 'title',
            description: 'description',
            uri: 'uri',
            author: 'author',
            language: 'language',
            googleTagsCode: 'googleTagsCode',
            headerContent: 'headerContent',
            footerContent: 'footerContent',
            isFetching: false,
            isFetched: true,
            isSaving: false
        },
        getLayout: jest.fn(),
        saveLayout: jest.fn()
    };

    beforeEach(() => {
        getLayout = jest.fn();
        saveLayout = jest.fn();
        defaultProps.getLayout = getLayout;
        defaultProps.saveLayout = saveLayout;
    });

    it ('should send updated title to save', () => {
        const wrapper = shallow(<Layout {...defaultProps} />);
        wrapper.find('input[name="title"]').simulate('change', { currentTarget: { name: 'title', value: 'new-title' } });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        expect(saveLayout.mock.calls.length).toEqual(1);
        expect(saveLayout.mock.calls[0][0].title).toEqual('new-title');
    });

    it ('should send updated description to save', () => {
        const wrapper = shallow(<Layout {...defaultProps} />);
        wrapper.find('input[name="description"]').simulate('change', { currentTarget: { name: 'description', value: 'new-description' } });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        expect(saveLayout.mock.calls.length).toEqual(1);
        expect(saveLayout.mock.calls[0][0].description).toEqual('new-description');
    });

    it ('should send updated uri to save', () => {
        const wrapper = shallow(<Layout {...defaultProps} />);
        wrapper.find('input[name="uri"]').simulate('change', { currentTarget: { name: 'uri', value: 'new-uri' } });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        expect(saveLayout.mock.calls.length).toEqual(1);
        expect(saveLayout.mock.calls[0][0].uri).toEqual('new-uri');
    });

    it ('should send updated author to save', () => {
        const wrapper = shallow(<Layout {...defaultProps} />);
        wrapper.find('input[name="author"]').simulate('change', { currentTarget: { name: 'author', value: 'new-author' } });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        expect(saveLayout.mock.calls.length).toEqual(1);
        expect(saveLayout.mock.calls[0][0].author).toEqual('new-author');
    });

    it ('should send updated language to save', () => {
        const wrapper = shallow(<Layout {...defaultProps} />);
        wrapper.find('input[name="language"]').simulate('change', { currentTarget: { name: 'language', value: 'new-language' } });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        expect(saveLayout.mock.calls.length).toEqual(1);
        expect(saveLayout.mock.calls[0][0].language).toEqual('new-language');
    });

    it ('should send updated googleTagsCode to save', () => {
        const wrapper = shallow(<Layout {...defaultProps} />);
        wrapper.find('input[name="googleTagsCode"]').simulate('change', { currentTarget: { name: 'googleTagsCode', value: 'new-googleTagsCode' } });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        expect(saveLayout.mock.calls.length).toEqual(1);
        expect(saveLayout.mock.calls[0][0].googleTagsCode).toEqual('new-googleTagsCode');
    });
});