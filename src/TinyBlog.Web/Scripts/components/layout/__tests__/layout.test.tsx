import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import { AllProps, Layout } from '../index';

const renderLayout = (props: AllProps) => render(
    <ConfigProvider>
        <Layout {...props} />
    </ConfigProvider>
);

describe('<Layout />', () => {
    let getLayout: jest.Mock;
    let saveLayout: jest.Mock;
    let defaultProps: AllProps;

    beforeEach(() => {
        getLayout = jest.fn();
        saveLayout = jest.fn();
        defaultProps = {
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
            getLayout,
            saveLayout
        };
    });

    it('should send updated title to save', () => {
        renderLayout(defaultProps);
        fireEvent.change(document.querySelector('input[name="title"]')!, {
            target: { name: 'title', value: 'new-title' }
        });
        fireEvent.submit(document.querySelector('form')!);

        expect(saveLayout.mock.calls.length).toEqual(1);
        expect(saveLayout.mock.calls[0][0].title).toEqual('new-title');
    });

    it('should send updated description to save', () => {
        renderLayout(defaultProps);
        fireEvent.change(document.querySelector('input[name="description"]')!, {
            target: { name: 'description', value: 'new-description' }
        });
        fireEvent.submit(document.querySelector('form')!);

        expect(saveLayout.mock.calls.length).toEqual(1);
        expect(saveLayout.mock.calls[0][0].description).toEqual('new-description');
    });

    it('should send updated uri to save', () => {
        renderLayout(defaultProps);
        fireEvent.change(document.querySelector('input[name="uri"]')!, {
            target: { name: 'uri', value: 'new-uri' }
        });
        fireEvent.submit(document.querySelector('form')!);

        expect(saveLayout.mock.calls.length).toEqual(1);
        expect(saveLayout.mock.calls[0][0].uri).toEqual('new-uri');
    });

    it('should send updated author to save', () => {
        renderLayout(defaultProps);
        fireEvent.change(document.querySelector('input[name="author"]')!, {
            target: { name: 'author', value: 'new-author' }
        });
        fireEvent.submit(document.querySelector('form')!);

        expect(saveLayout.mock.calls.length).toEqual(1);
        expect(saveLayout.mock.calls[0][0].author).toEqual('new-author');
    });

    it('should send updated language to save', () => {
        renderLayout(defaultProps);
        fireEvent.change(document.querySelector('input[name="language"]')!, {
            target: { name: 'language', value: 'new-language' }
        });
        fireEvent.submit(document.querySelector('form')!);

        expect(saveLayout.mock.calls.length).toEqual(1);
        expect(saveLayout.mock.calls[0][0].language).toEqual('new-language');
    });

    it('should send updated googleTagsCode to save', () => {
        renderLayout(defaultProps);
        fireEvent.change(document.querySelector('input[name="googleTagsCode"]')!, {
            target: { name: 'googleTagsCode', value: 'new-googleTagsCode' }
        });
        fireEvent.submit(document.querySelector('form')!);

        expect(saveLayout.mock.calls.length).toEqual(1);
        expect(saveLayout.mock.calls[0][0].googleTagsCode).toEqual('new-googleTagsCode');
    });
});
