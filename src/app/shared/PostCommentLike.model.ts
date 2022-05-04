import { User } from "./user.model";

export interface PostCommentLike {
  id?: number;
  creator?: User | number;
  comment?: number;
  createdAt?: Date;
  type?: string;
}