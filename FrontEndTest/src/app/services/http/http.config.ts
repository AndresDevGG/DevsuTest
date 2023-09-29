import { Observable } from "rxjs";

export type Methods = 'get' | 'post' | 'put' | 'patch' | 'delete';

export type HttpResponseType<T> = Observable<Config<T>>;

export interface Config<T> {
  body: T;
  ok: boolean;
  status: number;
  url: string;
}
