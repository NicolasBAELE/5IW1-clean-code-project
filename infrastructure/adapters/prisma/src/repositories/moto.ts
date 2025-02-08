import { Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client';

interface CreateMotoRequestBody {
    model: string;
    registrationNumber: string;
    mileage: number;
    ownerId: string;
}

interface GetAllMotosRequestBody {
    motoId?: string;
}

export const createMoto = async (req: Request, res: Response, next: NextFunction, prisma: PrismaClient) => {
    const { model, registrationNumber, mileage, ownerId } = req.body as CreateMotoRequestBody;

    try {
        const existingMoto = await prisma.moto.findUnique({
            where: {
                registrationNumber: registrationNumber,
            }
        });

        if (existingMoto) {
            return res.json({
                message: "Une moto existe avec cet identifiant"
            });
        }

        const moto = await prisma.moto.create({
            data: {
                model: model,
                registrationNumber: registrationNumber,
                mileage: mileage,
                ownerId: ownerId,
            }
        });

        res.json(moto);
    } catch (error) {
        console.error("❌ Erreur lors de la création de la moto :", error);
        res.status(500).json({ message: "Erreur serveur", error: error });
    }
}

export const getAllMotos = async (req: Request, res: Response, next: NextFunction, prisma: PrismaClient) => {
    try {
        const { motoId } = req.body as GetAllMotosRequestBody;
        let motos;

        if (motoId) {
            motos = await prisma.moto.findUnique({
                where: { id: motoId },
                include: {
                    owner: true,
                    maintenances: true
                },
            });

            if (!motos) {
                return res.status(404).json({ message: "Moto non trouvée" });
            }

            return res.status(200).json([motos]);
        } else {
            motos = await prisma.moto.findMany({
                include: {
                    owner: true,
                    maintenances: true
                },
            });
        }
        res.status(200).json(motos);
    } catch (error) {
        console.error("❌ Erreur dans getAllMotos:", error);
        res.status(500).json({ message: "Erreur serveur", error: error });
    }
};