import { Category } from "./category.model";
import { Product } from "./Product.model";

export interface Subcategory {
  id?: number;
  name?: string;
  description?: string;
  image?: string;
  slug?: string;
  products?: Product[];
  categories?: Category[];
}