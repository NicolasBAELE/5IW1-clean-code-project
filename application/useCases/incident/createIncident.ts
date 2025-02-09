import { IncidentHistoryType } from "@projet-clean/domain/entities/IncidentHistoryType.js";
import IncidentHistoryRepository from "@projet-clean/domain/repositories/IncidentHistoryRepository.js";

export class CreateIncidentHistoryUseCase {
    constructor(private incidentHistoryRepository: IncidentHistoryRepository) {}

    async execute(data: {
        driverId: string;
        motoId: string;
        description: string;
        date: Date;
    }): Promise<{ incident: IncidentHistoryType; message: string }> {
        const { driverId, motoId, description, date } = data;

        if (!driverId || !motoId || !description || !date) {
            throw new Error("Tous les champs sont requis.");
        }

        const incident = await this.incidentHistoryRepository.createIncident({ driverId, motoId, description, date });

        return {
            incident,
            message: "Incident enregistré avec succès",
        };
    }
}
