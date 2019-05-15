import * as React from "react";

interface StateProps {
    link: string
}

type AllProps = StateProps;

interface State {}

export default class Post extends React.Component<AllProps, State> {
    render() {
        return (
        <div>
            Hello {this.props.link}
        </div>);
    };
}