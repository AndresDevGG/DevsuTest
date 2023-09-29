import { ProductDTO } from "src/app/models/product/data";

export interface ProductState {
  products: Array<ProductDTO>;
  product: ProductDTO;
}
