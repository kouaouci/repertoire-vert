import { User } from "./user.model";

export interface Review {
  id?: number;
  owner?: number | User;
  value?: number;
  entityId?: number;
  entityType?: string;
  comment?: string;
  createdAt?: Date;
}