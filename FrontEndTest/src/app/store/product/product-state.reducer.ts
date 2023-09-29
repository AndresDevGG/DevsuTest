import * as Actions from "./product-state.actions";

import { State, createReducer, on, props } from "@ngrx/store";

import { ProductDTO } from "src/app/models/product/data";
import { ProductState } from './product-state.model';
import { state } from "@angular/animations";

const initialState: ProductState = {
  products: [],
  product: null
};

export const ProductReducer = createReducer(
  initialState,
  on(Actions.GET_PRODUCTS_SUCCESS, (state, action) => ({ ...state, products: action.data})),
  on(Actions.GET_PRODUCT_BY_ID_SUCCESS, (state, action) => ({ ...state, product: action.data})),
);
