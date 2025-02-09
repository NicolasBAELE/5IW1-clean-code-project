import { Request, Response, NextFunction } from "express";
import DriverRepository from "../repositories/prismaDriverRepository.js";
import CreateDriverUseCase from "@projet-clean/application/usecases/driver/CreateDriver.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const driverRepository = new DriverRepository(prisma);

const createDriverUseCase = new CreateDriverUseCase(driverRepository);

export const createDriver = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, licenseNumber, experienceYears } = req.body;
        const result = await createDriverUseCase.execute({ userId, licenseNumber, experienceYears });
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
