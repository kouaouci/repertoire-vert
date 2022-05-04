import { Category } from "./category.model";
import { Subcategory } from "./Subcategory.model";

export interface Product {
  id?: number;
  name?: string;
  price?: number;
  description?: string;
  company?: any;
  certification?: string;
  currency?: string;
  creationdate?: Date;
  discr?: string;
  gaearecommanded?: boolean;
  image?: string;
  latitude?: string;
  longitude?: string;
  niveau?: string;
  origin?: string
  serviceduration?: string
  slug?: string
  type?: string
  updateddate?: Date;
  wantevaluation?: boolean;
  category?: Category;
  subcategories?: Subcategory[];
  isFavorite?: boolean;
  userTotalReviews?: number;
  userAverageRating?: number;
  companyTotalReviews?: number;
  companyAverageRating?: number;
}