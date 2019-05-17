import * as React from "react";

import 'Styles/zone.scss';

export enum ZoneType {
    green,
    red
}

interface OwnProps {
    type: ZoneType,
    text: string,
    buttonText: string
}

interface DispatchProps {
    onClick: () => void
}

type AllProps = OwnProps & DispatchProps;

interface State {
}

class Zone extends React.Component<AllProps, State> {
    render() {
        const { type, text, buttonText } = this.props;
        const className = type == ZoneType.green
            ? 'zone-green'
            : 'zone-red';

        return (
        <div className={`zone ${className}`}>
            <div className="zone__text">{text}</div>
            <div className="zone__button">
                <button
                    type="button"
                    onClick={this.props.onClick}>
                    {buttonText}
                </button>
            </div>
        </div>);
    };
}

export default Zone;