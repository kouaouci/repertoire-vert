import { User } from "./user.model";

export interface Friendship {
  id?: number;
  user?: any;
  friend?: any;
  isAccepted?: boolean;
}