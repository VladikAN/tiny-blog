import * as React from "react";
import { AppState } from "../../store";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from 'react-redux';

interface StateProps {
}

interface DispatchProps {
}

interface OwnProps {

}

type AllProps = OwnProps & StateProps & DispatchProps;

interface State {
    isAuthorized: boolean
}

class Login extends React.Component<AllProps, State> {
    constructor(props: AllProps) {
        super(props);

        this.state = {
            isAuthorized: false
        }
    }

    render() {
        const { isAuthorized } = this.state;

        return (
        <React.Fragment>
            {isAuthorized && this.props.children}
            {!isAuthorized && <div className="login">
                <div className="login__email">
                    <label>
                        <span>Email</span>
                        <input
                            type="text"
                            name="email" />
                    </label>
                </div>
                <div className="login__password">
                    <label>
                        <span>Password</span>
                        <input
                            type="password"
                            name="password" />
                    </label>
                </div>
            </div>}
        </React.Fragment>);
    };
}

const mapStateToProps = (state: AppState) : StateProps => ({
})

const mapDispatchToProps = (dispatch : Dispatch) : DispatchProps => ({
})

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Login);