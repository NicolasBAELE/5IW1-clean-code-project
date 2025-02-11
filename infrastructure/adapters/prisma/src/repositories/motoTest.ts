import {NextFunction, Request, Response} from "express";
import {PrismaClient} from "@prisma/client";


interface CreateMotoTestRequestBody {
    moto: string
    startDate: string
    endDate: string
    driverId: string
}

export const createMotoTest = async (req: Request, res: Response, next: NextFunction, prisma: PrismaClient) => {
    const {moto, startDate, endDate, driverId} = req.body as CreateMotoTestRequestBody;
    console.log("================")
    console.log(moto, startDate, endDate, driverId)

    try {
        const stock = await prisma.motoTest.create({
            data: {
                moto: moto,
                startDate: startDate,
                endDate: endDate,
                driverId: driverId
            }
        });
        res.json(stock);
    } catch (error) {
        console.error("❌ Erreur lors de la création de l'essai :", error);
        res.status(500).json({message: "Erreur serveur", error: error});
    }
}