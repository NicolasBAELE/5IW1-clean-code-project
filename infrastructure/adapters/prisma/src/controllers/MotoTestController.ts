import { Request, Response, NextFunction } from "express";
import MotoTestRepository from "../repositories/prismaMotoTestRepository.js";
import { CreateMotoTestUseCase } from "@projet-clean/application/usecases/motoTest/createMotoTest.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const motoTestRepository = new MotoTestRepository(prisma);
const createMotoTestUseCase = new CreateMotoTestUseCase(motoTestRepository);

export const createMotoTest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { driverId, motoId, startDate, endDate } = req.body;
        const result = await createMotoTestUseCase.execute({ driverId, motoId, startDate, endDate });
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
