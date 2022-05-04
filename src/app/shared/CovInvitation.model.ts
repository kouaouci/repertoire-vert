import { User } from "./user.model";

export interface CovInvitation {
  id?: number;
  covoiturageId?: number;
  user?: User | number;
  friend?: User | number;
}