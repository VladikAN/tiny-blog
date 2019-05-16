import * as React from "react";
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from "redux";
import { AppState } from '../../store';
import { ThreadState } from '../../store/thread/reducers';
import { loadThread } from '../../store/thread/actions';
import Post from './post';

interface StateProps extends ThreadState {
}

interface DispatchProps {
    loadThread: typeof loadThread
}

interface OwnProps {
}

type AllProps = OwnProps & StateProps & DispatchProps;

interface State {}

class Thread extends React.Component<AllProps, State> {
    componentDidMount() {
        if (!this.props.isFetched && !this.props.isFetching) {
            this.props.loadThread();
        }
    }

    render() {
        if (!this.props.isFetched) {
            return (<div>loading</div>);
        }

        const posts = this.props.posts.map(ps => (
            <Post key={ps.linkText} {...ps} />
        ));

        return (
        <div className="thread">
            {posts}
        </div>);
    };
}

const mapStateToProps = (state: AppState) : StateProps => ({
    ...state.thread
})

const mapDispatchToProps = (dispatch : Dispatch) : DispatchProps => ({
    ...bindActionCreators({ loadThread }, dispatch)
})

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Thread);