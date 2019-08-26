import * as mongoose from 'mongoose';

export interface LayoutDomain extends mongoose.Document {
    title: string;
    headerContent: string;
    footerContent: string;
}

const LayoutSchema: mongoose.Schema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    headerContent: { type: String, required: true, unique: true },
    footerContent: { type: String, required: true, unique: true }
});

export const Layout = mongoose.model<LayoutDomain>('layout', LayoutSchema, 'layout');