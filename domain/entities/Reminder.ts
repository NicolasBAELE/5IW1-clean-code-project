import {Maintenance} from "./Maintenance.js";

export interface Reminder {
  id: string;
  maintenanceId: string;
  maintenance: Maintenance;
  reminderDate: Date;
  sent: boolean;
  createdAt: Date;
  updatedAt: Date;
}