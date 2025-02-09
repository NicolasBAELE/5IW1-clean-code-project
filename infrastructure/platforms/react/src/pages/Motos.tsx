import CreateMotoForm from "../components/CreateMotoForm.tsx";
import { Moto } from "../components/Moto.tsx";
import { useAuth } from "../context/AuthContext.tsx";
import { useEffect, useState } from "react";
import { getAllMotos } from "../services/api.ts";
import { MotoType } from "@projet-clean/domain/entities/MotoType.ts";
import { toast } from "react-toastify";

export const Motos = () => {
  const { user } = useAuth();
  const [motos, setMotos] = useState<MotoType[]>([]);
  const [motoId, setMotoId] = useState<string>("");
  const [openCreateMoto, setOpenCreateMoto] = useState<boolean>(false);

  const fetchMotos = async () => {
    try {
      const data = await getAllMotos();
      setMotos(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des motos:", error);
      toast.error("Erreur lors de la récupération des motos.");  
    }
  };

  useEffect(() => {
    fetchMotos();
  }, []);

  const onMotoCreated = () => {
    fetchMotos();
    setOpenCreateMoto(false);
    toast.success("Moto ajoutée avec succès !");
  };

  return (
    <>
      {user && openCreateMoto && <CreateMotoForm onMotoCreated={onMotoCreated} />}
      {user && !openCreateMoto && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setOpenCreateMoto(true)}
        >
          Ajouter une moto
        </button>
      )}

      {!openCreateMoto && motoId && (
        <div className="mt-6">
          <Moto motoId={motoId} onClose={() => setMotoId("")} />
        </div>
      )}

      {!openCreateMoto && (
        <>
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
                <p>
                  <span className="font-semibold">Propriétaire: </span> {moto.owner?.name} {moto.owner?.email}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Aucune moto disponible.</p>
          )}
        </>
      )}
    </>
  );
};
