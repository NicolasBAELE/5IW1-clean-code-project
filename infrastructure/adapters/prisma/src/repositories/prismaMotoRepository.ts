import { PrismaClient } from "@prisma/client";
import MotoRepository from "@projet-clean/domain/repositories/MotoRepository.js";
import { MotoType } from "@projet-clean/domain/entities/MotoType.js";

export default class PrismaMotoRepository implements MotoRepository {
    constructor(private prisma: PrismaClient) {}

    async findByRegistrationNumber(registrationNumber: string): Promise<MotoType | null> {
        return await this.prisma.moto.findUnique({
            where: { registrationNumber: registrationNumber },
            include: { owner: true, maintenances: true },
        });
    }

    async createMoto(data: {
        model: string;
        registrationNumber: string;
        mileage: number;
        ownerId: string;
    }): Promise<MotoType> {
        console.log(data);
        return await this.prisma.moto.create({
            data: {
                model: data.model,
                registrationNumber: data.registrationNumber,
                mileage: data.mileage,
                ownerId: data.ownerId,
            },
            include: { owner: true, maintenances: true },
        });
    }

    async getAllMotos(motoId: string): Promise<MotoType[]> {
        return await this.prisma.moto.findMany({
            where: {id: motoId},
            include: { owner: true, maintenances: true },
        });
    }
}
