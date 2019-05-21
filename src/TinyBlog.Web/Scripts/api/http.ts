export const http = <T>(request: RequestInfo): Promise<T> => {
    const token = localStorage.getItem('jwtToken');
    const merged = new Request(request, {
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorize': token ? `Bearer ${token}` : ''
        }
    });

    return new Promise((resolve) => {
        fetch(merged)
            .then(response => {
                var data = response.json();
                return data;
            })
            .then(body => {
                resolve(body);
            });
    });
};