import * as React from 'react';
import { loadPost, resetPost, savePost } from '../../store/post/actions';
import { Post as PostType } from '../../store/post/types';
import { PostState } from '../../store/post/reducers';
import { AppState } from '../../store';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loading from '../shared/loading';
import MarkdownEditor from '../shared/markdown-editor';
import { Link, Redirect } from 'react-router-dom';
import { strings } from '../../localization';
import ZonePostPublish from '../shared/zone-post-publish';
import ZonePostDelete from '../shared/zone-post-delete';

interface StateProps {
    post: PostState;
}

interface DispatchProps {
    resetPost: typeof resetPost;
    loadPost: typeof loadPost;
    savePost: typeof savePost;
}

interface OwnProps {
    entityId?: string;
}

export type AllProps = OwnProps & StateProps & DispatchProps;

interface State {
    id: string;
    title: string;
    linkText: string;
    previewText: string;
    fullText: string;
    tags: string;
}

export class Post extends React.Component<AllProps, State> {
    public constructor(props: AllProps) {
        super(props);
        this.state = { id: '', title: '', linkText: '', previewText: '', fullText: '', tags: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleMdChange = this.handleMdChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public componentDidMount(): void {
        if (this.props.entityId) {
            this.props.loadPost(this.props.entityId);
        } else {
            this.props.resetPost();
        }
    }

    public componentDidUpdate(prev: Readonly<AllProps>): void {
        if (this.props.entityId && !prev.post.isFetched && this.props.post.isFetched) {
            const tags = this.props.post.tags.join(' ');
            this.setState({ ...this.props.post, tags: tags });
        }
    }

    private handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ [event.currentTarget.name]: event.currentTarget.value } as React.ComponentState);
    };

    private handleMdChange = (name: string, value: string): void => {
        this.setState({ [name] : value } as React.ComponentState);
    };

    private handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        const record: PostType = { ...this.state, tags: this.state.tags.split(' ') };
        this.props.savePost(record);
        event.preventDefault();
    };

    public render(): React.ReactNode {
        if (this.props.post.isFetching) {
            return (<Loading />);
        }

        if (this.props.post.isCreated || this.props.post.isDeleted) {
            return (<Redirect to="/admin" />);
        }

        const { id, title, linkText, previewText, fullText, tags } = this.state;
        const { isSaving } = this.props.post;

        const isEdit = this.props.entityId;
        const isPublished = isEdit && this.props.post.isPublished;

        return (
            <div>
                <Link to="/admin">{strings.post_link_back}</Link>
                <form onSubmit={this.handleSubmit}>
                    <div className="editor-field">
                        <label>
                            <span>{strings.post_form_title}</span>
                            <input
                                required={true}
                                type="text"
                                name="title"
                                value={title}
                                onChange={this.handleChange} />
                        </label>
                    </div>
                    <div className="editor-field">
                        <label>
                            <span>{strings.post_form_link}</span>
                            <input
                                required={true}
                                type="text"
                                name="linkText"
                                disabled={isPublished}
                                value={linkText}
                                onChange={this.handleChange} />
                            <span className="editor-field__help">{strings.post_form_link_description}</span>
                        </label>
                    </div>
                    <div className="editor-field">
                        <span>{strings.post_form_previewText}</span>
                        <MarkdownEditor
                            name="previewText"
                            text={previewText}
                            onChange={this.handleMdChange} />
                    </div>
                    <div className="editor-field">
                        <span>{strings.post_form_fullText}</span>
                        <MarkdownEditor 
                            name="fullText"
                            text={fullText}
                            onChange={this.handleMdChange} />
                    </div>
                    <div className="editor-field">
                        <label>
                            <span>{strings.post_form_tags}</span>
                            <input
                                type="text"
                                name="tags"
                                value={tags}
                                onChange={this.handleChange} />
                        </label>
                        <span className="editor-field__help">{strings.post_form_tags_description}</span>
                    </div>

                    <div className="align-right">
                        <button
                            className="btn-success"
                            type="submit"
                            disabled={isSaving}>
                            {strings.post_form_save}
                        </button>
                    </div>
                </form>

                {isEdit && <ZonePostPublish id={id} isPublished={isPublished} />}
                {isEdit && !isPublished && <ZonePostDelete id={id} />}
            </div>);
    };
}

const mapStateToProps = (state: AppState): StateProps => ({
    post: state.post
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    ...bindActionCreators({
        resetPost,
        loadPost,
        savePost
    }, dispatch)
});

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Post);