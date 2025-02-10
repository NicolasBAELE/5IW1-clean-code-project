import { IncidentHistoryType } from "../entities/IncidentHistoryType.js";

export default interface IncidentHistoryRepository {
    createIncident(data: {
        driverId: string;
        motoId: string;
        description: string;
        date: Date;
    }): Promise<IncidentHistoryType>;
    getAllIncidents(): Promise<IncidentHistoryType[]>;
    getIncidentsByDriver(driverId: string): Promise<IncidentHistoryType[]>;
}
