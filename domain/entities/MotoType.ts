import {Maintenance} from "./MaintenanceType.js";

export interface MotoType {
    id: string;
    model: string;
    registrationNumber: string;
    mileage: number;
    maintenances: Maintenance[];
    owner: {
        id: string,
        name: string,
        email: string,
    }
}