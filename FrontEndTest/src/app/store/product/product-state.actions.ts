import { createAction, props } from '@ngrx/store';

import { ProductDTO } from 'src/app/models/product/data';
import { ProductPayload } from 'src/app/models/product/payload';

const GET_PRODUCTS = createAction('[PRODUCT] Get Products');
const GET_PRODUCTS_SUCCESS = createAction('[PRODUCT] Get Products Success', props<{data: Array<ProductDTO>}>());
const GET_PRODUCTS_ERROR = createAction('[PRODUCT] Get Products Error', props<{error: string}>());

const GET_PRODUCT_BY_ID = createAction('[PRODUCT] Get By Id Product', props<{id: string}>());
const GET_PRODUCT_BY_ID_SUCCESS = createAction('[PRODUCT] Get By Id Product Success', props<{data: ProductDTO}>());
const GET_PRODUCT_BY_ID_ERROR = createAction('[PRODUCT] Get By Id Product Error', props<{error: string}>());

const VERIFICATION_PRODUCT_ID = createAction('[PRODUCT] Verification Id Product', props<{payload: ProductPayload, redirect: boolean}>());
const VERIFICATION_PRODUCT_ID_SUCCESS = createAction('[PRODUCT] Verification Id Product Success');
const VERIFICATION_PRODUCT_ID_ERROR = createAction('[PRODUCT] Verification Id Product Error', props<{error: string}>());

const SAVE_PRODUCT = createAction('[PRODUCT] Save Product', props<{payload: ProductPayload, redirect: boolean}>());
const SAVE_PRODUCT_SUCCESS = createAction('[PRODUCT] Save Product Success');
const SAVE_PRODUCT_ERROR = createAction('[PRODUCT] Save Product Error', props<{error: string}>());

const UPDATE_PRODUCT = createAction('[PRODUCT] Update Product', props<{payload: ProductPayload, redirect: boolean}>());
const UPDATE_PRODUCT_SUCCESS = createAction('[PRODUCT] Update Product Success');
const UPDATE_PRODUCT_ERROR = createAction('[PRODUCT] Update Product Error', props<{error: string}>());

const DELETE_PRODUCT = createAction('[PRODUCT] Delete Product', props<{id: string}>());
const DELETE_PRODUCT_SUCCESS = createAction('[PRODUCT] Delete Product Success');
const DELETE_PRODUCT_ERROR = createAction('[PRODUCT] Delete Product Error', props<{error: string}>());



export {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_ERROR,
  VERIFICATION_PRODUCT_ID,
  VERIFICATION_PRODUCT_ID_SUCCESS,
  VERIFICATION_PRODUCT_ID_ERROR,
  SAVE_PRODUCT,
  SAVE_PRODUCT_SUCCESS,
  SAVE_PRODUCT_ERROR,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR
}
