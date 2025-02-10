import {NextFunction, Request, Response} from "express";
import DriverRepository from "../repositories/prismaDriverRepository.js";
import CreateDriverUseCase from "@projet-clean/application/useCases/driver/createDriver.js";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const driverRepository = new DriverRepository(prisma);

const createDriverUseCase = new CreateDriverUseCase(driverRepository);

export const createDriver = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, licenseNumber, experienceYears } = req.body;
        const result = await createDriverUseCase.execute({ userId, licenseNumber, experienceYears });
        res.status(201).json(result);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ status: "error", message: err.message });
    }
};

export const getDrivers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const drivers = await prisma.driver.findMany({
            include: {
                user: true,
                motoTests: true,
                incidentHistory: true,
            },
        });
        res.status(200).json(drivers);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ status: "error", message: err.message });
    }
};
