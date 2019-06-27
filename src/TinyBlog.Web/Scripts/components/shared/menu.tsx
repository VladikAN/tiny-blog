import * as React from 'react';
import { strings } from '../../localization';
import { NavLink } from 'react-router-dom';

interface AllProps {}

interface State {
    isOpen: boolean
}

export default class Menu extends React.Component<AllProps, State> {
    public constructor(props: AllProps) {
        super(props);

        this.state = { isOpen: true };

        this.handleToggle = this.handleToggle.bind(this);
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
                    className={`dashboard__menu__toggle typcn ${toggleClassName}`}
                    onClick={this.handleToggle}></div>
                <NavLink
                    className={`dashboard__menu__link ${!isOpen && "link-no-text"}`}
                    activeClassName="link-active"
                    to="/admin"
                    title={strings.dashboard_link_posts}>
                        <span className="typcn typcn-document-text"/>{isOpen && strings.dashboard_link_posts}
                    </NavLink>
                <NavLink
                    className={`dashboard__menu__link ${!isOpen && "link-no-text"}`}
                    activeClassName="link-active"
                    to="/admin/layout"
                    title={strings.dashboard_link_layout}>
                        <span className="typcn typcn-spanner"/>{isOpen && strings.dashboard_link_layout}
                    </NavLink>
            </div>);
    }
}