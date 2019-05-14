import * as React from "react";

interface OwnProps {
    title: string
}

type AllProps = OwnProps;

interface State {}

class Post extends React.Component<AllProps, State> {
    render() {
        return (<div>{this.props.title}</div>);
    };
}

export default Post;