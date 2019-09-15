import * as mongoose from 'mongoose';

export interface LayoutDomain extends mongoose.Document {
    title: string;
    description: string;
    uri: string;
    author: string;
    language: string;
    googleTagsCode: string;
    headerContent: string;
    footerContent: string;
}

const LayoutSchema: mongoose.Schema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    uri: { type: String },
    author: { type: String },
    language: { type: String },
    googleTagsCode: { type: String },
    headerContent: { type: String },
    footerContent: { type: String }
});

export const Layout = mongoose.model<LayoutDomain>('layout', LayoutSchema, 'layout');