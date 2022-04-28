import { PostCommentLike } from "./PostCommentLike.model";

export interface PostComment {
  id?: number;
  comment?: string;
  creator?: number;
  username?: string;
  post?: any;
  createdAt?: Date;
  postCommentLikes?: PostCommentLike[];
}