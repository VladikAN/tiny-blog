import * as React from "react";
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from "redux";
import { dropJwtToken } from "../../api/jwt";
import { AppState } from '../../store';
import { ThreadState } from '../../store/thread/reducers';
import { loadThread } from '../../store/thread/actions';
import Post from './../shared/post';
import Loading from './../shared/loading';
import { Link, Redirect } from "react-router-dom";

interface StateProps extends ThreadState {}

interface DispatchProps {
    loadThread: typeof loadThread;
}

type AllProps = StateProps & DispatchProps;

interface State {
    isLoggedOut: boolean;
}

class Dashboard extends React.Component<AllProps, State> {
    public constructor(props: AllProps) {
        super(props);

        this.state = { isLoggedOut: false };

        this.handleLogout = this.handleLogout.bind(this);
    }

    public componentDidMount(): void {
        if (!this.props.isFetched && !this.props.isFetching) {
            this.props.loadThread();
        }
    }

    private handleLogout(): void {
        dropJwtToken();
        this.setState({ isLoggedOut: true });
    }

    public render(): React.ReactNode {
        if (!this.props.isFetched) {
            return (<Loading />);
        }

        if (this.state.isLoggedOut) {
            return (<Redirect to="/admin" />);
        }

        const posts = this.props.posts.map(ps => (
            <Post key={ps.linkText} {...ps} />
        ));

        return (
            <React.Fragment>
                <div className="controls">
                    <div className="controls__btn">
                        <Link to="/admin/post">
                            <span className="typcn typcn-document-add"></span>&nbsp;Add
                        </Link>
                    </div>
                    <div className="controls__btn">
                        <a href={null} onClick={this.handleLogout}>
                            <span className="typcn typcn-key"></span>&nbsp;logout
                        </a>
                    </div>
                </div>
                <div className="thread">
                    {posts}
                </div>
            </React.Fragment>);
    };
}

const mapStateToProps = (state: AppState): StateProps => ({
    ...state.thread
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    ...bindActionCreators({ loadThread }, dispatch)
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Dashboard);