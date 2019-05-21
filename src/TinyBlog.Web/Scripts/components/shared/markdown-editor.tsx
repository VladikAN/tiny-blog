import * as React from "react";
import { Markdown } from 'react-showdown';

import 'Styles/markdown-editor.scss';

interface OwnProps {
    name: string;
    text: string;
}

interface DispatchProps {
    onChange: (name: string, value: string) => void;
}

type AllProps = OwnProps & DispatchProps;

interface State {
    newText: string;
}

class MarkdownEditor extends React.Component<AllProps, State> {
    constructor(props: AllProps) {
        super(props);

        this.state = {
            newText: this.props.text
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(prev: AllProps) {
        if (prev.text != this.props.text) {
            this.setState({ newText: this.props.text });
        }
    }

    handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        this.setState({ newText: value });
        this.props.onChange(this.props.name, value);
    }

    render() {
        const { newText } = this.state;

        return (
            <div className="md-editor">
                <div className="md-editor__window md-editor__window-left">
                    <textarea value={newText || ''} onChange={this.handleChange} />
                </div>
                <div className="md-editor__window md-editor__window-right">
                    <Markdown markup={newText || ''} />
                </div>
            </div>);
    };
}

export default MarkdownEditor;