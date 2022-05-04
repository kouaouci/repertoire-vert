import { CovInvitation } from "./CovInvitation.model";
import { Participation } from "./participation.model";

export interface Covoiturage {
  id?: number;
  createur?: any;
  departure?: string;
  departureLatitude?: number;
  departureLongitude?: number;
  destination?: string;
  destinationLatitude?: number;
  destinationLongitude?: number;
  departuredate?: Date | string;
  arrivalDate?: Date |string;
  groupmaxsize?: number;
  roundTrip?: boolean;
  returnDate?: Date | string;
  trunk?: string;
  roof?: boolean;
  trailer?: boolean;
  createdAt?: Date;
  selectedDeparture?: any;
  selectedDestination?: any;
  participations?: Participation[];
  invitations?: CovInvitation[];
}