export interface User {
    username: string;
    email: string;
    isActive: boolean;
    isSuper?: boolean;
}