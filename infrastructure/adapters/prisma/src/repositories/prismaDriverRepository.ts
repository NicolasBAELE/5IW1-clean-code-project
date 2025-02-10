import { PrismaClient } from "@prisma/client";
import DriverRepository from "@projet-clean/domain/repositories/DriverRepository.js";
import { DriverType } from "@projet-clean/domain/entities/DriverType.js";

export default class PrismaDriverRepository implements DriverRepository {
    constructor(private prisma: PrismaClient) {}

    async createDriver(data: { userId: string; licenseNumber: string; experienceYears: number }): Promise<DriverType> {
        return this.prisma.driver.create({ data });
    }

    async getDriverById(driverId: string): Promise<DriverType | null> {
        return this.prisma.driver.findUnique({ where: { id: driverId } });
    }

    async getAllDrivers(): Promise<DriverType[]> {
        return this.prisma.driver.findMany();
    }
}
