enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method: METHOD;
  data?: any;
  headers?: Record<string, string>;
  timeout?: number;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

function queryStringify(data: string): string {
  return `?${Object.entries(data).map(pair => pair.join('=')).join('&')}`
}

class HTTPTransport {
  get = (url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> => {
    const newUrl = url + '' + queryStringify(options.data)
    return this.request(newUrl, { ...options, method: METHOD.GET }, options.timeout);
  };

  put = (url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHOD.PUT }, options.timeout);
  };

  POST = (url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHOD.POST }, options.timeout);
  };

  DELETE = (url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHOD.DELETE }, options.timeout);
  };

  request = (url: string, options: Options, timeout = 5000): Promise<XMLHttpRequest> => {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.timeout = timeout;
      if (headers) {
        Object.entries(headers).forEach(([header, value]) => xhr.setRequestHeader(header, value))
      }

      xhr.onload = function () {
        resolve(xhr)
      }

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data)
      }
    })
  };
}
