import * as mongoose from 'mongoose';
import { Layout, LayoutDomain } from '../types/layout';
import { MongoConnection } from '../constants';

export default class LayoutService {
    public async SetTitle(title: string): Promise<LayoutDomain> {
        await mongoose.connect(MongoConnection, { useNewUrlParser: true });

        let record = await Layout.findOne();
        record.title = title;

        const layout = await Layout.updateOne({}, record);
        await mongoose.disconnect();

        return layout;
    }

    public async SetHeaderContent(headerMd: string): Promise<LayoutDomain> {
        await mongoose.connect(MongoConnection, { useNewUrlParser: true });

        let record = await Layout.findOne();
        record.headerContent = headerMd;

        const layout = await Layout.updateOne({}, record);
        await mongoose.disconnect();

        return layout;
    }

    public async SetFooterContent(footerMd: string): Promise<LayoutDomain> {
        await mongoose.connect(MongoConnection, { useNewUrlParser: true });

        let record = await Layout.findOne();
        record.footerContent = footerMd;

        const layout = await Layout.updateOne({}, record);
        await mongoose.disconnect();

        return layout;
    }

    public async Get(): Promise<LayoutDomain> {
        await mongoose.connect(MongoConnection, { useNewUrlParser: true });
        const layout = await Layout.findOne();
        await mongoose.disconnect();
        return layout;
    }

    public async Save(layout: LayoutDomain): Promise<void> {
        if (layout == null) {
            throw new Error('layout is required parameter');
        }

        await mongoose.connect(MongoConnection, { useNewUrlParser: true });
        const saved = await Layout.updateOne({}, layout);
        await mongoose.disconnect();
        return saved;
    }
}