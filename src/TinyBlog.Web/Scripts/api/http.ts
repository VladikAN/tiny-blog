export const http = <T>(request: RequestInfo): Promise<T> => {
    return new Promise((resolve) => {
      fetch(request)
        .then(response => response.json())
        .then(body => {
          resolve(body);
        });
    });
  };