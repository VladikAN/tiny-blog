import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { AppState } from '../../store';
import { ThreadState } from '../../store/thread/reducers';
import { loadThread } from '../../store/thread/actions';
import Post from './../shared/post';
import Loading from './../shared/loading';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/login/actions';
import { strings } from '../../localization';

interface StateProps extends ThreadState {}

interface DispatchProps {
    loadThread: typeof loadThread;
    logout: typeof logout;
}

type AllProps = StateProps & DispatchProps;

class Dashboard extends React.Component<AllProps> {
    public constructor(props: AllProps) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    public componentDidMount(): void {
        if (!this.props.isFetched && !this.props.isFetching) {
            this.props.loadThread();
        }
    }

    private handleLogout(): void {
        this.props.logout();
    }

    public render(): React.ReactNode {
        if (!this.props.isFetched) {
            return (<Loading />);
        }

        const posts = this.props.posts.length > 0 
            ? this.props.posts.map(ps => (<Post key={ps.linkText} {...ps} /> ))
            : <div className="thread__no-records">{strings.dashboard_no_records}</div>;

        return (
            <React.Fragment>
                <div className="controls">
                    <div className="controls__btn">
                        <NavLink to="/admin/post">
                            <span className="typcn typcn-document-add"></span>&nbsp;{strings.dashboard_add}
                        </NavLink>
                    </div>
                    <div className="controls__btn">
                        <a href={null} onClick={this.handleLogout}>
                            <span className="typcn typcn-key"></span>&nbsp;{strings.dashboard_logout}
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
    ...bindActionCreators({ loadThread, logout }, dispatch)
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Dashboard);