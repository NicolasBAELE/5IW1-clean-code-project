import { MotoTestType } from "../entities/MotoTestType.js";

export default interface MotoTestRepository {
    createMotoTest(data: { driverId: string; motoId: string; startDate: Date; endDate: Date }): Promise<MotoTestType>;
    getMotoTestById(testId: string): Promise<MotoTestType | null>;
    getAllMotoTests(): Promise<MotoTestType[]>;
}
