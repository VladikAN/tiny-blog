import * as React from "react";

import 'Styles/zone.scss';

export enum ZoneType {
    success,
    danger
}

interface OwnProps {
    type: ZoneType;
    text: string;
    buttonText: string;
}

interface DispatchProps {
    onClick: () => void;
}

type AllProps = OwnProps & DispatchProps;

class Zone extends React.Component<AllProps> {
    public render(): React.ReactNode {
        const { type, text, buttonText } = this.props;
        const className = type == ZoneType.success
            ? 'zone-success'
            : 'zone-danger';
        const btnClassName = type == ZoneType.success
            ? 'btn-success'
            : 'btn-danger';

        return (
            <div className={`zone ${className}`}>
                <div className="zone__text">
                    {text}
                </div>
                <div className="zone__button">
                    <button
                        className={btnClassName}
                        type="button"
                        onClick={this.props.onClick}>
                        {buttonText}
                    </button>
                </div>
            </div>);
    };
}

export default Zone;