import * as React from 'react';
import { AppState } from '../../store';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getLayout, saveLayout } from '../../store/layout/actions';
import { Layout as LayoutType } from '../../store/layout/types';
import { LayoutState } from '../../store/layout/reducers';
import Loading from '../shared/loading';
import { strings } from '../../localization';
import MarkdownEditor from '../shared/markdown-editor';

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
                <h1>{strings.layout_page_title}</h1>

                <form onSubmit={this.handleSubmit}>
                    <div className="editor-field">
                        <label>
                            <span>{strings.layout_form_title}</span>
                            <input
                                required={true}
                                type="text"
                                name="title"
                                value={title}
                                onChange={this.handleChange} />
                            <span className="editor-field__help">{strings.layout_form_title_description}</span>
                        </label>
                    </div>

                    <div className="editor-field">
                        <label>
                            <span>{strings.layout_form_description}</span>
                            <input
                                required={true}
                                type="text"
                                name="description"
                                value={description}
                                onChange={this.handleChange} />
                            <span className="editor-field__help">{strings.layout_form_description_description}</span>
                        </label>
                    </div>

                    <div className="editor-field">
                        <label>
                            <span>{strings.layout_form_uri}</span>
                            <input
                                required={true}
                                type="text"
                                name="uri"
                                value={uri}
                                onChange={this.handleChange} />
                            <span className="editor-field__help">{strings.layout_form_uri_description}</span>
                        </label>
                    </div>

                    <div className="editor-field">
                        <label>
                            <span>{strings.layout_form_author}</span>
                            <input
                                required={true}
                                type="text"
                                name="author"
                                value={author}
                                onChange={this.handleChange} />
                            <span className="editor-field__help">{strings.layout_form_author_description}</span>
                        </label>
                    </div>

                    <div className="editor-field">
                        <label>
                            <span>{strings.layout_form_language}</span>
                            <input
                                required={true}
                                type="text"
                                name="language"
                                value={language}
                                onChange={this.handleChange} />
                            <span className="editor-field__help">{strings.layout_form_language_description}</span>
                        </label>
                    </div>

                    <div className="editor-field">
                        <label>
                            <span>{strings.layout_form_googleTagCode}</span>
                            <input
                                required={false}
                                type="text"
                                name="googleTagsCode"
                                value={googleTagsCode}
                                onChange={this.handleChange} />
                            <span className="editor-field__help">{strings.layout_form_googleTagCode_description}</span>
                        </label>
                    </div>

                    <div className="editor-field">
                        <span>{strings.layout_form_headerContent}</span>
                        <MarkdownEditor
                            name="headerContent"
                            text={headerContent}
                            required={false}
                            onChange={this.handleMdChange} />
                        <span className="editor-field__help">{strings.layout_form_headerContent_description}</span>
                    </div>

                    <div className="editor-field">
                        <span>{strings.layout_form_footerContent}</span>
                        <MarkdownEditor
                            name="footerContent"
                            text={footerContent}
                            required={false}
                            onChange={this.handleMdChange} />
                        <span className="editor-field__help">{strings.layout_form_footerContent_description}</span>
                    </div>

                    <div className="align-right">
                        <button
                            className="btn-success"
                            type="submit"
                            disabled={isSaving}>
                            {strings.layout_form_save}
                        </button>
                    </div>
                </form>
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