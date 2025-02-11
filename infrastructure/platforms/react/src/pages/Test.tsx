import {useEffect, useState} from "react";
import {getAllDrivers} from "../services/api";
import {DriverType} from "@projet-clean/domain/entities/DriverType";
import {CreateDriverForm} from "../components/CreateDriverForm";
import {toast} from "react-toastify";
import {useAuth} from "../context/AuthContext.tsx";
import {Driver} from "../components/Driver.tsx";

export const Test = () => {
    const {user} = useAuth();
    const [drivers, setDrivers] = useState<DriverType[]>([]);
    const [openCreateDriver, setOpenCreateDriver] = useState<boolean>(false);
    const [driver, setDriver] = useState<DriverType | null>(null)

    const fetchDrivers = async () => {
        try {
            const {data} = await getAllDrivers();
            setDrivers(data.getAllDrivers);
        } catch (error) {
            console.error("Erreur lors de la récupération des conducteurs:", error);
            toast.error("Erreur lors de la récupération des conducteurs.");
        }
    };

    useEffect(() => {
        fetchDrivers();
    }, []);

    const onDriverCreated = () => {
        fetchDrivers();
        setOpenCreateDriver(false);
        toast.success("Conducteur ajouté avec succès !");
    };

    return (
        <div>
            {user && openCreateDriver && <CreateDriverForm onDriverCreated={onDriverCreated}/>}
            {user && !openCreateDriver && (
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setOpenCreateDriver(true)}
                >
                    Ajouter un conducteur
                </button>
            )}

            {!openCreateDriver && driver && (
                <div className="mt-6">
                    <Driver
                        driver={driver}
                        onClose={() => setDriver(null)}
                    />
                </div>
            )}

            {!openCreateDriver && (
                <>
                    <h2 className="text-xl font-bold mt-6 mb-4 border-b pb-2 text-gray-800">Liste des conducteurs :</h2>
                    {drivers.length > 0 ? (
                        drivers.map((driver) => (
                            <div
                                key={driver.id}
                                className="p-4 border border-gray-200 rounded-lg mb-4 cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => setDriver(driver)}

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
                </>
            )}
        </div>
    );
};
