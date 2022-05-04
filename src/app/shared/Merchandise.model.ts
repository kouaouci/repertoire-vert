import { Product } from "./Product.model";

export interface Merchandise extends Product {
  packaging?: string;
  quantity?: number;
  weight?: number;
  weightunit?: string;
  volume?: number;
  volumeunit?: string;
  height?: number;
  width?: number;
  depth?: any;
  lengthunit?: string;
  sellType?: string;
}