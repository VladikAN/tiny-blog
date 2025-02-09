import JwtDecode = require('jwt-decode');

const tokenName = 'jwtToken';

export function getJwtToken():string {
    return localStorage.getItem(tokenName);
};

export function getUsername(): string {
    const token = getJwtToken();
    const user = JwtDecode(token);
    return (user as any).unique_name;
};

export function dropJwtToken():void {
    localStorage.removeItem(tokenName);
};

export function setJwtToken(token: string):void {
    localStorage.setItem(tokenName, token);
};