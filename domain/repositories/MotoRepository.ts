import { MotoType } from "../entities/MotoType.js";

export default interface MotoRepository {
    findByRegistrationNumber(registrationNumber: string): Promise<MotoType | null>;
    createMoto(data: {
        model: string;
        registrationNumber: string;
        mileage: number;
        ownerId: string;
    }): Promise<MotoType>;
    getAllMotos(id?: string): Promise<MotoType[]>;
}
