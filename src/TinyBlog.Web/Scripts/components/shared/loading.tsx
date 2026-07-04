import * as React from 'react';
import { Spin } from 'antd';
import { strings } from '../../localization';

export default class Loading extends React.Component {
    public render(): React.ReactNode {
        return (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <Spin size="large" />
                <div style={{ marginTop: 16 }}>{strings.shared_loading}</div>
            </div>
        );
    }
}
