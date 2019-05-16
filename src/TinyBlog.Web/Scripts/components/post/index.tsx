import * as React from "react";
import { loadPost } from "../../store/post/actions";
import { PostState } from "../../store/post/reducers";
import { AppState } from "../../store";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from 'react-redux';
import Loading from "../shared/loading";
import MarkdownEditor from "../shared/markdown-editor";

interface StateProps {
    post: PostState
}

interface DispatchProps {
    loadPost: typeof loadPost
}

interface OwnProps {
    id: string
}

type AllProps = OwnProps & StateProps & DispatchProps;

interface State {
    title: string,
    linkText: string,
    previewText: string,
    fullText: string
}

class Post extends React.Component<AllProps, State> {
    constructor(props: AllProps) {
        super(props);

        this.state = { title: '', linkText: '', previewText: '', fullText: '' };

        this.handleChange = this.handleChange.bind(this);
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
                title: this.props.post.title,
                linkText: this.props.post.linkText,
                previewText: this.props.post.previewText,
                fullText: this.props.post.fullText
            });
        }
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ [event.currentTarget.name]: event.currentTarget.value } as React.ComponentState);
    }

    handleMdChange = (name: string, value: string) => {
        this.setState({ [name] : value } as React.ComponentState);
    }

    render() {
        if (this.props.post.isFetching) {
            return (<Loading />);
        }

        const { title, linkText, previewText, fullText } = this.state;

        return (
        <div>
            <div>
                <label>
                    <span>Title</span>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={this.handleChange} />
                </label>
            </div>
            <div>
                <label>
                    <span>Link</span>
                    <input
                        type="text"
                        name="linkText"
                        value={linkText}
                        onChange={this.handleChange} />
                </label>
            </div>
            <div>
                <h3>Preview Text</h3>
                <MarkdownEditor 
                    name="previewText"
                    text={previewText}
                    onChange={this.handleMdChange} />
            </div>
            <div>
                <h3>Full Text</h3>
                <MarkdownEditor 
                    name="fullText"
                    text={fullText}
                    onChange={this.handleMdChange} />
            </div>
            <div>
                <h3>Tags</h3>
            </div>
        </div>);
    };
}

const mapStateToProps = (state: AppState) : StateProps => ({
    post: state.post
})

const mapDispatchToProps = (dispatch : Dispatch) : DispatchProps => ({
    ...bindActionCreators({ loadPost }, dispatch)
})

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Post);