import { Config, Methods } from './http.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';

import { AlertService } from '../common/alert/alert.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private host = '/bp/';

  constructor(private http: HttpClient, private _alertService: AlertService) {}

  sendRequest<T>(
    type: Methods,
    url: string,
    payload: any = {}
  ): Observable<T> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'AuthorId': '300'
    });

    let observable$;

    if (type === 'get')
      observable$ = this.http.get<Config<T>>(this.host + url, { headers, observe: 'response' });

    if (type === 'post')
      observable$ = this.http.post<Config<T>>(this.host + url, payload, { headers, observe: 'response' });

    if (type === 'put')
      observable$ = this.http.put<Config<T>>(this.host + url, payload != null ? payload : {}, {headers, observe: 'response',});

    if (type === 'delete')
      observable$ = this.http.delete<Config<T>>(this.host + url, { headers, observe: 'response' });

    // @ts-ignore: Object is possibly 'null'.
    return observable$;
  }
}
