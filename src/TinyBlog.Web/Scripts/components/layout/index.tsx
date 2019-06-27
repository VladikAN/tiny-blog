import * as React from 'react';
import { AppState } from '../../store';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getLayout, saveLayout } from '../../store/layout/actions';
import { LayoutState } from '../../store/layout/reducers';
import Loading from '../shared/loading';
import { strings } from '../../localization';

interface StateProps {
    layout: LayoutState;
}

interface DispatchProps {
    getLayout: typeof getLayout;
    saveLayout: typeof saveLayout;
}

interface OwnProps {
}

export type AllProps = OwnProps & StateProps & DispatchProps;

interface State {
    title: string;
    description: string;
    uri: string;
    author: string;
    language: string;
    googleTagsCode: string;
    footerContent: string;
}

export class Layout extends React.Component<AllProps, State> {
    public constructor(props: AllProps) {
        super(props);
        this.state = {
            title: '',
            description: '',
            uri: '',
            author: '',
            language: '',
            googleTagsCode: '',
            footerContent: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleMdChange = this.handleMdChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public componentDidMount(): void {
        if (!this.props.layout.isFetching && !this.props.layout.isFetched) {
            this.props.getLayout();
        }
    }

    public componentDidUpdate(prev: Readonly<AllProps>): void {
        if (!prev.layout.isFetched && this.props.layout.isFetched) {
            this.setState({ ...this.props.layout });
        }
    }

    private handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ [event.currentTarget.name]: event.currentTarget.value } as React.ComponentState);
    };

    private handleMdChange = (name: string, value: string): void => {
        this.setState({ [name] : value } as React.ComponentState);
    };

    private handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        
        event.preventDefault();
    };

    public render(): React.ReactNode {
        if (this.props.layout.isFetching) {
            return (<Loading />);
        }

        const { title, description, uri, author, language, googleTagsCode, footerContent } = this.state;
        const { isSaving } = this.props.layout;

        return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <div className="editor-field">
                    <label>
                        <span>{strings.layout_form_title}</span>
                        <input
                            required={true}
                            type="text"
                            name="title"
                            value={title}
                            onChange={this.handleChange} />
                        <span className="editor-field__help">{strings.layout_form_title_description}</span>
                    </label>
                </div>

                <div className="align-right">
                    <button
                        className="btn-success"
                        type="submit"
                        disabled={isSaving}>
                        {strings.layout_form_save}
                    </button>
                </div>
            </form>
        </div>);
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    layout: state.layout
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    ...bindActionCreators({
        getLayout,
        saveLayout
    }, dispatch)
});

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Layout);