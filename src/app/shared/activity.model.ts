import { ActivityPosition } from "./ActivityPosition.model";
import { ActivityTransport } from "./ActivityTransport.model";
import { ActivityType } from "./ActivityType.model";
import { Transport } from "./Transport.model";
import { User } from "./user.model";

export interface Activity {
  id?: number;
  transport?: number | Transport,
  activityType?: ActivityType,
  activityTypeId?: number,
  activityTypeName?: string,
  user?: number | User,
  dateTimeStart?: Date,
  dateTimeEnd?: Date,
  latStart?: number,
  lonStart?: number,
  latEnd?: number,
  lonEnd?: number,
  steps?: number,
  calories?: number,
  totalC02?: number,
  totalDistance?: number,
  status?: string,
  createdAt?: Date,
  activityTransports?: ActivityTransport[],
  activityPositions?: ActivityPosition[]
}