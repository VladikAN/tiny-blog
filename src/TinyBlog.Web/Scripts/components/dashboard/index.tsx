import * as React from "react";
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from "redux";
import { AppState } from '../../store';
import { ThreadState } from '../../store/thread/reducers';
import { loadThread } from '../../store/thread/actions';
import Post from './../shared/post';
import Loading from './../shared/loading';
import { Link } from "react-router-dom";

interface StateProps extends ThreadState {}

interface DispatchProps {
    loadThread: typeof loadThread;
}

type AllProps = StateProps & DispatchProps;

class Dashboard extends React.Component<AllProps> {
    public componentDidMount(): void {
        if (!this.props.isFetched && !this.props.isFetching) {
            this.props.loadThread();
        }
    }

    public render(): React.ReactNode {
        if (!this.props.isFetched) {
            return (<Loading />);
        }

        const posts = this.props.posts.map(ps => (
            <Post key={ps.linkText} {...ps} />
        ));

        return (
            <React.Fragment>
                <div className="align-right">
                    <Link to="/admin/post">+ Add</Link>
                </div>
                <div className="thread">
                    {posts}
                </div>
            </React.Fragment>);
    };
}

const mapStateToProps = (state: AppState): StateProps => ({
    ...state.thread
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    ...bindActionCreators({ loadThread }, dispatch)
})

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Dashboard);