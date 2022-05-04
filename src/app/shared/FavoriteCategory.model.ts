import { Category } from "./Category.model";
import { User } from "./user.model";

export interface FavoriteCategory {
  id?: number;
  user?: number | User;
  category?: number | Category;
}