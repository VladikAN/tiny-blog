import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { AppState } from '../../store';
import { ThreadState } from '../../store/thread/reducers';
import { loadThread } from '../../store/thread/actions';
import Post from './../shared/post';
import Loading from './../shared/loading';
import { NavLink } from 'react-router-dom';
import { strings } from '../../localization';

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
                </div>

                <h1>{strings.post_page_title}</h1>

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