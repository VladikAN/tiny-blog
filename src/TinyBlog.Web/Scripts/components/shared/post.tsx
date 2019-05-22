import * as React from "react";
import { Link } from "react-router-dom";
import MarkdownView from './markdown-view';
import Tag from './tag';
import { Post as PostType } from '../../store/post/types';

interface StateProps extends PostType {}
type AllProps = StateProps;

class Post extends React.Component<AllProps> {
    public render(): React.ReactNode {
        const { title, id, publishedAt, previewText, tags, isPublished } = this.props;
        
        const extendedTitle = isPublished ? title : `[draft] ${title}`;
        const tagsRender = tags.map<React.ReactNode>(tg => (
            <Tag key={tg.name} {...tg} />
        ));

        return (
            <div className="thread__post">
                <h2>{extendedTitle} <Link className="link-header" to={`/admin/post/${id}`}>[Edit]</Link></h2>
                <div className="thread__post_info">
                    <span>{publishedAt}</span>
                </div>
                <div className="thread__post_preview">
                    <MarkdownView text={previewText} />
                </div>
                <div className="tags">
                    {tagsRender}
                </div>
            </div>);
    };
}

export default Post;