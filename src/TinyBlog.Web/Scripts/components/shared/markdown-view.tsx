import * as React from "react";
import { Markdown } from 'react-showdown';

interface OwnProps {
    text: string;
}

type AllProps = OwnProps;

interface State {
}

class MarkdownView extends React.Component<AllProps, State> {
    render() {
        const { text } = this.props;

        return (
            <div>
                <Markdown markup={text || ''} />
            </div>);
    };
}

export default MarkdownView;