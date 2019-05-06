import * as React from "react";
import { connect } from 'react-redux';
import { AppState } from './../../store';
import { ThreadState } from './../../store/thread/types';
import { loadThread } from './../../store/thread/actions';

const mapStateToProps = (state: AppState) => ({
    loadThread: typeof loadThread,
    thread: state.thread
})

interface AppProps {
    thread: ThreadState
}

class Thread extends React.Component<AppProps> {
    render() {
        return (<div>Hello</div>);
    };
}

export default connect()(Thread);