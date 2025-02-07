import {useMoto} from "../hooks/useMoto";
import {CreateMaintenanceForm} from "./CreateMaintenanceForm.tsx";
import {useState} from "react";

interface MotoProps {
    motoId: string;
    onClose: () => void;
}

export const Moto = ({motoId, onClose}: MotoProps) => {
    const {
        moto,
        loading,
        error,
        nextMaintenanceScheduled,
        nextMaintenanceDatas,
        handleCompleteMaintenance,
        lastMaintenance,
        handleCreateMaintenance,
    } = useMoto(motoId);

    const [openCreateMaintenanceForm, setOpenCreateMaintenanceForm] = useState(false)

    if (loading) return <div className="p-4 text-center">Chargement...</div>;
    if (error) return <div className="p-4 text-center text-red-600">{error}</div>;
    if (!moto) return <div className="p-4 text-center">Pas de données à afficher.</div>;

    return (
        // Overlay de la modal
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            {/* Conteneur de la modal */}
            <div className="bg-white w-full max-w-fit p-6 rounded-lg shadow-lg relative">
                {/* Bouton de fermeture */}
                <button
                    onClick={() => {
                        onClose();
                    }}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                    aria-label="Fermer la modal"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Formulaire pour renseigner ou créer une maintenance */}
                {!nextMaintenanceScheduled && !openCreateMaintenanceForm && <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded w-full"
                    onClick={() => setOpenCreateMaintenanceForm(true)}
                >
                    {lastMaintenance?.id
                        ? "Ajouter un entretien"
                        : "Renseigner le dernier entretien en date"}
                </button>
                }
                {openCreateMaintenanceForm && <CreateMaintenanceForm
                    setOpenCreateMaintenanceForm={setOpenCreateMaintenanceForm}
                    handleCreateMaintenance={handleCreateMaintenance}
                    lastMaintenance={lastMaintenance}
                />}

                {!openCreateMaintenanceForm && <div className="flex flex-row p-4 space-x-4 h-[90vh] gap-4">
                    {/* Historique des maintenances */}
                    <div className="mb-6 h-full">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">
                            Historique des maintenances
                        </h4>
                        <div className="h-[90%] overflow-auto">
                            {moto.maintenances
                                .sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime())
                                .map((maintenance, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 rounded-md p-4 mb-2"
                                >
                                    <p className="text-gray-700">
                                        <strong>Prévue :</strong>{" "}
                                        {maintenance.scheduledDate || "Pas prévue"}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Effectué :</strong>{" "}
                                        {maintenance.completedDate || "Pas effectué"}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Kilométrage :</strong> {maintenance.mileageAtService}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Type :</strong>{" "}
                                        {maintenance.type === "CURATIVE" ? "Curatif" : "Préventif"}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Coût :</strong>{" "}
                                        {maintenance.cost || "-"}€
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Notes :</strong>{" "}
                                        <pre>{maintenance.notes || "-"}</pre>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Détails de la moto */}
                    <div>
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Détails de la moto
                            </h3>
                            <p className="text-gray-700">
                                <strong>Modèle :</strong> {moto.model}
                            </p>
                            <p className="text-gray-700">
                                <strong>Immatriculation :</strong> {moto.registrationNumber}
                            </p>
                            <p className="text-gray-700">
                                <strong>KM :</strong> {moto.mileage}
                            </p>
                        </div>


                        {/* Dernier entretien */}
                        {
                            lastMaintenance && (
                                <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-1">
                                        Dernier entretien
                                    </h4>
                                    <p className="text-gray-700">
                                        <strong>Prévue :</strong>{" "}
                                        {lastMaintenance.scheduledDate || "Pas prévue"}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Effectué :</strong>{" "}
                                        {lastMaintenance.completedDate || "Pas effectué"}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Type :</strong>{" "}
                                        {lastMaintenance.type === "CURATIVE" ? "Curatif" : "Préventif"}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Coût :</strong>{" "}
                                        {lastMaintenance.cost || "-"}€
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Notes :</strong>{" "}
                                        <pre>{lastMaintenance.notes || "-"}</pre>
                                    </p>
                                </div>
                            )
                        }

                        {/* Prochain entretien programmé */}
                        {
                            nextMaintenanceScheduled && (
                                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-1">
                                        Prochain entretien programmé
                                    </h4>
                                    <p className="text-gray-700">
                                        <strong>Prévue :</strong>{" "}
                                        {nextMaintenanceScheduled.scheduledDate || "Pas prévue"}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Effectué :</strong>{" "}
                                        {nextMaintenanceScheduled.completedDate || "Pas effectué"}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Type :</strong>{" "}
                                        {nextMaintenanceScheduled.type === "CURATIVE" ? "Curatif" : "Préventif"}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Coût :</strong>{" "}
                                        {nextMaintenanceScheduled.cost || "-"}€
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Notes :</strong>{" "}
                                        <pre>{nextMaintenanceScheduled.notes || "-"}</pre>
                                    </p>
                                    <button
                                        onClick={() => {
                                            const mileageInput = window.prompt(
                                                "Veuillez entrer le kilométrage actuel :"
                                            );
                                            if (mileageInput) {
                                                const mileage = parseInt(mileageInput, 10);
                                                if (!isNaN(mileage) && mileage > 0) {
                                                    handleCompleteMaintenance(nextMaintenanceScheduled.id, mileage);
                                                } else {
                                                    alert("Veuillez entrer un kilométrage valide.");
                                                }
                                            }
                                        }}
                                        className="mt-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded w-full"
                                    >
                                        Entretien effectué ce jour
                                    </button>
                                </div>
                            )
                        }

                        {/* Informations complémentaires sur la prochaine maintenance */}
                        {
                            nextMaintenanceDatas && (
                                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                                    <p className="text-gray-700">{nextMaintenanceDatas.message}</p>
                                    {nextMaintenanceDatas.nextScheduledMileage && (
                                        <p className="text-gray-700">
                                            <strong>Kilométrage suivant
                                                :</strong> {nextMaintenanceDatas.nextScheduledMileage}
                                        </p>
                                    )}
                                    {nextMaintenanceDatas.nextScheduledDate && (
                                        <p className="text-gray-700">
                                            <strong>Date suivante :</strong> {nextMaintenanceDatas.nextScheduledDate}
                                        </p>
                                    )}
                                </div>
                            )
                        }
                    </div>
                </div>}
            </div>
        </div>
    );
};
