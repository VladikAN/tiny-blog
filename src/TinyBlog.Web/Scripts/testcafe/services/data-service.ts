import * as mongoose from 'mongoose';
import { User } from './schemes';
import { UserDomain } from './types';
import { MongoConnection, DefaultPasswordHash, DefaultPasswordSalt } from '../constants';

export default class DataService {
    public async UpsertUser(username: string, requestPasswordChange: boolean = false, isActive: boolean = true): Promise<UserDomain> {
        mongoose.connect(MongoConnection, { useNewUrlParser: true });

        let record = await User.findOne({ username: username });
        record = record != null ? record : new User();

        record.username = username;
        record.email = `${username}@domain.com`;
        record.passwordHash = DefaultPasswordHash;
        record.passwordSalt = DefaultPasswordSalt;
        record.isActive = isActive;
        record.changePassword = requestPasswordChange ? { token: '1pnsk7ZoR0+VogyT+XzJxQ==' } : null;

        const user = await User.updateOne({ username: username }, record, { upsert: true });
        mongoose.disconnect();

        return user;
    }
}