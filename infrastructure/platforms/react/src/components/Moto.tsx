import { useMoto } from "../hooks/useMoto";
import { CreateMaintenanceForm } from "./CreateMaintenanceForm.tsx";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.tsx";

export const formatDate = (dateString: string) => {
    if (!dateString) return "Non défini";
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    return date.toLocaleDateString("fr-FR", options);
};

interface MotoProps {
    motoId: string;
    onClose: () => void;
}

export const Moto = ({ motoId, onClose }: MotoProps) => {
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

    const [openCreateMaintenanceForm, setOpenCreateMaintenanceForm] = useState(false);
    const { isAdmin } = useAuth();

    if (loading) return <div className="p-4 text-center">Chargement...</div>;
    if (error) return <div className="p-4 text-center text-red-600">{error}</div>;
    if (!moto) return <div className="p-4 text-center">Pas de données à afficher.</div>;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-5xl p-8 rounded-lg shadow-xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
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

                {!nextMaintenanceScheduled && !openCreateMaintenanceForm && isAdmin && (
                    <div className="mb-4">
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded w-full"
                            onClick={() => setOpenCreateMaintenanceForm(true)}
                        >
                            {lastMaintenance?.id ? "Ajouter un entretien" : "Renseigner le dernier entretien en date"}
                        </button>
                    </div>
                )}

                {openCreateMaintenanceForm && (
                    <CreateMaintenanceForm
                        setOpenCreateMaintenanceForm={setOpenCreateMaintenanceForm}
                        handleCreateMaintenance={handleCreateMaintenance}
                        lastMaintenance={lastMaintenance}
                    />
                )}

                {!openCreateMaintenanceForm && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                                Historique des maintenances
                            </h4>
                            <div className="max-h-[500px] overflow-y-auto pr-2">
                                {moto.maintenances
                                    .sort(
                                        (a, b) =>
                                            new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime()
                                    )
                                    .map((maintenance, index) => (
                                        <div
                                            key={index}
                                            className="border border-gray-200 rounded-md p-4 mb-2 shadow-sm"
                                        >
                                            <p className="text-gray-700">
                                                <strong>Prévue :</strong> {formatDate(maintenance.scheduledDate)}
                                            </p>
                                            <p className="text-gray-700">
                                                <strong>Effectué :</strong> {formatDate(maintenance.completedDate)}
                                            </p>
                                            <p className="text-gray-700">
                                                <strong>Kilométrage :</strong> {maintenance.mileageAtService}
                                            </p>
                                            <p className="text-gray-700">
                                                <strong>Type :</strong>{" "}
                                                {maintenance.type === "CURATIVE" ? "Curatif" : "Préventif"}
                                            </p>
                                            <p className="text-gray-700">
                                                <strong>Coût :</strong> {maintenance.cost || "-"}€
                                            </p>
                                            <p className="text-gray-700">
                                                <strong>Notes :</strong> <pre>{maintenance.notes || "-"}</pre>
                                            </p>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <div>
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Détails de la moto</h3>
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

                            {lastMaintenance && (
                                <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-md shadow-sm">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-1">Dernier entretien</h4>
                                    <p className="text-gray-700">
                                        <strong>Prévue :</strong> {formatDate(lastMaintenance.scheduledDate)}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Effectué :</strong> {formatDate(lastMaintenance.completedDate)}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Type :</strong>{" "}
                                        {lastMaintenance.type === "CURATIVE" ? "Curatif" : "Préventif"}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Coût :</strong> {lastMaintenance.cost || "-"}€
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Notes :</strong>
                                        <pre>{lastMaintenance.notes || "-"}</pre>
                                    </p>
                                </div>
                            )}

                            {nextMaintenanceScheduled && (
                                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md shadow-sm">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-1">
                                        Prochain entretien programmé
                                    </h4>
                                    <p className="text-gray-700">
                                        <strong>Prévue :</strong> {formatDate(nextMaintenanceScheduled.scheduledDate)}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Effectué :</strong> {formatDate(nextMaintenanceScheduled.completedDate)}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Type :</strong>{" "}
                                        {nextMaintenanceScheduled.type === "CURATIVE" ? "Curatif" : "Préventif"}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Coût :</strong> {nextMaintenanceScheduled.cost || "-"}€
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Notes :</strong>
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
                            )}

                            {nextMaintenanceDatas && (
                                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md shadow-sm">
                                    <p className="text-gray-700">{nextMaintenanceDatas.message}</p>
                                    {nextMaintenanceDatas.nextScheduledMileage && (
                                        <p className="text-gray-700">
                                            <strong>Kilométrage suivant :</strong>{" "}
                                            {nextMaintenanceDatas.nextScheduledMileage}
                                        </p>
                                    )}
                                    {nextMaintenanceDatas.nextScheduledDate && (
                                        <p className="text-gray-700">
                                            <strong>Date suivante :</strong>{" "}
                                            {formatDate(nextMaintenanceDatas.nextScheduledDate)}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
