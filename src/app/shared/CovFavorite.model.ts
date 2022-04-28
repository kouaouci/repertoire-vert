import { User } from "./user.model";

export interface CovFavorite {
  id?: number;
  user?: User | number;
  favorite?: User | number;
}