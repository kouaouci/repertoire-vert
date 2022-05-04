import { Activity } from "./activity.model";

export interface ActivityPosition {
  id?: number;
  activity?: number | Activity;
  latitude?: number;
  longitude?: number;
  createdAt?: Date;
}