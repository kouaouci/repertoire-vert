import { Activity } from "./activity.model";
import { Transport } from "./Transport.model";

export interface ActivityTransport {
  id?: number;
  activity?: number | Activity;
  transport?: number | Transport;
  distance?: number;
  c02Emissions?: number;
}