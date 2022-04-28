import { User } from "./user.model";

export interface Participation {
  id?: number;
  covoiturageId?: number;
  participantId?: number;
  participant?: User;
  participantFirstname?: string;
  participantLastname?: string;
  confirmed?: boolean;
}