export enum Methods {
  Get = 'GET',
  Put = 'PUT',
  Post = 'POST',
  Delete = 'DELETE'
};

type TypesOptions = {
  method?: Methods;
  data?: any;
  headers?: any;
};

export default class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor() {
      this.endpoint = `${HTTPTransport.API_URL}`;
  }
  public get<Response>(path = '/'): Promise<Response>{
      return this.request(this.endpoint + path);
  }

  public post<Response>(path: string, data?: unknown): Promise<Response> {
      return this.request(this.endpoint + path, {
      method: Methods.Post,
      data,
      });
  }

  public delete<Response>(path: string, data?: unknown): Promise<Response> {
      return this.request(this.endpoint + path, {
      method: Methods.Delete,
      data
      });
  }

  public put<Response>(path: string, data: unknown): Promise<Response> {
      return this.request(this.endpoint + path, { data, method: Methods.Put });
  }

  private request<Response> (url: string, options: TypesOptions = {method: Methods.Get}): Promise<Response> {
      const {method, data} = options;
      return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open(method as Methods, url);

          xhr.onreadystatechange = (e: any) => {

            if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status < 400) {
                resolve(xhr.response);
              } else {
                reject(xhr.response);
              }
            }
          };

          xhr.onabort = () => reject({reason: 'abort'});
          xhr.onerror = () => reject({reason: 'network error'});
          xhr.ontimeout = () => reject({reason: 'timeout'});

          xhr.withCredentials = true;
          xhr.responseType = 'json';

          if (method === Methods.Get || !data) {

            xhr.send();
          } else if (data instanceof FormData) {
            xhr.send(data);
          } else {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
          }
        });
      }
  }
