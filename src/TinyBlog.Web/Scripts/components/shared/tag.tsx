import * as React from "react";
import { Tag as TagType } from './../../store/post/types';

interface StateProps {
    tag: TagType
}

type AllProps = StateProps;

interface State {}

class Post extends React.Component<AllProps, State> {
    render() {
        let { name } = this.props.tag;

        return (<a href={null}>{name}</a>);
    };
}

export default Post;