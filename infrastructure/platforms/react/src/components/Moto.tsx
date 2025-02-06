import {useState} from "react";
import {useMoto} from "../hooks/useMoto";

export const Moto = ({motoId}: { motoId: string }) => {
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
        handleCompleteMaintenance
    } = useMoto(motoId);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;
    if (!moto) return <div>Pas de données à afficher.</div>;

    return (
        <div className="mt-4">
            {!nextMaintenanceScheduled && (
                <>
                    <input
                        type="date"
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="Date dernière maintenance"
                    />
                    {!lastMaintenance?.id && (
                        <input
                            type="number"
                            onChange={(e) => setMileageFirstMaintenance(parseInt(e.target.value))}
                            placeholder="Kilométrage à la dernière maintenance"
                        />
                    )}
                    <select onChange={(e) => setType(e.target.value as "PREVENTIVE" | "CURATIVE")}>
                        <option value="PREVENTIVE">Préventif</option>
                        <option value="CURATIVE">Curatif</option>
                    </select>
                    <button
                        onClick={() => handleCreateMaintenance(year, type, mileageFirstMaintenance, setMileageFirstMaintenance)}>
                        {lastMaintenance?.id ? "Ajouter un entretien" : "Renseigner le dernier entretien en date"}
                    </button>
                </>
            )}

            <h3>Détails de la moto:</h3>
            <p><strong>Modèle:</strong> {moto.model}</p>
            <p><strong>Immatriculation:</strong> {moto.registrationNumber}</p>
            <p><strong>KM:</strong> {moto.mileage}</p>

            <br/>
            <strong>Maintenances:</strong>
            {moto.maintenances.map((maintenance, index) => (
                <div key={index}>
                    Prévue: {maintenance.scheduledDate || "Pas prévue"} ||||||
                    effectué: {maintenance.completedDate || "Pas effectué"} ||||||
                    kilométrage: {maintenance.mileageAtService} ||||||
                    type: {maintenance.type === "CURATIVE" ? "Curatif" : "Préventif"}
                </div>
            ))}

            <br/>
            {lastMaintenance && (
                <div>
                    Dernier
                    entretien: {lastMaintenance.completedDate} kilométrage: {lastMaintenance.mileageAtService} type: {lastMaintenance.type === "CURATIVE" ? "Curatif" : "Préventif"}
                </div>
            )}

            {nextMaintenanceScheduled && (
                <div>
                    Prochain
                    entretien: {nextMaintenanceScheduled.scheduledDate} type: {nextMaintenanceScheduled.type === "CURATIVE" ? "Curatif" : "Préventif"} ||||||
                    <button onClick={() => {
                        const mileageInput = window.prompt("Veuillez entrer le kilométrage actuel :");
                        if (mileageInput) {
                            const mileage = parseInt(mileageInput, 10);
                            if (!isNaN(mileage) && mileage > 0) {
                                handleCompleteMaintenance(nextMaintenanceScheduled.id, mileage);
                            } else {
                                alert("Veuillez entrer un kilométrage valide.");
                            }
                        }
                    }}>
                        Entretien effectué ce jour
                    </button>
                </div>
            )}

            <br/>
            {nextMaintenanceDatas && (
                <>
                    <div>{nextMaintenanceDatas.message}</div>
                    {nextMaintenanceDatas.nextScheduledMileage &&
                        <div>Au kilométrage: {nextMaintenanceDatas.nextScheduledMileage}</div>}
                    {nextMaintenanceDatas.nextScheduledDate &&
                        <div>Ou à la date: {nextMaintenanceDatas.nextScheduledDate}</div>}
                </>
            )}
        </div>
    );
};