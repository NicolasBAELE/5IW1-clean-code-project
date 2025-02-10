import { PrismaClient } from "@prisma/client";
import DriverRepository from "@projet-clean/domain/repositories/DriverRepository.js";
import { DriverType } from "@projet-clean/domain/entities/DriverType.js";

export default class PrismaDriverRepository implements DriverRepository {
    constructor(private prisma: PrismaClient) {}

    async createDriver(data: { userId: string; licenseNumber: string; experienceYears: number }): Promise<DriverType> {
        return this.prisma.driver.create({
            data: {
                licenseNumber: data.licenseNumber,
                experienceYears: data.experienceYears,
                user: {
                    connect: { id: data.userId },
                },
            },
            include: {
                user: true,
            },
        });
    }

    async getLicenseNumber(licenseNumber: string): Promise<DriverType | null> {
        return this.prisma.driver.findUnique({ where: { licenseNumber: licenseNumber } });
    }

    async getDriverById(userId: string): Promise<DriverType | null> {
        return this.prisma.driver.findUnique({ where: { userId: userId } });
    }

    async getAllDrivers(): Promise<DriverType[]> {
        return this.prisma.driver.findMany();
    }
}
