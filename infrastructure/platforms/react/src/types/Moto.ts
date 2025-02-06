export interface Maintenance {
    id: string;
    mileageAtService: number;
    completedDate: string;
    scheduledDate: string;
    type: "PREVENTIVE" | "CURATIVE";
}

export interface Moto {
    id: string;
    model: string;
    registrationNumber: string;
    mileage: number;
    maintenances: Maintenance[];
}

export interface NextMaintenanceDatas {
    message: string;
    nextScheduledDate?: string;
    nextScheduledMileage?: number;
}