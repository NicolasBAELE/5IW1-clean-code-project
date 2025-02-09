import DriverRepository from "@projet-clean/domain/repositories/DriverRepository.js";
import { DriverType } from "@projet-clean/domain/entities/DriverType.js";

export default class CreateDriverUseCase {
    constructor(private driverRepository: DriverRepository) {}

    async execute(data: {
        userId: string;
        licenseNumber: string;
        experienceYears: number;
    }): Promise<{ driver: DriverType; message: string }> {
        const { userId, licenseNumber, experienceYears } = data;

        if (!userId || !licenseNumber || experienceYears === undefined) {
            throw new Error("Tous les champs sont requis.");
        }

        const existingDriver = await this.driverRepository.getDriverById(userId);
        if (existingDriver) {
            throw new Error("Ce conducteur existe déjà.");
        }

        const driver = await this.driverRepository.createDriver({ userId, licenseNumber, experienceYears });

        return {
            driver,
            message: "Conducteur créé avec succès",
        };
    }
}
