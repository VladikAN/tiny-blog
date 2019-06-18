import * as React from 'react';
import { togglePost } from '../../store/post/actions';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Zone, { ZoneType } from '../shared/zone';
import { strings } from '../../localization';

interface DispatchProps {
    togglePost: typeof togglePost;
}

interface OwnProps {
    id: string;
    isPublished: boolean;
}

export type AllProps = OwnProps & DispatchProps;

export class ZonePostPublish extends React.Component<AllProps> {
    public constructor(props: AllProps) {
        super(props);
        this.handlePublish = this.handlePublish.bind(this);
    }

    private handlePublish = (): void => {
        const publish = !this.props.isPublished;
        const message = publish
            ? strings.post_zone_publish_confirm
            : strings.post_zone_unpublish_confirm;
        
        if (confirm(message)) {
            this.props.togglePost(this.props.id, publish);
        }
    };

    public render(): React.ReactNode {
        const { isPublished } = this.props;
        const publishZoneText = isPublished
            ? strings.post_zone_unpublish_description
            : strings.post_zone_publish_description;

        return (
            <Zone
                type={isPublished ? ZoneType.danger : ZoneType.success}
                text={publishZoneText}
                buttonText={isPublished ? strings.post_zone_unpublish_button : strings.post_zone_publish_button}
                onClick={this.handlePublish} />);
    };
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    ...bindActionCreators({ togglePost }, dispatch)
});

export default connect<{}, DispatchProps, OwnProps>(null, mapDispatchToProps)(ZonePostPublish);