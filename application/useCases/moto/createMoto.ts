// src/application/useCases/CreateMotoUseCase.ts

import MotoRepository from "@projet-clean/domain/repositories/MotoRepository.js";
import { MotoType } from "@projet-clean/domain/entities/MotoType.js";

export default class CreateMotoUseCase {
    constructor(private motoRepository: MotoRepository) {}

    async execute(data: {
        model: string;
        registrationNumber: string;
        mileage: number;
        ownerId: string;
    }): Promise<{ moto: MotoType; message: string }> {
        const { model, registrationNumber, mileage, ownerId } = data;

        if (!model || !registrationNumber || !mileage || !ownerId) {
            throw new Error("Model, registration number, mileage, and owner ID are required.");
        }

        const existingMoto = await this.motoRepository.findByRegistrationNumber(registrationNumber);

        if (existingMoto) {
            throw new Error("A moto with this registration number already exists.");
        }

        const moto = await this.motoRepository.createMoto({
            model,
            registrationNumber,
            mileage,
            ownerId,
        });

        return {
            moto,
            message: "Moto created successfully",
        };
    }
}
