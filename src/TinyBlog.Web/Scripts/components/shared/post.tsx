import * as React from 'react';
import { Link } from 'react-router-dom';
import { Tag, Typography } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import MarkdownView from './markdown-view';
import DateRender from './date-render';
import { Post as PostType } from '../../store/post/types';
import { strings } from '../../localization';

const { Title, Text } = Typography;

interface StateProps extends PostType {}
type AllProps = StateProps;

class Post extends React.Component<AllProps> {
    public render(): React.ReactNode {
        const { title, id, publishedAt, previewText, tags, isPublished } = this.props;

        return (
            <div className="thread__post" style={{ marginBottom: 32 }}>
                <Title level={4}>
                    {!isPublished && <EyeOutlined title={strings.shared_post_notPublished} style={{ marginRight: 8 }} />}
                    {title}&nbsp;
                    <Link to={`/admin/post/${id}`}>{strings.shared_post_editLink}</Link>
                </Title>
                <Text type="secondary" className="date-upper">
                    <DateRender date={publishedAt} />
                </Text>
                <div className="thread__post_preview">
                    <MarkdownView text={previewText} />
                </div>
                {tags && tags.length > 0 && (
                    <div style={{ marginTop: 16 }}>
                        {tags.map(tg => (
                            <Tag key={tg} title={strings.formatString(strings.shared_post_tagTitle_format, tg).toString()}>
                                {tg}
                            </Tag>
                        ))}
                    </div>
                )}
            </div>);
    }
}

export default Post;
