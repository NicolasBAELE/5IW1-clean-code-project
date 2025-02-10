import { DriverType } from "../entities/DriverType.js";

export default interface DriverRepository {
    createDriver(data: { userId: string; licenseNumber: string; experienceYears: number }): Promise<DriverType>;
    getDriverById(driverId: string): Promise<DriverType | null>;
    getLicenseNumber(licenseNumber: string): Promise<DriverType | null>;
    getAllDrivers(): Promise<DriverType[]>;
}
