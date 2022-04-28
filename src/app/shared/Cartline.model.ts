import { Product } from "./Product.model";

export interface Cartline {
  id?: number;
  panier?: number;
  produit?: number | Product;
  produitInfo?: Product;
  quantity?: number;
}