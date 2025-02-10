import { PrismaClient } from "@prisma/client";
import IncidentHistoryRepository from "@projet-clean/domain/repositories/IncidentHistoryRepository.js";
import { IncidentHistoryType } from "@projet-clean/domain/entities/IncidentHistoryType.js";

export default class PrismaIncidentHistoryRepository implements IncidentHistoryRepository {
    constructor(private prisma: PrismaClient) {}

    async createIncident(data: {
        driverId: string;
        motoId: string;
        description: string;
        date: Date;
    }): Promise<IncidentHistoryType> {
        return this.prisma.incidentHistory.create({ data });
    }

    async getAllIncidents(): Promise<IncidentHistoryType[]> {
        return this.prisma.incidentHistory.findMany();
    }

    async getIncidentsByDriver(driverId: string): Promise<IncidentHistoryType[]> {
        return this.prisma.incidentHistory.findMany({ where: { driverId } });
    }
}
