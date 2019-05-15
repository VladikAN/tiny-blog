import * as React from "react";
import { Tag as TagType } from './../../store/post/types';

interface StateProps extends TagType {
}

type AllProps = StateProps;

interface State {}

class Tag extends React.Component<AllProps, State> {
    render() {
        let { name } = this.props;

        return (<a href={null}>{name}</a>);
    };
}

export default Tag;