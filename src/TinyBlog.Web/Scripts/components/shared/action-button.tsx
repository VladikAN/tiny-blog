import * as React from 'react';

interface OwnProps {
    title: string;
    className?: string;
    onClick: () => void;
}

type AllProps = OwnProps;

class ActionButton extends React.Component<AllProps> {
    public render(): React.ReactNode {
        const { title, className, onClick } = this.props;

        return (
            <span
                title={title}
                className={`action ${className}`}
                onClick={onClick}
            />);
    };
}

export default ActionButton;