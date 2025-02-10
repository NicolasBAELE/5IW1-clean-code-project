import { IncidentHistoryType } from "./IncidentHistoryType.js";
import { MotoTestType } from "./MotoTestType.js";
import { UserType } from "./UserType.js";

export type DriverType = {
    id: string;
    userId: string;
    user: UserType;
    licenseNumber: string;
    experienceYears: number;
    createdAt: Date;
    updatedAt: Date;
    motoTests: MotoTestType[];
    incidentHistory: IncidentHistoryType[];
};
