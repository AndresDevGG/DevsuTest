import { Config, HttpResponseType } from '../http/http.config';

import { HttpService } from '../http/http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDTO } from 'src/app/models/product/data';
import { ProductPayload } from 'src/app/models/product/payload';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private base: string = 'products';

  constructor(
    private http: HttpService
  ) { }

  //#region GET

  public getProducts(): HttpResponseType<Array<ProductDTO>> {
    return this.http.sendRequest<Config<Array<ProductDTO>>>('get', this.base);
  }

  public getById(id: string): HttpResponseType<ProductDTO> {
    return this.http.sendRequest<Config<ProductDTO>>('get', `${this.base}?id=${id}`);
  }

  public verification(id: string): HttpResponseType<boolean> {
    return this.http.sendRequest<Config<boolean>>('get', `${this.base}/verification?id=${id}`);
  }
  //#endregion

  //#region POST
  save(data: ProductPayload): HttpResponseType<ProductDTO> {
    return this.http.sendRequest<Config<ProductDTO>>('post', this.base, data)
  }
  //#endregion

  //#region PUT
  updtae(data: ProductPayload): HttpResponseType<ProductDTO> {
    return this.http.sendRequest<Config<ProductDTO>>('put', this.base, data)
  }
  //#endregion

  //#region DELETE
  public delete(id: string): HttpResponseType<void> {
    return this.http.sendRequest<Config<void>>('delete', `${this.base}?id=${id}`);
  }
  //#endregion

}


