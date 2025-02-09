// src/infrastructure/adapters/prisma/PrismaMotoRepository.ts

import { PrismaClient } from "@prisma/client";
import MotoRepository from "@projet-clean/domain/repositories/MotoRepository.js";
import { MotoType } from "@projet-clean/domain/entities/MotoType.js";

export default class PrismaMotoRepository implements MotoRepository {
    constructor(private prisma: PrismaClient) {}

    async findByRegistrationNumber(registrationNumber: string): Promise<MotoType | null> {
        return await this.prisma.moto.findUnique({
            where: { registrationNumber },
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

    async getAllMotos(): Promise<MotoType[]> {
        return await this.prisma.moto.findMany({
            include: { owner: true, maintenances: true },
        });
    }

    async getMotoById(id: string): Promise<MotoType | null> {
        return await this.prisma.moto.findUnique({
            where: { id },
            include: { owner: true, maintenances: true },
        });
    }
}
