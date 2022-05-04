export interface Report {
  id?: number;
  message?: string;
  createdAt?: Date;
  entity?: string;
  entityId?: number;
  status?: string;
  reportType?: number;
  creator?: number;
}