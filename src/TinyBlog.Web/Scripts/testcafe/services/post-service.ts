import * as mongoose from 'mongoose';
import { Post, PostDomain } from '../types/post';
import { MongoConnection, PostLinkPrefix } from '../constants';

export default class PostService {
    public async UpsertPost(title: string, previewText: string, fullText, isPublished: boolean, tags: string[]): Promise<PostDomain> {
        await mongoose.connect(MongoConnection, { useNewUrlParser: true });

        const linkText = PostLinkPrefix + title.toLowerCase().replace(' ', '-');
        let record = await Post.findOne({ linkText: linkText });
        record = record != null ? record : new Post();

        record.title = title;
        record.linkText = linkText;
        record.previewText = previewText;
        record.fullText = fullText;
        record.publishedAt = isPublished ? new Date() : null;
        record.tags = tags;
        record.isPublished = isPublished;

        await Post.updateOne({ linkText: linkText }, record, { upsert: true });
        const post = await Post.findOne({ linkText: linkText });
        await mongoose.disconnect();

        return post;
    }

    public async CleanupTestRun(): Promise<void> {
        await mongoose.connect(MongoConnection, { useNewUrlParser: true });
        await Post.deleteMany({ LinkText: { $regex: PostLinkPrefix, $options: 'i' } });
        await mongoose.disconnect();
    }
}