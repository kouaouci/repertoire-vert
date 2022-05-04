import { Cartline } from "./Cartline.model";

export interface Cart {
  id?: number;
  creator?: number;
  address?: string;
  createdAt?: Date;
  total?: number;
  status?: string;
  cartlines?: Cartline[];
}