import * as ProductActions from './product-state.actions'

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { finished, inProcess, inQueue } from 'src/app/common/utils/petition-process.util';

import { AlertService } from 'src/app/services/common/alert/alert.service';
import { Injectable } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { ResolveService } from 'src/app/services/common/resolve/resolve.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private _productService: ProductService,
    private _resolve: ResolveService,
    private _alertService: AlertService
  ) {}

  getProductsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.GET_PRODUCTS),
      tap((action) => inQueue(action.type)),
      mergeMap((action) => {
        inProcess(action.type);
        return this._productService.getProducts()
        .pipe(
          map(response => {
            this._resolve.resolve(response);
            if (response.ok) {
              return ProductActions.GET_PRODUCTS_SUCCESS({data: response.body})
            } else {
              return ProductActions.GET_PRODUCTS_ERROR({error: 'Error al consultar data'})
            }
          }),
          catchError(error => of(ProductActions.GET_PRODUCTS_ERROR({error: error.error}))),
          tap((action) => finished(action.type))
        );
      })
    );
  });

  getProductByIdEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.GET_PRODUCT_BY_ID),
      tap((action) => inQueue(action.type)),
      mergeMap((action) => {
        inProcess(action.type);
        return this._productService.getById(action.id)
        .pipe(
          map(response => {
            this._resolve.resolve(response);
            if (response.ok) {
              return ProductActions.GET_PRODUCT_BY_ID_SUCCESS({data: response.body})
            } else {
              return ProductActions.GET_PRODUCT_BY_ID_ERROR({error: 'Error al consultar data'})
            }
          }),
          catchError(error => of(ProductActions.GET_PRODUCT_BY_ID_ERROR({error: error.error}))),
          tap(() => finished(action.type))
        );
      })
    );
  });

  verificationIdEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.VERIFICATION_PRODUCT_ID),
      tap((action) => inQueue(action.type)),
      mergeMap(action =>{
        inProcess(action.type);
        return this._productService.verification(action.payload.id)
        .pipe(
          switchMap(response => {
            this._resolve.resolve(response);
            if (!response.body) {
              return [
                ProductActions.VERIFICATION_PRODUCT_ID_SUCCESS(),
                ProductActions.SAVE_PRODUCT({payload: action.payload, redirect: action.redirect })
              ]
            } else {
              this._alertService.error("Ups! Ya existe un producto con este ID!");
              return [ProductActions.VERIFICATION_PRODUCT_ID_ERROR({error: 'Error al consultar data'})]
            }
          }),
          catchError(error =>of(ProductActions.VERIFICATION_PRODUCT_ID_ERROR({error: error.error}))),
          tap(() => finished(action.type))

        )
      })
    )
  );

  saveProductEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.SAVE_PRODUCT),
      tap((action) => inQueue(action.type)),
      mergeMap((action) => {
        inProcess(action.type);
        return this._productService.save(action.payload)
        .pipe(
          map(response => {
            this._resolve.resolve(response, action.redirect ? '/product' : null, true, 'Producto guardado exitosamente!');
            if (response.ok) {
              return ProductActions.SAVE_PRODUCT_SUCCESS()
            } else {
              return ProductActions.SAVE_PRODUCT_ERROR({error: 'Error al consultar data'})
            }

          }),
          catchError(error => of(ProductActions.SAVE_PRODUCT_ERROR({error: error.error}))),
          tap(() => finished(action.type))
        );
      })
    );
  });

  updateProductEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.UPDATE_PRODUCT),
      tap((action) => inQueue(action.type)),
      mergeMap((action) => {
        inProcess(action.type);
        return this._productService.updtae(action.payload)
        .pipe(
          map(response => {
            this._resolve.resolve(response, action.redirect ? '/product' : null, true, 'Producto actualizado exitosamente!');
            if (response.ok) {
              return ProductActions.UPDATE_PRODUCT_SUCCESS()
            } else {
              return ProductActions.UPDATE_PRODUCT_ERROR({error: 'Error al consultar data'})
            }

          }),
          catchError(error => of(ProductActions.UPDATE_PRODUCT_ERROR({error: error.error}))),
          tap(() => finished(action.type))
        );
      })
    );
  });

  deleteProductEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.DELETE_PRODUCT),
      tap((action) => inQueue(action.type)),
      mergeMap((action) => {
        inProcess(action.type);
        return this._productService.delete(action.id)
        .pipe(
          switchMap(response => {
            this._resolve.resolve(response, null, true, 'Producto Eliminado exitosamente');
            return [
              ProductActions.DELETE_PRODUCT_SUCCESS(),
              ProductActions.GET_PRODUCTS(),
            ]
          }),
          catchError((error) => {
            return of(ProductActions.DELETE_PRODUCT_ERROR({error: error.error}))
          }),
          tap(() => finished(action.type))
        );
      })
    );
  });

  errorActionsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ProductActions.SAVE_PRODUCT_ERROR,
        ProductActions.UPDATE_PRODUCT_ERROR,
        ProductActions.GET_PRODUCTS_ERROR,
        ProductActions.DELETE_PRODUCT_ERROR
      ),
      tap((action) => {
        this._alertService.error(action.error);
      }),
    ),
    { dispatch: false }
  );

}
