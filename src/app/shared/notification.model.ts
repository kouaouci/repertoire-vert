import { User } from "./user.model";

export interface Notification {
  id?: string;
  owner?: User;
  sender?: User;
  subject?: string;
  entityId?: number;
  opened?: boolean;
  createdAt?: Date;
}