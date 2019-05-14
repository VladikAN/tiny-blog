import * as React from "react";
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from "redux";
import { AppState } from '../../store';
import { ThreadState } from '../../store/thread/types';
import { loadThread } from '../../store/thread/actions';

interface StateProps {
    thread: ThreadState
}

interface DispatchProps {
    loadThread: typeof loadThread
}

interface OwnProps {
}

type AllProps = OwnProps & StateProps & DispatchProps;

interface State {}

class Thread extends React.Component<AllProps, State> {
    constructor(props: AllProps) {
        super(props);

        if (!this.props.thread.isFetched && !this.props.thread.isFetching) {
            this.props.loadThread();
        }
    }

    render() {
        if (!this.props.thread.isFetched) {
            return (<div>loading</div>);
        } 

        return (<div>Hello</div>);
    };
}

const mapStateToProps = (state: AppState) : StateProps => ({
    thread: state.thread
})

const mapDispatchToProps = (dispatch : Dispatch) : DispatchProps => ({
    ...bindActionCreators({ loadThread }, dispatch)
})

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Thread);