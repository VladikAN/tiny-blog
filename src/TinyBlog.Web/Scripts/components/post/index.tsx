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
}

class Post extends React.Component<AllProps, State> {
    constructor(props: AllProps) {
        super(props);

        if ((!this.props.post.isFetched && !this.props.post.isFetching)
            || this.props.post.linkText != this.props.id) {
            this.props.loadPost(this.props.id);
        }
    }

    handlePreviewChange = (value: string) => {
        this.setState({ previewText: value });
    }

    render() {
        if (this.props.post.isFetching) {
            return (<Loading />);
        }

        const { previewText } = this.props.post;

        return (
        <div>
            <div>
                <label>
                    <span>Title</span>
                    <input
                        type="text" 
                        name="title" />
                </label>
            </div>
            <div>
                <label>
                    <span>Link</span>
                    <input
                        type="text" 
                        name="link" />
                </label>
            </div>
            <MarkdownEditor text={previewText} />
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