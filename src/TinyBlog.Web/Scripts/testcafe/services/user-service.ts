import * as mongoose from 'mongoose';
import { User, UserDomain } from '../types/user';
import { MongoConnection, DefaultPasswordHash, DefaultPasswordSalt, EmailDomain } from '../constants';

export default class UserService {
    public async UpsertUser(username: string, requestPasswordChange: boolean = false, isActive: boolean = true): Promise<UserDomain> {
        mongoose.connect(MongoConnection, { useNewUrlParser: true });

        let record = await User.findOne({ username: username });
        record = record != null ? record : new User();

        record.username = username;
        record.email = `${username}@${EmailDomain}`;
        record.passwordHash = DefaultPasswordHash;
        record.passwordSalt = DefaultPasswordSalt;
        record.isActive = isActive;
        record.changePassword = requestPasswordChange ? { token: '1pnsk7ZoR0+VogyT+XzJxQ==' } : null;

        await User.updateOne({ username: username }, record, { upsert: true });
        const user = await User.findOne({ username: username });
        mongoose.disconnect();

        return user;
    }

    public async Get(email: string): Promise<UserDomain> {
        mongoose.connect(MongoConnection, { useNewUrlParser: true });
        const user = await User.findOne({ email: email });
        mongoose.disconnect();
        return user;
    }

    public async CleanupTestRun(): Promise<void> {
        mongoose.connect(MongoConnection, { useNewUrlParser: true });
        await User.deleteMany({ email: { $regex: EmailDomain, $options: 'i' } });
        mongoose.disconnect();
    }
}