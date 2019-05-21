export const http = <T>(request: RequestInfo): Promise<T> => {
    const token = localStorage.getItem('jwtToken');
    const merged = new Request(request, {
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        }
    });

    return new Promise((resolve) => {
        fetch(merged)
            .then(response => {
                if (!response.ok) {
                    if (response.status == 401) {
                        // force reload page to bring login screen again
                        localStorage.removeItem('jwtToken');
                        (window as any).location = '/admin';
                        return;
                    }

                    throw new Error(response.statusText);
                }
                
                resolve(response.json());
            });
    });
};