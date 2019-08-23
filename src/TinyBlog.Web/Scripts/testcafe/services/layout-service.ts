import * as mongoose from 'mongoose';
import { Layout, LayoutDomain } from '../types/layout';
import { MongoConnection } from '../constants';

export default class LayoutService {
    public async SetTitle(title: string): Promise<LayoutDomain> {
        mongoose.connect(MongoConnection, { useNewUrlParser: true });

        let record = await Layout.findOne();
        record.title = title;

        const layout = await Layout.updateOne({}, record);
        mongoose.disconnect();

        return layout;
    }

    public async Get(): Promise<LayoutDomain> {
        mongoose.connect(MongoConnection, { useNewUrlParser: true });
        const layout = await Layout.findOne();
        mongoose.disconnect();
        return layout;
    }

    public async Save(layout: LayoutDomain): Promise<void> {
        if (layout == null) {
            throw new Error("layout is required parameter");
        }

        mongoose.connect(MongoConnection, { useNewUrlParser: true });
        const saved = await Layout.updateOne({}, layout);
        mongoose.disconnect();
        return saved;
    }
}