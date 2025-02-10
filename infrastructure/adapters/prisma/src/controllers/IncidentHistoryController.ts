import { Request, Response, NextFunction } from "express";
import IncidentHistoryRepository from "../repositories/prismaIncidentHistoryRepository.js";
import { CreateIncidentHistoryUseCase } from "@projet-clean/application/usecases/incident/createIncident.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const incidentHistoryRepository = new IncidentHistoryRepository(prisma);
const createIncidentHistoryUseCase = new CreateIncidentHistoryUseCase(incidentHistoryRepository);

export const createIncidentHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { driverId, motoId, description, date } = req.body;
        const result = await createIncidentHistoryUseCase.execute({ driverId, motoId, description, date });
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
