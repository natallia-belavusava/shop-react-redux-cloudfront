import { Product } from "~/models/Product";

export type CartItem = {
  product: Product;
  count: number;
};
export type CartData = {
  id?: string;
  items: CartItem[];
};
