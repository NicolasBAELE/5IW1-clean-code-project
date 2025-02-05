import { Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client';

interface CreateMaintenanceRequestBody {
    motoId: string;
    year: Date;
    type: string;
    mileage: number;
}

interface ValidateMaintenanceRequestBody {
    maintenanceId: string;
    mileage: number;
}

export const createMaintenance = async (req: Request, res: Response, next: NextFunction, prisma: PrismaClient) => {
    const { motoId, year, type, mileage } = req.body as CreateMaintenanceRequestBody;

    try {
        const moto = await prisma.maintenance.create({
            data: {
                motoId: motoId,
                scheduledDate: year,
                type: type,
                completedDate: mileage > 0 ? year : null,
                mileageAtService: mileage > 0 ? mileage : null,
            }
        });

        res.json(moto);
    } catch (error) {
        console.error("❌ Erreur lors de la création de la maintenance :", error);
        res.status(500).json({ message: "Erreur serveur", error: error });
    }
}

export const validateMaintenance = async (req: Request, res: Response, next: NextFunction, prisma: PrismaClient) => {
    try {
        const { maintenanceId, mileage } = req.body as ValidateMaintenanceRequestBody;

        // Vérifier si la maintenance existe
        const existingMaintenance = await prisma.maintenance.findUnique({
            where: { id: maintenanceId },
        });

        if (!existingMaintenance) {
            return res.status(404).json({ message: "Maintenance non trouvée" });
        }

        // Mettre à jour la completedDate avec la date actuelle
        const updatedMaintenance = await prisma.maintenance.update({
            where: { id: maintenanceId },
            data: { completedDate: new Date(), mileageAtService: mileage },
        });

        await prisma.moto.update({
            where: { id: updatedMaintenance.motoId },
            data: { mileage: mileage }
        })

        res.json(updatedMaintenance);
    } catch (error) {
        console.error("❌ Erreur lors de la validation de la maintenance :", error);
        res.status(500).json({ message: "Erreur serveur", error: error });
    }
};