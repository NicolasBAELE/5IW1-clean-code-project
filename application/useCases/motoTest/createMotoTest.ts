import { MotoTestType } from "@projet-clean/domain/entities/MotoTestType.js";
import MotoTestRepository from "@projet-clean/domain/repositories/MotoTestRepository.js";

export class CreateMotoTestUseCase {
    constructor(private motoTestRepository: MotoTestRepository) {}

    async execute(data: {
        driverId: string;
        motoId: string;
        startDate: Date;
        endDate: Date;
    }): Promise<{ motoTest: MotoTestType; message: string }> {
        const { driverId, motoId, startDate, endDate } = data;

        if (!driverId || !motoId || !startDate || !endDate) {
            throw new Error("Tous les champs sont requis.");
        }

        const motoTest = await this.motoTestRepository.createMotoTest({ driverId, motoId, startDate, endDate });

        return {
            motoTest,
            message: "Essai moto enregistré avec succès",
        };
    }
}
