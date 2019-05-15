import * as React from "react";
import { Tag as TagType } from './../../store/post/types';

interface OwnProps {
    text: string
}

type AllProps = OwnProps;

interface State {
    newText: string
}

class MarkdownEditor extends React.Component<AllProps, State> {
    constructor(props: AllProps) {
        super(props);

        this.state = {
            newText: this.props.text
        };
    }

    render() {
        let { newText } = this.state;

        return (<div>
            {newText}
        </div>);
    };
}

export default MarkdownEditor;