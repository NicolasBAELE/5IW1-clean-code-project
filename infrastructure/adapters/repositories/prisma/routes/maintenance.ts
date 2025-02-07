import {NextFunction, Request, Response} from "express";
import {PrismaClient} from '@prisma/client';

interface CreateMaintenanceRequestBody {
    motoId: string;
    year: Date;
    type: string;
    mileage: number;
    products: { id: string, quantity: number }[]
}

interface ValidateMaintenanceRequestBody {
    maintenanceId: string;
    mileage: number;
}

export const createMaintenance = async (req: Request, res: Response, next: NextFunction, prisma: PrismaClient) => {
    const {motoId, year, type, mileage, products} = req.body as CreateMaintenanceRequestBody;
    try {
        let totalCost = 0;
        let notes = "Produits utilisés :\n";
        for (const product of products) {
            const stockItem = await prisma.stock.findUnique({
                where: {id: product.id},
            });
            if (stockItem) {
                const productTotalCost = stockItem.cost * product.quantity;
                totalCost += productTotalCost;
                notes += `- ${stockItem.name}: ${product.quantity} x ${stockItem.cost}€ = ${productTotalCost}€\n`;
            }
        }

        const transaction = await prisma.$transaction(async (prisma: PrismaClient) => {
            for (const product of products) {
                await prisma.stock.update({
                    where: {id: product.id},
                    data: {quantity: {decrement: product.quantity}}
                });
            }

            return await prisma.maintenance.create({
                data: {
                    motoId: motoId,
                    scheduledDate: year,
                    type: type,
                    completedDate: mileage > 0 ? year : null,
                    mileageAtService: mileage > 0 ? mileage : null,
                    cost: totalCost,
                    notes: notes,
                }
            });
        });
        res.json(transaction);
    } catch (error) {
        console.error("❌ Erreur lors de la création de la maintenance :", error);
        res.status(500).json({message: "Erreur serveur", error: error});
    }
}

export const validateMaintenance = async (req: Request, res: Response, next: NextFunction, prisma: PrismaClient) => {
    try {
        const {maintenanceId, mileage} = req.body as ValidateMaintenanceRequestBody;

        // Vérifier si la maintenance existe
        const existingMaintenance = await prisma.maintenance.findUnique({
            where: {id: maintenanceId},
        });

        if (!existingMaintenance) {
            return res.status(404).json({message: "Maintenance non trouvée"});
        }

        // Mettre à jour la completedDate avec la date actuelle
        const updatedMaintenance = await prisma.maintenance.update({
            where: {id: maintenanceId},
            data: {completedDate: new Date(), mileageAtService: mileage},
        });

        await prisma.moto.update({
            where: {id: updatedMaintenance.motoId},
            data: {mileage: mileage}
        })

        res.json(updatedMaintenance);
    } catch (error) {
        console.error("❌ Erreur lors de la validation de la maintenance :", error);
        res.status(500).json({message: "Erreur serveur", error: error});
    }
};