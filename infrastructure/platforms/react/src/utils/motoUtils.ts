import { MotoType } from "@projet-clean/domain/entities/MotoType";

export const motoModels: string[] = ["Triumph Street Triple", "Triumph Speed Triple", "Triumph Rocket 3"]

export const nextMaintenance = (
    moto: MotoType,
    lastMaintenance?: {
        mileageAtService: number;
        completedDate: string;
        scheduledDate: string;
        type: "PREVENTIVE" | "CURATIVE";
    }
) => {
    if (!lastMaintenance) {
        return {
            message: "Aucune maintenance précédente trouvée. Définir la première maintenance."
        };
    }

    const {mileageAtService, completedDate} = lastMaintenance;

    const currentDate = new Date();
    const lastCompletedDate = new Date(completedDate);
    const lastMileage = mileageAtService;

    const mileageInterval = 10000;
    const nextScheduledMileage = lastMileage + mileageInterval;

    const timeInterval = 1;
    lastCompletedDate.setFullYear(lastCompletedDate.getFullYear() + timeInterval);

    const nextCompletedDate = lastCompletedDate.toISOString();

    if (moto.mileage >= nextScheduledMileage || currentDate >= lastCompletedDate) {
        return {
            nextScheduledDate: nextCompletedDate,
            nextScheduledMileage,
            message: "Il est temps de planifier la prochaine maintenance."
        };
    } else {
        return {
            nextScheduledDate: nextCompletedDate,
            nextScheduledMileage,
            message: "Aucune maintenance nécessaire pour le moment."
        };
    }
};
