import * as React from 'react';
import { Alert, Button } from 'antd';

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
        const { type, text, buttonText, onClick } = this.props;
        const alertType = type == ZoneType.success ? 'success' : 'error';

        return (
            <Alert
                style={{ marginTop: 16 }}
                type={alertType}
                message={text}
                action={
                    <Button
                        danger={type == ZoneType.danger}
                        type={type == ZoneType.success ? 'primary' : 'default'}
                        onClick={onClick}>
                        {buttonText}
                    </Button>
                }
            />);
    }
}

export default Zone;
