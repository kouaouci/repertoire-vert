import { PostComment } from "./PostComment.model";

export interface Post {
  id?: number;
  body?: string;
  category?: any;
  creator?: any;
  creatorId?: number;
  title?: string;
  subtitle?: string;
  createdAt?: string;
  views?: number;
  approved?: boolean;
  photo?: string;
  username?: string;
  image?: string;
  comments?: PostComment[];
  nbComments?: number;
}