const tokenName = "jwtToken";

export function getJwtToken():string {
    return localStorage.getItem(tokenName);
};

export function dropJwtToken():void {
    localStorage.removeItem(tokenName);
};

export function setJwtToken(token: string):void {
    localStorage.setItem(tokenName, token);
};