import * as React from 'react';
import { deletePost } from '../../store/post/actions';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Zone, { ZoneType } from '../shared/zone';
import { strings } from '../../localization';

interface DispatchProps {
    deletePost: typeof deletePost;
}

interface OwnProps {
    id: string;
}

export type AllProps = OwnProps & DispatchProps;

export class ZonePostDelete extends React.Component<AllProps> {
    public constructor(props: AllProps) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    private handleDelete = (id: string):void => {
        if (confirm(strings.post_zone_delete_confirm)) {
            this.props.deletePost(id);
        }
    };

    public render(): React.ReactNode {
        return (
            <Zone
                type={ZoneType.danger}
                text={strings.post_zone_delete_description}
                buttonText={strings.post_zone_delete_button}
                onClick={() => this.handleDelete(this.props.id)} />);
    };
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    ...bindActionCreators({ deletePost }, dispatch)
});

export default connect<DispatchProps, OwnProps>(mapDispatchToProps)(ZonePostDelete);