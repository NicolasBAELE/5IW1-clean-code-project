import { Request, Response, NextFunction } from "express";
import CreateMotoUseCase from "@projet-clean/application/useCases/moto/createMoto.js";
import GetAllMotosUseCase from "@projet-clean/application/useCases/moto/getMotos.js";
import PrismaMotoRepository from "../repositories/prismaMotoRepository.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const prismaMotoRepo = new PrismaMotoRepository(prisma);

const createMotoUseCase = new CreateMotoUseCase(prismaMotoRepo);
const getAllMotosUseCase = new GetAllMotosUseCase(prismaMotoRepo);

export const createMoto = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { model, registrationNumber, mileage, ownerId } = req.body;
        const { moto, message } = await createMotoUseCase.execute({
            model,
            registrationNumber,
            mileage,
            ownerId,
        });
        res.status(201).json({ moto, message });
    } catch (error) {
        console.error("❌ Error in createMoto:", error);
        res.status(500).json({ message: "Error creating moto", error });
    }
};

export const getAllMotos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const motos = await getAllMotosUseCase.execute();
        res.status(200).json(motos);
    } catch (error) {
        console.error("❌ Error in getAllMotos:", error);
        res.status(500).json({ message: "Error fetching motos", error });
    }
};
