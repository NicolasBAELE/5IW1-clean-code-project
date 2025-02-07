import { useState } from "react";
import { useMoto } from "../hooks/useMoto";

interface MotoProps {
  motoId: string;
  onClose: () => void;
}

export const Moto = ({ motoId, onClose }: MotoProps) => {
  const [year, setYear] = useState<string>("");
  const [type, setType] = useState<"PREVENTIVE" | "CURATIVE">("PREVENTIVE");
  const [mileageFirstMaintenance, setMileageFirstMaintenance] = useState<number>(0);

  const {
    moto,
    loading,
    error,
    lastMaintenance,
    nextMaintenanceScheduled,
    nextMaintenanceDatas,
    handleCreateMaintenance,
    handleCompleteMaintenance,
  } = useMoto(motoId);

  if (loading) return <div className="p-4 text-center">Chargement...</div>;
  if (error) return <div className="p-4 text-center text-red-600">{error}</div>;
  if (!moto) return <div className="p-4 text-center">Pas de données à afficher.</div>;

  return (
    // Overlay de la modal
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Conteneur de la modal */}
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
        {/* Bouton de fermeture */}
        <button
          onClick={() => {
            console.log("Bouton X cliqué");
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
        {!nextMaintenanceScheduled && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date dernière maintenance
            </label>
            <input
              type="date"
              onChange={(e) => setYear(e.target.value)}
              className="block w-full border border-gray-300 rounded-md p-2 mb-4"
            />
            {!lastMaintenance?.id && (
              <>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kilométrage à la dernière maintenance
                </label>
                <input
                  type="number"
                  onChange={(e) =>
                    setMileageFirstMaintenance(parseInt(e.target.value))
                  }
                  placeholder="Kilométrage"
                  className="block w-full border border-gray-300 rounded-md p-2 mb-4"
                />
              </>
            )}
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type d'entretien
            </label>
            <select
              onChange={(e) =>
                setType(e.target.value as "PREVENTIVE" | "CURATIVE")
              }
              className="block w-full border border-gray-300 rounded-md p-2 mb-4"
            >
              <option value="PREVENTIVE">Préventif</option>
              <option value="CURATIVE">Curatif</option>
            </select>
            <button
              onClick={() =>
                handleCreateMaintenance(
                  year,
                  type,
                  mileageFirstMaintenance,
                  setMileageFirstMaintenance
                )
              }
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded w-full"
            >
              {lastMaintenance?.id
                ? "Ajouter un entretien"
                : "Renseigner le dernier entretien en date"}
            </button>
          </div>
        )}

        {/* Détails de la moto */}
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

        {/* Historique des maintenances */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Historique des maintenances
          </h4>
            <div className="h-60 overflow-auto">
              {moto.maintenances.map((maintenance, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-md p-2 mb-2"
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
                </div>
              ))}
          </div>
        </div>

        {/* Dernier entretien */}
        {lastMaintenance && (
          <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
            <h4 className="text-lg font-semibold text-gray-800 mb-1">
              Dernier entretien
            </h4>
            <p className="text-gray-700">
              <strong>Date :</strong> {lastMaintenance.completedDate}
            </p>
            <p className="text-gray-700">
              <strong>Kilométrage :</strong> {lastMaintenance.mileageAtService}
            </p>
            <p className="text-gray-700">
              <strong>Type :</strong>{" "}
              {lastMaintenance.type === "CURATIVE" ? "Curatif" : "Préventif"}
            </p>
          </div>
        )}

        {/* Prochain entretien programmé */}
        {nextMaintenanceScheduled && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <h4 className="text-lg font-semibold text-gray-800 mb-1">
              Prochain entretien programmé
            </h4>
            <p className="text-gray-700">
              <strong>Date prévue :</strong> {nextMaintenanceScheduled.scheduledDate}
            </p>
            <p className="text-gray-700">
              <strong>Type :</strong>{" "}
              {nextMaintenanceScheduled.type === "CURATIVE"
                ? "Curatif"
                : "Préventif"}
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

        {/* Informations complémentaires sur la prochaine maintenance */}
        {nextMaintenanceDatas && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-gray-700">{nextMaintenanceDatas.message}</p>
            {nextMaintenanceDatas.nextScheduledMileage && (
              <p className="text-gray-700">
                <strong>Kilométrage suivant :</strong> {nextMaintenanceDatas.nextScheduledMileage}
              </p>
            )}
            {nextMaintenanceDatas.nextScheduledDate && (
              <p className="text-gray-700">
                <strong>Date suivante :</strong> {nextMaintenanceDatas.nextScheduledDate}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
