import * as mongoose from 'mongoose';
import { UserDomain } from './types';

export const UserSchema: mongoose.Schema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    passwordSalt: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    isSuper: { type: Boolean, required: false },
    changePassword: {
        token: { type: String, required: true }
    }
});

export const User = mongoose.model<UserDomain>('users', UserSchema);