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

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-6">
        {user && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800">Bienvenue {user.name} !</h2>
            <p className="text-gray-600">{user.email}</p>
            <span className="inline-block mt-2 px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
              {user.role}
            </span>
          </div>
        )}
        <main className="bg-white p-6 rounded-lg shadow-md">
          {user && <CreateMotoForm onMotoCreated={onMotoCreated} />}
          
          {/* Affichage du détail de la moto sélectionnée */}
          {motoId && (
            <div className="mt-6">
              <Moto motoId={motoId} onClose={() => setMotoId("")} />
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
        </main>
      </div>
    </div>
  );
};

export default App;
