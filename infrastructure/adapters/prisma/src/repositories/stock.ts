import {Request, Response, NextFunction} from "express";
import {PrismaClient} from '@prisma/client';

interface CreateStockRequestBody {
    name: string
    cost: number
    quantity: number
}

export const createStock = async (req: Request, res: Response, next: NextFunction, prisma: PrismaClient) => {
    const {name, cost, quantity} = req.body as CreateStockRequestBody;

    try {
        const stock = await prisma.stock.create({
            data: {
                name: name,
                cost: cost,
                quantity: quantity,
            }
        });
        res.json(stock);
    } catch (error) {
        console.error("❌ Erreur lors de la création du stock :", error);
        res.status(500).json({message: "Erreur serveur", error: error});
    }
}

export const getAllStocks = async (req: Request, res: Response, next: NextFunction, prisma: PrismaClient) => {
    try {
        const stock = await prisma.stock.findMany();
        res.json(stock);
    } catch (error) {
        console.error("❌ Erreur lors de la création du stock :", error);
        res.status(500).json({message: "Erreur serveur", error: error});
    }
}
