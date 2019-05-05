import * as React from "react";
import { connect } from 'react-redux';

class Thread extends React.Component {
    render() {
        return (<div>Hello</div>);
    };
}

export default connect()(Thread);