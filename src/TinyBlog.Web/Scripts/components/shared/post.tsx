import * as React from "react";
import { Link } from "react-router-dom";
import Tag from './tag';
import { Post as PostType } from '../../store/post/types';

interface StateProps {
    post: PostType
}

type AllProps = StateProps;

interface State {}

class Post extends React.Component<AllProps, State> {
    render() {
        const { title, linkText, publishedAt, previewText, tags } = this.props.post;

        const tagsRender = tags.map(tg => (
            <Tag key={tg.name} tag={tg} />
        ));

        return (
        <div className="thread__post">
            <Link className="link-header" to={`/admin/post/${linkText}`}>
                <h2>{title}</h2>
            </Link>
            <div className="thread__post_info">
                <span>{publishedAt}</span>
            </div>
            <div className="thread__post_preview">
                {previewText}
            </div>
            <div className="tags">
                {tagsRender}
            </div>
        </div>);
    };
}

export default Post;