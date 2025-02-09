import { useEffect, useState } from "react";
// import { getAllDrivers } from "../services/api";
import { DriverType } from "@projet-clean/domain/entities/DriverType";
import { CreateDriverForm } from "../components/CreateDriverForm";

export const Test = () => {
    const [drivers, setDrivers] = useState<DriverType[]>([]);
    const [openCreateDriver, setOpenCreateDriver] = useState<boolean>(false);

    const fetchDrivers = async () => {
        try {
            // const data = await getAllDrivers();
            setDrivers(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des conducteurs:", error);
        }
    };

    useEffect(() => {
        fetchDrivers();
    }, []);

    const onDriverCreated = () => {
        fetchDrivers();
        setOpenCreateDriver(false);
    };

    return (
        <div className="p-6">
            {openCreateDriver ? (
                <CreateDriverForm onDriverCreated={onDriverCreated} />
            ) : (
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setOpenCreateDriver(true)}
                >
                    Ajouter un conducteur
                </button>
            )}

            <h2 className="text-xl font-bold mt-6 mb-4 border-b pb-2 text-gray-800">Liste des conducteurs :</h2>

            {drivers.length > 0 ? (
                drivers.map((driver) => (
                    <div
                        key={driver.id}
                        className="p-4 border border-gray-200 rounded-lg mb-4"
                    >
                        <p>
                            <span className="font-semibold">Nom :</span> {driver.user.name}
                        </p>
                        <p>
                            <span className="font-semibold">Email :</span> {driver.user.email}
                        </p>
                        <p>
                            <span className="font-semibold">Numéro de permis :</span> {driver.licenseNumber}
                        </p>
                        <p>
                            <span className="font-semibold">Expérience :</span> {driver.experienceYears} ans
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-gray-600">Aucun conducteur enregistré.</p>
            )}
        </div>
    );
};
