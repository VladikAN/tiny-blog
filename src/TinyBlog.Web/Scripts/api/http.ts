export const http = <T>(request: RequestInfo): Promise<T> => {
    return new Promise((resolve) => {
        fetch(request)
            .then(response => {
                var data = response.json();
                return data;
            })
            .then(body => {
                resolve(body);
            });
    });
};