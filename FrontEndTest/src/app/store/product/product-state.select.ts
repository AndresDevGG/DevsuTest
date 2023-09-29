import { ProductDTO } from "src/app/models/product/data";
import { ProductState } from "./product-state.model";
import { createSelector } from "@ngrx/store";

const getProducts = (state: ProductState): Array<ProductDTO> => state.products;
const getProduct = (state: ProductState): ProductDTO => state.product;

const selectProducts = createSelector((state: { productState: ProductState }) => state.productState, getProducts);
const selectProduct = createSelector((state: { productState: ProductState }) => state.productState, getProduct);

export { selectProducts, selectProduct };
