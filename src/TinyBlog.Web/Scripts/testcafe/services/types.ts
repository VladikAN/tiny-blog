import * as mongoose from 'mongoose';

export interface UserDomain extends mongoose.Document {
    username: string;
    email: string;
    passwordHash: string;
    passwordSalt: string;
    isActive: boolean;
    isSuper: boolean;
    changePassword: ChangePassword;
}

export interface ChangePassword {
    token: string;
}