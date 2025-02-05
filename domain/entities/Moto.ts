import {User} from "./User.js";
import {Maintenance} from "./Maintenance.js";
import {Breakdown} from "./Breakdown.js";

export interface Moto {
    id: string;
    model: string;
    registrationNumber: string;
    mileage: number;
    ownerId: string;
    owner: User;
    maintenances: Maintenance[];
    breakdowns: Breakdown[];
    createdAt: Date;
    updatedAt: Date;
}