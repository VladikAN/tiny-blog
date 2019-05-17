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

interface StateProps {
    post: PostState
}

interface DispatchProps {
    loadPost: typeof loadPost,
    updatePost: typeof updatePost,
    togglePost: typeof togglePost
}

interface OwnProps {
    id: string
}

type AllProps = OwnProps & StateProps & DispatchProps;

interface State {
    title: string,
    linkText: string,
    previewText: string,
    fullText: string,
    tags: string
}

class Post extends React.Component<AllProps, State> {
    constructor(props: AllProps) {
        super(props);

        this.state = { title: '', linkText: '', previewText: '', fullText: '', tags: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleMdChange = this.handleMdChange.bind(this);
        this.submitPost = this.submitPost.bind(this);
        this.togglePublish = this.togglePublish.bind(this);
    }

    componentDidMount() {
        if ((!this.props.post.isFetched && !this.props.post.isFetching)
            || this.props.post.linkText != this.props.id) {
            this.props.loadPost(this.props.id);
        }
    }

    componentDidUpdate(prev: Readonly<AllProps>, next: Readonly<State>) {
        if (!prev.post.isFetched && this.props.post.isFetched) {
            this.setState({
                title: this.props.post.title || '',
                linkText: this.props.post.linkText || '',
                previewText: this.props.post.previewText || '',
                fullText: this.props.post.fullText || '',
                tags: this.props.post.tags.map(tg => tg.name).join(' ')
            });
        }
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ [event.currentTarget.name]: event.currentTarget.value } as React.ComponentState);
    }

    handleMdChange = (name: string, value: string) => {
        this.setState({ [name] : value } as React.ComponentState);
    }

    submitPost = () => {
        const tags = this.state.tags.split(' ').map((tg: string) => ({ name: tg } as TagType))
        const record: PostType = {
            title: this.state.title,
            linkText: this.state.linkText,
            previewText: this.state.previewText,
            fullText: this.state.fullText,
            tags: tags
        };

        this.props.updatePost(record);
    }

    togglePublish = () => {
        this.props.togglePost(this.props.post.linkText, !this.props.post.isPublished);
    }

    render() {
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
                        value={linkText}
                        onChange={this.handleChange} />
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
                <span className="editor-field__help">* each tag is separated by single space</span>
            </div>

            <button
                type="button"
                disabled={isUpdating}
                onClick={this.submitPost}>
                {isUpdating ? 'Saving' : 'Save'}
                </button>

            <Zone
                type={isPublished ? ZoneType.red : ZoneType.green}
                text={publishZoneText}
                buttonText={isPublished ? 'Unpublish' : 'Publish'}
                onClick={this.togglePublish} />
        </div>);
    };
}

const mapStateToProps = (state: AppState) : StateProps => ({
    post: state.post
})

const mapDispatchToProps = (dispatch : Dispatch) : DispatchProps => ({
    ...bindActionCreators({ loadPost, updatePost, togglePost }, dispatch)
})

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Post);