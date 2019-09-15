import * as React from 'react';

interface OwnProps {
    title: string;
    text?: string;
    className?: string;
    onClick: () => void;
}

type AllProps = OwnProps;

class ActionButton extends React.Component<AllProps> {
    public render(): React.ReactNode {
        const { title, text, className, onClick } = this.props;

        return (
            <span className="action" onClick={onClick}>
                <span title={title} className={className} />
                {text && <span className="action__text">&nbsp;{text}</span>}
            </span>);
    };
}

export default ActionButton;