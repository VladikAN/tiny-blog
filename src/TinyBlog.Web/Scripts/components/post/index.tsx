import * as React from "react";
import { resetPost, loadPost, savePost, togglePost } from "../../store/post/actions";
import { Post as PostType } from "../../store/post/types";
import { PostState } from "../../store/post/reducers";
import { AppState } from "../../store";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from 'react-redux';
import Loading from "../shared/loading";
import Zone, { ZoneType } from "../shared/zone";
import MarkdownEditor from "../shared/markdown-editor";
import { Link } from "react-router-dom";

interface StateProps {
    post: PostState;
}

interface DispatchProps {
    resetPost: typeof resetPost;
    loadPost: typeof loadPost;
    savePost: typeof savePost;
    togglePost: typeof togglePost;
}

interface OwnProps {
    entityId?: string;
}

type AllProps = OwnProps & StateProps & DispatchProps;

interface State {
    id: string;
    title: string;
    linkText: string;
    previewText: string;
    fullText: string;
    tags: string;
}

class Post extends React.Component<AllProps, State> {
    public constructor(props: AllProps) {
        super(props);
        this.state = { id: '', title: '', linkText: '', previewText: '', fullText: '', tags: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleMdChange = this.handleMdChange.bind(this);
        this.handleSumbit = this.handleSumbit.bind(this);
        this.handleTogglePublish = this.handleTogglePublish.bind(this);
    }

    public componentDidMount(): void {
        if (this.props.entityId) {
            if ((!this.props.post.isFetched && !this.props.post.isFetching) || this.props.post.id != this.props.entityId) {
                this.props.loadPost(this.props.entityId);
            }
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
    }

    private handleMdChange = (name: string, value: string): void => {
        this.setState({ [name] : value } as React.ComponentState);
    }

    private handleSumbit = (): void => {
        const record: PostType = { ...this.state, tags: this.state.tags.split(' ') };
        this.props.savePost(record);
    }

    private handleTogglePublish = (): void => {
        const publish = !this.props.post.isPublished;
        const message = publish
            ? 'This post will be available for everyone. Make sure all changes are saved.'
            : 'This post will be hidden for everyone. This can negatively impact on users. Try to avoid this action.';

        if (confirm(message)) {
            this.props.togglePost(this.props.post.id, publish);
        }
    }

    public render(): React.ReactNode {
        if (this.props.post.isFetching) {
            return (<Loading />);
        }

        const { title, linkText, previewText, fullText, tags } = this.state;
        const { isSaving } = this.props.post;

        const isEdit = this.props.entityId;
        const isPublished = isEdit && this.props.post.isPublished;

        const publishZoneText = isPublished
            ? 'This post is currently public. By pressing this button you will hide post from everyone.'
            : 'This post is currently hidden. Publish this post for everyone by pressing button.';

        return (
            <div>
                <Link to="/admin">back to thread</Link>
                <div className="editor-field">
                    <label>
                        <span>Title</span>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={this.handleChange} />
                    </label>
                </div>
                <div className="editor-field">
                    <label>
                        <span>Link</span>
                        <input
                            type="text"
                            name="linkText"
                            disabled={isPublished}
                            value={linkText}
                            onChange={this.handleChange} />
                        <span className="editor-field__help">Link can be changed only for draft posts</span>
                    </label>
                </div>
                <div className="editor-field">
                    <span>Preview Text</span>
                    <MarkdownEditor 
                        name="previewText"
                        text={previewText}
                        onChange={this.handleMdChange} />
                </div>
                <div className="editor-field">
                    <span>Full Text</span>
                    <MarkdownEditor 
                        name="fullText"
                        text={fullText}
                        onChange={this.handleMdChange} />
                </div>
                <div className="editor-field">
                    <label>
                        <span>Tags</span>
                        <input
                            type="text"
                            name="tags"
                            value={tags}
                            onChange={this.handleChange} />
                    </label>
                    <span className="editor-field__help">Each tag is separated by single space</span>
                </div>

                <div className="align-right">
                    <button
                        className="btn-success"
                        type="button"
                        disabled={isSaving}
                        onClick={this.handleSumbit}>
                        {isSaving ? 'Saving' : 'Save'}
                    </button>
                </div>

                {isEdit &&
                    <Zone
                        type={isPublished ? ZoneType.danger : ZoneType.success}
                        text={publishZoneText}
                        buttonText={isPublished ? 'Unpublish' : 'Publish'}
                        onClick={this.handleTogglePublish} />}
            </div>);
    };
}

const mapStateToProps = (state: AppState): StateProps => ({
    post: state.post
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    ...bindActionCreators({ resetPost, loadPost, savePost, togglePost }, dispatch)
})

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Post);