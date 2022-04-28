import { Preference } from "./Preference.model";
import { User } from "./user.model";

export interface UserPreference {
  id?: number;
  user?: number | User;
  preference?: number |Preference;
}