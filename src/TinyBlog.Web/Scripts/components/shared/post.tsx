import * as React from "react";
import { Link } from "react-router-dom";
import MarkdownView from './markdown-view';
import DateRender from './date-render';
import { Post as PostType } from '../../store/post/types';

interface StateProps extends PostType {}
type AllProps = StateProps;

class Post extends React.Component<AllProps> {
    public render(): React.ReactNode {
        const { title, id, publishedAt, previewText, tags, isPublished } = this.props;
        
        const extendedTitle = isPublished ? title : `[draft] ${title}`;
        const tagsRender = tags.map<React.ReactNode>(tg => (
            <a key={tg} href={null}>{tg}</a>
        ));

        return (
            <div className="thread__post">
                <h2>{extendedTitle} <Link className="link-header" to={`/admin/post/${id}`}>[Edit]</Link></h2>
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