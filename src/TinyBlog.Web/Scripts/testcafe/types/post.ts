import * as mongoose from 'mongoose';

export interface PostDomain extends mongoose.Document {
    title: string;
    linkText: string;
    previewText: string;
    fullText: string;
    publishedAt: Date;
    tags: string[];
    isPublished: boolean;
}

const PostSchema: mongoose.Schema = new mongoose.Schema({
    title: { type: String, required: true },
    linkText: { type: String, required: true, unique: true },
    previewText: { type: String, required: true },
    fullText: { type: String, required: true },
    publishedAt: { type: Date },
    tags: { type: [String] },
    isPublished: { type: Boolean, required: true }
});

export const Post = mongoose.model<PostDomain>('posts', PostSchema);