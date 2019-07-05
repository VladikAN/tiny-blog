import * as React from 'react';
import { NavLink } from 'react-router-dom';
import MarkdownView from './markdown-view';
import DateRender from './date-render';
import { Post as PostType } from '../../store/post/types';
import { strings } from '../../localization';

interface StateProps extends PostType {}
type AllProps = StateProps;

class Post extends React.Component<AllProps> {
    public render(): React.ReactNode {
        const { title, id, publishedAt, previewText, tags, isPublished } = this.props;

        const tagsRender = tags.map<React.ReactNode>(tg => (
            <a
                key={tg}
                href={null}
                title={strings.formatString(strings.shared_post_tagTitle_format, tg).toString()}>{tg}</a>
        ));

        return (
            <div className="thread__post">
                <h2>
                    {!isPublished && <span className="typcn typcn-eye-outline" title={strings.shared_post_notPublished}></span>}
                    {title}&nbsp;
                    <NavLink className="link-header" to={`/admin/post/${id}`}>{strings.shared_post_editLink}</NavLink></h2>
                <div className="thread__post_info">
                    <DateRender date={publishedAt} />
                </div>
                <div className="thread__post_preview">
                    <MarkdownView text={previewText} />
                </div>
                {tagsRender && tagsRender.length > 0 && <div className="tags">{tagsRender}</div>}
            </div>);
    };
}

export default Post;