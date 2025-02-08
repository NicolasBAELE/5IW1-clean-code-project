export interface Maintenance {
    id: string;
    mileageAtService: number;
    completedDate: string;
    scheduledDate: string;
    type: "PREVENTIVE" | "CURATIVE";
    cost: number;
    notes: string;
}


export interface NextMaintenanceDatas {
    message: string;
    nextScheduledDate?: string;
    nextScheduledMileage?: number;
}