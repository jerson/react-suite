//import clone from 'safe-clone-deep';
import Auth from '../session/Auth';
import Log from '../logger/Log';

export interface UserSettings {
  baseUrl: string;
}

export interface Settings {
  baseUrl: string;
}

export interface Options {
  secure?: boolean;
}

export interface Body {
  [key: string]: string | number;
}

export interface Headers {
  [key: string]: string;
}

export interface Ids {
  [key: string]: string;
}

export interface Response {
  status: number;
  body: any;
  headers: {
    [key: string]: string;
  };
}

export type Id = string;
export type Method = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE';

export default class Request {
  public static settings: Settings = { baseUrl: '' };
  private static requests: Ids = {};

  static init(settings: UserSettings) {
    if (settings) {
      this.settings = Object.assign({}, this.settings, settings);
    }
  }

  static abort(id: string) {
    if (Request.requests[id]) {
      // Request.requests[id].abort();
    }
  }

  static async get(
    path: string,
    body?: Body,
    id?: Id,
    options?: Options
  ): Promise<Response> {
    let form: string[] = [];
    let query = '';
    let requestBody: Body = {};
    if (body) {
      let params = { ...body };
      this.addItemsToForm(form, [], params);
      requestBody = {};
    } else {
      requestBody = {};
    }

    if (form.length > 0) {
      query = `?${form.join('&')}`;
    }

    return this.defaultRequest('GET', path + query, requestBody, id, options);
  }

  static async head(
    path: string,
    body: Body,
    id?: Id,
    options?: Options
  ): Promise<Response> {
    let form: string[] = [];
    let query = '';
    let requestBody: Body = {};
    if (body) {
      let params = { ...body };
      this.addItemsToForm(form, [], params);
      requestBody = {};
    } else {
      requestBody = {};
    }

    if (form.length > 0) {
      query = `?${form.join('&')}`;
    }

    return this.defaultRequest('HEAD', path + query, requestBody, id, options);
  }

  static async post(
    path: string,
    body: Body,
    id?: Id,
    options?: Options
  ): Promise<Response> {
    return this.defaultRequest('POST', path, body, id, options);
  }

  static async put(
    path: string,
    body: Body,
    id?: Id,
    options?: Options
  ): Promise<Response> {
    return this.defaultRequest('PUT', path, body, id, options);
  }

  static async remove(
    path: string,
    body: Body,
    id?: Id,
    options?: Options
  ): Promise<Response> {
    return this.defaultRequest('DELETE', path, body, id, options);
  }

  protected static async defaultRequest(
    method: Method,
    path: string,
    body: Body,
    id?: Id,
    options?: Options
  ): Promise<Response> {
    let form: string[] = [];
    let isMultipart = body instanceof FormData;
    if (!isMultipart) {
      let params = { ...body };
      this.addItemsToForm(form, [], params);
    }

    let requestHeaders: Headers = {};
    if (options) {
      requestHeaders = this.getHeaders(options);
    }
    if (!isMultipart) {
      requestHeaders['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    let fullPath = this.getFullPath(path);
    let response: Response = {
      status: 500,
      body: { error: true, code: 0, message: 'Desconocido' },
      headers: {}
    };

    try {
      Log.debug('[FETCH]', method, fullPath);
      let requestBody: any = undefined;
      let allowBody = !(method === 'GET' || method === 'HEAD');
      if (allowBody) {
        if (isMultipart) {
          requestBody = body;
        } else {
          requestBody = form.join('&');
        }
      }

      let fetchResponse = await fetch(fullPath, {
        method,
        headers: {
          ...requestHeaders
        },
        body: requestBody
      });
      let headers: Headers = {};

      //FIXME desactivado hasta corregir
      /*fetchResponse.headers.forEach((keyId, status2) => {
                      let value = fetchResponse.headers.get(keyId);
                      headers[keyId] = value ? value : '';
                  });*/

      response = {
        status: fetchResponse.status,
        headers: headers || {},
        body: await fetchResponse.json()
      };
    } catch (e) {
      Log.warn(e);
    }

    if (response.status === 200) {
      return response;
    } else {
      throw response;
    }
  }

  private static getHeaders(options: Options): Headers {
    let headers: Headers = {};
    if (options.secure) {
      let accessToken = Auth.getAccessToken();
      if (accessToken) {
        headers[Auth.settings.headerName] = accessToken;
      }
    }

    return headers;
  }

  private static getFullPath(path: string): string {
    return path.indexOf('http') === 0
      ? path
      : this.settings.baseUrl + '/' + path;
  }

  private static addItemsToForm(form: string[], names: string[], obj: any) {
    if (obj === undefined || obj === '' || obj === null) {
      return this.addItemToForm(form, names, '');
    }

    if (
      typeof obj === 'string' ||
      typeof obj === 'number' ||
      obj === true ||
      obj === false
    ) {
      return this.addItemToForm(form, names, obj);
    }

    if (obj instanceof Date) {
      return this.addItemToForm(form, names, obj.toJSON());
    }

    // array or otherwise array-like
    if (obj instanceof Array) {
      return obj.forEach((v, i) => {
        names.push(`[${i}]`);
        this.addItemsToForm(form, names, v);
        names.pop();
      });
    }

    if (typeof obj === 'object') {
      return Object.keys(obj).forEach(k => {
        names.push(k);
        this.addItemsToForm(form, names, obj[k]);
        names.pop();
      });
    }
  }

  private static addItemToForm(form: string[], names: string[], value: string) {
    let name = encodeURIComponent(names.join('.').replace(/\.\[/g, '['));
    value = encodeURIComponent(value.toString());
    form.push(`${name}=${value}`);
  }
}
