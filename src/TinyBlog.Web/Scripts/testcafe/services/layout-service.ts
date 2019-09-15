import * as mongoose from 'mongoose';
import { Layout, LayoutDomain } from '../types/layout';
import { MongoConnection } from '../constants';

export default class LayoutService {
    public async SetTitle(title: string): Promise<LayoutDomain> {
        await mongoose.connect(MongoConnection, { useNewUrlParser: true });

        let record = await Layout.findOne();
        record.title = title;

        await Layout.updateOne({}, record);
        const layout = await Layout.findOne({});
        await mongoose.disconnect();

        return layout;
    }

    public async SetHeader(headerMd: string): Promise<LayoutDomain> {
        await mongoose.connect(MongoConnection, { useNewUrlParser: true });

        let record = await Layout.findOne();
        record.headerContent = headerMd;

        await Layout.updateOne({}, record);
        const layout = await Layout.findOne({});
        await mongoose.disconnect();

        return layout;
    }

    public async SetFooter(footerMd: string): Promise<LayoutDomain> {
        await mongoose.connect(MongoConnection, { useNewUrlParser: true });

        let record = await Layout.findOne();
        record.footerContent = footerMd;

        await Layout.updateOne({}, record);
        const layout = await Layout.findOne({});
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
        await Layout.updateOne({}, layout);
        await mongoose.disconnect();
    }
}