import * as React from "react";
import { Link } from "react-router-dom";
import MarkdownView from './markdown-view';
import Tag from './tag';
import { Post as PostType } from '../../store/post/types';

interface StateProps extends PostType {}

type AllProps = StateProps;

interface State {}

class Post extends React.Component<AllProps, State> {
    render() {
        const { title, linkText, publishedAt, previewText, tags, isPublished } = this.props;
        
        const extendedTitle = isPublished ? title : `[draft] ${title}`;
        const tagsRender = tags.map(tg => (
            <Tag key={tg.name} {...tg} />
        ));

        return (
        <div className="thread__post">
            <Link className="link-header" to={`/admin/post/${linkText}`}>
                <h2>{extendedTitle}</h2>
            </Link>
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