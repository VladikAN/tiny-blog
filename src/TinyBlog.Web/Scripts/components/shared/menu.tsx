import * as React from 'react';
import { Layout, Menu as AntMenu } from 'antd';
import {
    FileTextOutlined,
    SettingOutlined,
    UserOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { strings } from '../../localization';
import { logout } from '../../store/login/actions';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

const { Sider } = Layout;

interface DispatchProps {
    logout: typeof logout;
}

type AllProps = DispatchProps;

const menuItems = [
    { key: '/admin', icon: <FileTextOutlined />, label: strings.dashboard_link_posts },
    { key: '/admin/layout', icon: <SettingOutlined />, label: strings.dashboard_link_layout },
    { key: '/admin/user', icon: <UserOutlined />, label: strings.dashboard_link_user },
    { key: 'logout', icon: <LogoutOutlined />, label: strings.dashboard_logout }
];

const MenuView: React.FC<AllProps> = ({ logout: onLogout }) => {
    const history = useHistory();
    const location = useLocation();

    const handleClick = ({ key }: { key: string }): void => {
        if (key === 'logout') {
            onLogout();
            return;
        }
        history.push(key);
    };

    return (
        <Sider width={220} theme="light" style={{ borderRight: '1px solid #f0f0f0' }}>
            <AntMenu
                mode="inline"
                selectedKeys={[location.pathname]}
                items={menuItems}
                onClick={handleClick}
                style={{ height: '100%', borderRight: 0 }}
            />
        </Sider>
    );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    ...bindActionCreators({ logout }, dispatch)
});

export default connect<Record<string, never>, DispatchProps>(null, mapDispatchToProps)(MenuView);
