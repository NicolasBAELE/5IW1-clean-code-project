import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {getAllMotos, createMaintenance, validateMaintenance} from "../services/api";
import {nextMaintenance} from "../utils/motoUtils";
import {Moto, Maintenance, NextMaintenanceDatas} from "../types/Moto.ts";

export const useMoto = (motoId: string) => {
    const [moto, setMoto] = useState<Moto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [lastMaintenance, setLastMaintenance] = useState<Maintenance | undefined>(undefined);
    const [nextMaintenanceScheduled, setNextMaintenanceScheduled] = useState<Maintenance | undefined>(undefined);
    const [nextMaintenanceDatas, setNextMaintenanceDatas] = useState<NextMaintenanceDatas | undefined>(undefined);

    const fetchMoto = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getAllMotos(motoId);
            if (response && response.length > 0) {
                setMoto(response[0]);
            } else {
                setError("Moto non trouvée");
            }
        } catch (error) {
            setError("Erreur de récupération des données.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (motoId) {
            fetchMoto();
        }
    }, [motoId]);

    useEffect(() => {
        if (moto) {
            const lastMaintenance = moto.maintenances
                .filter(m => m.completedDate)
                .sort((a, b) => new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime())
                .at(0);

            const nextMaintenanceScheduled = moto.maintenances
                .filter(m => m.scheduledDate && !m.completedDate)
                .sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime())
                .at(0);

            setLastMaintenance(lastMaintenance);
            setNextMaintenanceScheduled(nextMaintenanceScheduled);
        }
    }, [moto]);

    useEffect(() => {
        if (moto) {
            const nextMaintenanceDatas = nextMaintenance(moto, lastMaintenance);
            setNextMaintenanceDatas(nextMaintenanceDatas);
        }
    }, [lastMaintenance, moto]);

    const handleCreateMaintenance = async (
        year: string,
        type: "PREVENTIVE" | "CURATIVE",
        mileageFirstMaintenance: number,
        setMileageFirstMaintenance: Dispatch<SetStateAction<number>>
    ) => {
        if (!year || !type) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        try {
            await createMaintenance({
                motoId,
                year: new Date(year).toISOString(),
                type,
                mileage: mileageFirstMaintenance
            });
            setMileageFirstMaintenance(0)
            fetchMoto();
        } catch (error) {
            console.error("Erreur lors de la création de la maintenance", error);
        }
    };

    const handleCompleteMaintenance = async (maintenanceId: string, mileage: number) => {
        try {
            await validateMaintenance(maintenanceId, mileage);
            fetchMoto();
        } catch (error) {
            console.error("Erreur lors de la validation de la maintenance", error);
        }
    };

    return {
        moto,
        loading,
        error,
        lastMaintenance,
        nextMaintenanceScheduled,
        nextMaintenanceDatas,
        handleCreateMaintenance,
        handleCompleteMaintenance
    };
};