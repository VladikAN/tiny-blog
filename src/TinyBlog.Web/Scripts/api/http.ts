export const http = <T>(request: RequestInfo): Promise<T> => {
    const merged = new Request(request, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    });

    return new Promise((resolve, reject) => {
        fetch(merged)
            .then(response => {
                if (!response.ok) {
                    reject(response);
                } else {
                    if (response.headers.has('content-length')
                        && response.headers.get('content-length') == '0') {
                        resolve(undefined);
                    } else {
                        resolve(response.json());
                    }
                }
            })
            .catch(err => reject(err));
    });
};