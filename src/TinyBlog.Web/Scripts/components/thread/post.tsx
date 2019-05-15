import * as React from "react";
import Tag from './tag';
import { Post as PostType } from './../../store/post/types';

interface OwnProps {
    post: PostType
}

type AllProps = OwnProps;

interface State {}

class Post extends React.Component<AllProps, State> {
    render() {
        const { title, publishedAt, previewText, tags } = this.props.post;

        const tagsRender = tags.map(tg => (
            <Tag key={tg.name} tag={tg} />
        ));

        return (
        <div className="thread__post">
            <a className="link-header" href={null}>
                <h2>{title}</h2>
            </a>
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