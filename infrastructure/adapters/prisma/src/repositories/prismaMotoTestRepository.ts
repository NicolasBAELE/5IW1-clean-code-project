import { PrismaClient } from "@prisma/client";
import MotoTestRepository from "@projet-clean/domain/repositories/MotoTestRepository.js";
import { MotoTestType } from "@projet-clean/domain/entities/MotoTestType.js";

export default class PrismaMotoTestRepository implements MotoTestRepository {
    constructor(private prisma: PrismaClient) {}

    async createMotoTest(data: {
        driverId: string;
        motoId: string;
        startDate: Date;
        endDate: Date;
    }): Promise<MotoTestType> {
        return this.prisma.motoTest.create({ data });
    }

    async getMotoTestById(testId: string): Promise<MotoTestType | null> {
        return this.prisma.motoTest.findUnique({ where: { id: testId } });
    }

    async getAllMotoTests(): Promise<MotoTestType[]> {
        return this.prisma.motoTest.findMany();
    }
}
