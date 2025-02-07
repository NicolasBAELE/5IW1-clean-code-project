import CreateMotoForm from "../components/CreateMotoForm.tsx";
import {Moto} from "../components/Moto.tsx";
import {useAuth} from "../context/AuthContext.tsx";
import {useEffect, useState} from "react";
import {getAllMotos} from "../services/api.ts";

export const Motos = () => {
    const {user} = useAuth();
    const [motos, setMotos] = useState<any[]>([]);
    const [motoId, setMotoId] = useState<string>("");

    const fetchMotos = async () => {
        try {
            const data = await getAllMotos();
            setMotos(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des motos:", error);
        }
    };

    useEffect(() => {
        fetchMotos();
    }, []);

    const onMotoCreated = () => {
        fetchMotos();
    };

    return <>
        {user && <CreateMotoForm onMotoCreated={onMotoCreated}/>}

        {/* Affichage du détail de la moto sélectionnée */}
        {motoId && (
            <div className="mt-6">
                <Moto motoId={motoId} onClose={() => setMotoId("")}/>
            </div>
        )}

        <h2 className="text-xl font-bold mt-6 mb-4 border-b pb-2 text-gray-800">
            Motos disponibles :
        </h2>
        {motos.length > 0 ? (
            motos.map((moto) => (
                <div
                    key={moto.id}
                    className="p-4 border border-gray-200 rounded-lg mb-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setMotoId(moto.id)}
                >
                    <p>
                        <span className="font-semibold">Modèle :</span> {moto.model}
                    </p>
                    <p>
                        <span className="font-semibold">Immatriculation :</span> {moto.registrationNumber}
                    </p>
                    <p>
                        <span className="font-semibold">KM :</span> {moto.mileage}
                    </p>
                </div>
            ))
        ) : (
            <p className="text-gray-600">Aucune moto disponible.</p>
        )}
    </>
}