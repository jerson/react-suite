import qs from 'qs';

export interface QueryParams {
  [key: string]: string;
}

export default class Query {
  static decode(text: string): QueryParams {
    return qs.parse(text.slice(1));
  }

  static encode(text: any): string {
    return qs.stringify(text);
  }
}
