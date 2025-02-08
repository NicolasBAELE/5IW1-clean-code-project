import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
export const withPrisma = async (prisma: PrismaClient, handler, req: Request, res: Response, next: NextFunction) => {
    try {
        await handler(req, res, next, prisma);
    } catch (error) {
        console.error("Erreur dans le handler :", error);
        res.status(500).json({ error: "Erreur interne du serveur." });
    } finally {
        await prisma.$disconnect();
    }
};
