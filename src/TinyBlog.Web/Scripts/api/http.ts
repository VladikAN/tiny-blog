import { getJwtToken } from './jwt';

export const http = <T>(request: RequestInfo): Promise<T> => {
    const token = getJwtToken();
    const merged = new Request(request, {
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        }
    });

    return new Promise((resolve, reject) => {
        fetch(merged)
            .then(response => {
                if (!response.ok) {
                    reject(response.status);
                    return;
                }
                
                resolve(response.json());
            })
            .catch(err => reject(err));
    });
};