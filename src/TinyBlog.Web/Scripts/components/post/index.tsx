import * as React from "react";
import { loadPost, updatePost, togglePost } from "../../store/post/actions";
import { Post as PostType, Tag as TagType } from "../../store/post/types";
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
    loadPost: typeof loadPost;
    updatePost: typeof updatePost;
    togglePost: typeof togglePost;
}

interface OwnProps {
    id: string;
}

type AllProps = OwnProps & StateProps & DispatchProps;

interface State {
    title: string;
    linkText: string;
    previewText: string;
    fullText: string;
    tags: string;
}

class Post extends React.Component<AllProps, State> {
    public constructor(props: AllProps) {
        super(props);
        this.state = { title: '', linkText: '', previewText: '', fullText: '', tags: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleMdChange = this.handleMdChange.bind(this);
        this.handleSumbit = this.handleSumbit.bind(this);
        this.handleTogglePublish = this.handleTogglePublish.bind(this);
    }

    public componentDidMount(): void {
        if ((!this.props.post.isFetched && !this.props.post.isFetching)
            || this.props.post.linkText != this.props.id) {
            this.props.loadPost(this.props.id);
        }
    }

    public componentDidUpdate(prev: Readonly<AllProps>): void {
        if (!prev.post.isFetched && this.props.post.isFetched) {
            this.setState({
                title: this.props.post.title || '',
                linkText: this.props.post.linkText || '',
                previewText: this.props.post.previewText || '',
                fullText: this.props.post.fullText || '',
                tags: this.props.post.tags.map<string>(tg => tg.name).join(' ')
            });
        }
    }

    private handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ [event.currentTarget.name]: event.currentTarget.value } as React.ComponentState);
    }

    private handleMdChange = (name: string, value: string): void => {
        this.setState({ [name] : value } as React.ComponentState);
    }

    private handleSumbit = (): void => {
        const tags = this.state.tags.split(' ').map<TagType>((tg: string) => ({ name: tg }))
        const record: PostType = {
            title: this.state.title,
            linkText: this.props.post.isPublished ? this.props.post.linkText : this.state.linkText,
            previewText: this.state.previewText,
            fullText: this.state.fullText,
            tags: tags
        };

        this.props.updatePost(record);
    }

    private handleTogglePublish = (): void => {
        const publish = !this.props.post.isPublished;
        const message = publish
            ? 'This post will be available for everyone. Make sure all changes are saved.'
            : 'This post will be hidden for everyone. This can negatively impact on users. Try to avoid this action.';

        if (confirm(message)) {
            this.props.togglePost(this.props.post.linkText, publish);
        }
    }

    public render(): React.ReactNode {
        if (this.props.post.isFetching) {
            return (<Loading />);
        }

        const { title, linkText, previewText, fullText, tags } = this.state;
        const { isUpdating, isPublished } = this.props.post;

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

                <button
                    type="button"
                    disabled={isUpdating}
                    onClick={this.handleSumbit}>
                    {isUpdating ? 'Saving' : 'Save'}
                </button>

                <Zone
                    type={isPublished ? ZoneType.red : ZoneType.green}
                    text={publishZoneText}
                    buttonText={isPublished ? 'Unpublish' : 'Publish'}
                    onClick={this.handleTogglePublish} />
            </div>);
    };
}

const mapStateToProps = (state: AppState): StateProps => ({
    post: state.post
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    ...bindActionCreators({ loadPost, updatePost, togglePost }, dispatch)
})

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Post);