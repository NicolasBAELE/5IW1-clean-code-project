import {Moto} from "../types/Moto.ts";

export const motoModels: string[] = ["Triumph Street Triple", "Triumph Speed Triple", "Triumph Rocket 3"]

export const nextMaintenance = (
    moto: Moto,
    lastMaintenance?: {
        mileageAtService: number;
        completedDate: string;
        scheduledDate: string;
        type: "PREVENTIVE" | "CURATIVE";
    }
) => {
    // Si on n'a pas de dernière maintenance, on retourne un message indiquant que la première maintenance doit être définie
    if (!lastMaintenance) {
        return {
            message: "Aucune maintenance précédente trouvée. Définir la première maintenance."
        };
    }

    const {mileageAtService, completedDate} = lastMaintenance;

    const currentDate = new Date();
    const lastCompletedDate = new Date(completedDate);
    const lastMileage = mileageAtService;

    // Calcul du prochain kilométrage (ajout de l'intervalle)
    const mileageInterval = 10000; // Exemple d'intervalle de 10 000 km pour la maintenance préventive
    const nextScheduledMileage = lastMileage + mileageInterval;

    // Calcul de la prochaine date (ajout de l'intervalle de temps)
    const timeInterval = 1; // Maintenance préventive tous les 12 mois
    lastCompletedDate.setFullYear(lastCompletedDate.getFullYear() + timeInterval);

    const nextCompletedDate = lastCompletedDate.toISOString();

    // Vérification si la moto a déjà atteint le kilométrage ou la date limite pour la prochaine maintenance
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
