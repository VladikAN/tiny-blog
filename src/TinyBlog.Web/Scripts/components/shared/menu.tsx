import * as React from 'react';
import { strings } from '../../localization';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/login/actions';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

interface DispatchProps {
    logout: typeof logout;
}

type AllProps = DispatchProps;

interface State {
    isOpen: boolean;
}

class Menu extends React.Component<AllProps, State> {
    public constructor(props: AllProps) {
        super(props);

        this.state = { isOpen: false };

        this.handleLogout = this.handleLogout.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    private handleLogout(): void {
        this.props.logout();
    }

    private handleToggle(): void {
        this.setState({ isOpen: !this.state.isOpen });
    }

    public render(): React.ReactNode {
        const { isOpen } = this.state;
        const toggleClassName = isOpen
            ? 'typcn-media-play-reverse'
            : 'typcn-media-play';

        return (
            <div className="dashboard__menu">
                <div
                    className="dashboard__menu__toggle"
                    onClick={this.handleToggle}
                    title={strings.dashboard_toggle}>
                    <span className={`typcn ${toggleClassName}`}/>
                </div>
                <NavLink
                    className={`dashboard__menu__link ${!isOpen && 'link-no-text'}`}
                    activeClassName="link-active"
                    to="/admin"
                    title={strings.dashboard_link_posts}>
                    <span className="typcn typcn-document-text"/>{isOpen && strings.dashboard_link_posts}
                </NavLink>
                <NavLink
                    className={`dashboard__menu__link ${!isOpen && 'link-no-text'}`}
                    activeClassName="link-active"
                    to="/admin/layout"
                    title={strings.dashboard_link_layout}>
                    <span className="typcn typcn-spanner"/>{isOpen && strings.dashboard_link_layout}
                </NavLink>
                <NavLink
                    className={`dashboard__menu__link ${!isOpen && 'link-no-text'}`}
                    activeClassName="link-active"
                    to="/admin/user"
                    title={strings.dashboard_link_user}>
                    <span className="typcn typcn-user"/>{isOpen && strings.dashboard_link_user}
                </NavLink>
                <a
                    className={`dashboard__menu__link ${!isOpen && 'link-no-text'}`}
                    title={strings.dashboard_logout}
                    onClick={this.handleLogout}>
                    <span className="typcn typcn-key"/>{isOpen && strings.dashboard_logout}
                </a>
            </div>);
    }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    ...bindActionCreators({ logout }, dispatch)
});

export default connect<{}, DispatchProps>(null, mapDispatchToProps)(Menu);