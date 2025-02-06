import { useEffect, useState } from "react";
import Header from "./components/Header";
import { getAllMotos } from "./services/api";
import { useAuth } from "./context/AuthContext.tsx";
import CreateMotoForm from "./components/CreateMotoForm.tsx";
import { Moto } from "./components/Moto.tsx";

const App = () => {
    const { user } = useAuth();
    const [motos, setMotos] = useState<any[]>([]);
    const [motoId, setMotoId] = useState<string>("");

    // Fonction pour récupérer les motos
    const fetchMotos = async () => {
        try {
            const data = await getAllMotos();
            setMotos(data);  // Assurer que "data" est un tableau ici
        } catch (error) {
            console.error("Erreur lors de la récupération des motos:", error);
        }
    };

    // Effect pour récupérer les motos au chargement de l'app
    useEffect(() => {
        fetchMotos();
    }, []);  // Ce useEffect est exécuté une seule fois lors du chargement initial de la page

    // Fonction pour actualiser la liste des motos après la création
    const onMotoCreated = () => {
        fetchMotos();
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            {user && (
                <>
                    <h2>Bienvenue à toi jeune {user?.name}</h2>
                    <h2>{user?.email}</h2>
                    <h2>{user?.role}</h2>
                </>
            )}
            <main className="bg-gray-50 p-4">
                {user && <CreateMotoForm onMotoCreated={onMotoCreated} />}
                {/* Si motoId est sélectionné, afficher les détails de la moto */}
                {motoId && <Moto motoId={motoId} />}
                <h2 className="text-lg font-bold mt-4">Motos disponibles:</h2>
                {motos.length > 0 ? (
                    motos.map((moto) => (
                        <div
                            key={moto.id}
                            className="p-2 border-b"
                            onClick={() => setMotoId(moto.id)}  // Set motoId onClick
                        >
                            <strong>Modèle:</strong> {moto.model} - <strong>Immatriculation:</strong> {moto.registrationNumber} - <strong>KM:</strong> {moto.mileage}
                        </div>
                    ))
                ) : (
                    <p>Aucune moto disponible.</p>
                )}
            </main>
        </div>
    );
};

export default App;
