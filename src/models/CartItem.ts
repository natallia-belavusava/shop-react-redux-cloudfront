import { AvailableProduct } from "~/models/Product";

export type CartItem = {
  product: AvailableProduct;
  count: number;
};
