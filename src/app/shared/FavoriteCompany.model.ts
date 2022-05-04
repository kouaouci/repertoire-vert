import { Company } from "./Company.model";
import { User } from "./user.model";

export interface FavoriteCompany {
  id?: number;
  user?: number | User;
  company?: number | Company;
}