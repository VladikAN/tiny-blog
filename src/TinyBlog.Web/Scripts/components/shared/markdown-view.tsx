import * as React from "react";
import { Markdown } from 'react-showdown';

interface OwnProps {
    text: string;
}

type AllProps = OwnProps;

class MarkdownView extends React.Component<AllProps> {
    public render(): React.ReactNode {
        const { text } = this.props;

        return (
            <div className="markdown">
                <Markdown markup={text || ''} />
            </div>);
    };
}

export default MarkdownView;