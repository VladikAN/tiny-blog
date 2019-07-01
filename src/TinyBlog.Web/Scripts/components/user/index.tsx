import * as React from 'react';
import { AppState } from '../../store';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout as LayoutType } from '../../store/layout/types';
import Loading from '../shared/loading';
import { strings } from '../../localization';
import { UsersState } from '../../store/user/reducers';
import { getUsers } from '../../store/user/actions';

interface StateProps extends UsersState {
}

interface DispatchProps {
    getUsers: typeof getUsers
}

interface OwnProps {
}

export type AllProps = OwnProps & StateProps & DispatchProps;

interface State extends LayoutType {
}

export class Users extends React.Component<AllProps, State> {
    public constructor(props: AllProps) {
        super(props);
    }

    public componentDidMount(): void {
        if (!this.props.isFetched && !this.props.isFetching) {
            this.props.getUsers();
        }
    }

    public render(): React.ReactNode {
        if (this.props.isFetching) {
            return (<Loading />);
        }

        return (
            <div>
                <h1>{strings.user_page_title}</h1>
            </div>);
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    ...state.user
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    ...bindActionCreators({
        getUsers
    }, dispatch)
});

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Users);