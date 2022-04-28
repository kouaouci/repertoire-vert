import { Category } from "./category.model";
import { Product } from "./Product.model";
import { Subcategory } from "./Subcategory.model";

export interface Company {
  id?: number;
  activated?: boolean;
  actived?: boolean;
  certification?: string;
  city?: string;
  connected?: boolean;
  country?: string;
  description?: string;
  discr?: string;
  emailValidated?: boolean;
  gaeaUserId?: number;
  image?: string;
  influencezone?: string;
  inscriptiondate?: any;
  latitude?: number;
  longtitude?: number;
  name?: string;
  niveau?: string;
  package?: any;
  phone?: string;
  postcode?: number;
  region?: string;
  role?: string;
  slug?: string;
  socialreason?: string;
  startingdate?: Date;
  street?: string;
  streetnumber?: any;
  token?: string;
  urlfacebook?: string;
  urllinkedin?: string;
  urltwitter?: string;
  urlwebsite?: string;
  username?: string;
  vision?: string;
  wantevaluation?: boolean;
  categories?: Category[];
  subcategories?: Subcategory[];
  products?: Product[];
  distanceFromUser?: number; // Distance in KM
  favorite?: boolean;
}