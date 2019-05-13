import * as React from "react";
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { ThreadState } from '../../store/thread/types';
import { loadThread } from '../../store/thread/actions';

interface OwnProps {
    loadThread: typeof loadThread,
    thread: ThreadState
}

type AllProps = OwnProps;

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

const mapStateToProps = (state: AppState) => ({
    loadThread: typeof loadThread,
    thread: state.thread
})

export default connect<OwnProps>(mapStateToProps)(Thread);