import * as React from "react";
import { loadPost } from "../../store/post/actions";
import { PostState } from "../../store/post/reducers";
import { AppState } from "../../store";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from 'react-redux';

interface StateProps {
    post: PostState
}

interface DispatchProps {
    loadPost: typeof loadPost
}

interface OwnProps {
    linkText: string
}

type AllProps = OwnProps & StateProps & DispatchProps;

interface State {}

class Post extends React.Component<AllProps, State> {
    constructor(props: AllProps) {
        super(props);

        if ((!this.props.post.isFetched && !this.props.post.isFetching)
            || this.props.post.linkText != this.props.linkText) {
            this.props.loadPost(this.props.linkText);
        }
    }

    render() {
        return (
        <div>
            {this.props.post.title}
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