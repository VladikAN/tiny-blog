import * as React from 'react';
import { AppState } from '../../store';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Form, Input, Typography } from 'antd';
import { getLayout, saveLayout } from '../../store/layout/actions';
import { Layout as LayoutType } from '../../store/layout/types';
import { LayoutState } from '../../store/layout/reducers';
import Loading from '../shared/loading';
import { strings } from '../../localization';
import MarkdownEditor from '../shared/markdown-editor';

const { Title } = Typography;

interface StateProps {
    layout: LayoutState;
}

interface DispatchProps {
    getLayout: typeof getLayout;
    saveLayout: typeof saveLayout;
}

interface OwnProps {
}

export type AllProps = OwnProps & StateProps & DispatchProps;

interface State extends LayoutType {
}

export class Layout extends React.Component<AllProps, State> {
    public constructor(props: AllProps) {
        super(props);
        this.state = {
            title: '',
            description: '',
            uri: '',
            author: '',
            language: '',
            googleTagsCode: '',
            headerContent: '',
            footerContent: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleMdChange = this.handleMdChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public componentDidMount(): void {
        if (!this.props.layout.isFetching && !this.props.layout.isFetched) {
            this.props.getLayout();
        } else if (this.props.layout.isFetched) {
            this.setState({ ...this.props.layout });
        }
    }

    public componentDidUpdate(prev: Readonly<AllProps>): void {
        if (!prev.layout.isFetched && this.props.layout.isFetched) {
            this.setState({ ...this.props.layout });
        }
    }

    private handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ [event.currentTarget.name]: event.currentTarget.value } as React.ComponentState);
    };

    private handleMdChange = (name: string, value: string): void => {
        this.setState({ [name] : value } as React.ComponentState);
    };

    private handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        const record: LayoutType = { ...this.state };
        this.props.saveLayout(record);
        event.preventDefault();
    };

    public render(): React.ReactNode {
        if (this.props.layout.isFetching) {
            return (<Loading />);
        }

        const { title, description, uri, author, language, googleTagsCode, headerContent, footerContent } = this.state;
        const { isSaving } = this.props.layout;

        return (
            <div>
                <Title level={2}>{strings.layout_page_title}</Title>

                <Form layout="vertical" onSubmitCapture={this.handleSubmit}>
                    <Form.Item label={strings.layout_form_title} extra={strings.layout_form_title_description}>
                        <Input
                            required={true}
                            type="text"
                            name="title"
                            value={title}
                            onChange={this.handleChange} />
                    </Form.Item>

                    <Form.Item label={strings.layout_form_description} extra={strings.layout_form_description_description}>
                        <Input
                            required={true}
                            type="text"
                            name="description"
                            value={description}
                            onChange={this.handleChange} />
                    </Form.Item>

                    <Form.Item label={strings.layout_form_uri} extra={strings.layout_form_uri_description}>
                        <Input
                            required={true}
                            type="text"
                            name="uri"
                            value={uri}
                            onChange={this.handleChange} />
                    </Form.Item>

                    <Form.Item label={strings.layout_form_author} extra={strings.layout_form_author_description}>
                        <Input
                            required={true}
                            type="text"
                            name="author"
                            value={author}
                            onChange={this.handleChange} />
                    </Form.Item>

                    <Form.Item label={strings.layout_form_language} extra={strings.layout_form_language_description}>
                        <Input
                            required={true}
                            type="text"
                            name="language"
                            value={language}
                            onChange={this.handleChange} />
                    </Form.Item>

                    <Form.Item label={strings.layout_form_googleTagCode} extra={strings.layout_form_googleTagCode_description}>
                        <Input
                            type="text"
                            name="googleTagsCode"
                            value={googleTagsCode}
                            onChange={this.handleChange} />
                    </Form.Item>

                    <Form.Item label={strings.layout_form_headerContent} extra={strings.layout_form_headerContent_description}>
                        <MarkdownEditor
                            name="headerContent"
                            text={headerContent}
                            required={false}
                            onChange={this.handleMdChange} />
                    </Form.Item>

                    <Form.Item label={strings.layout_form_footerContent} extra={strings.layout_form_footerContent_description}>
                        <MarkdownEditor
                            name="footerContent"
                            text={footerContent}
                            required={false}
                            onChange={this.handleMdChange} />
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit" loading={isSaving}>
                            {strings.layout_form_save}
                        </Button>
                    </Form.Item>
                </Form>
            </div>);
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    layout: state.layout
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    ...bindActionCreators({
        getLayout,
        saveLayout
    }, dispatch)
});

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Layout);
