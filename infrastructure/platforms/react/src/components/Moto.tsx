import React, { useEffect, useState } from "react";
import { getAllMotos } from "../services/api";  // Assurez-vous que getAllMotos est correctement importé

export const Moto = ({ motoId }: { motoId: string }) => {
    const [moto, setMoto] = useState<any>(null); // Pour stocker la moto
    const [loading, setLoading] = useState<boolean>(true); // Pour gérer l'état de chargement
    const [error, setError] = useState<string | null>(null); // Pour gérer les erreurs

    // Effect qui se déclenche lorsque le motoId change
    useEffect(() => {
        const fetchMoto = async () => {
            setLoading(true); // Commence à charger les données
            setError(null); // Réinitialise l'erreur à chaque nouvelle requête

            try {
                const response = await getAllMotos(motoId);
                console.log(response)// Appel API pour récupérer les détails de la moto
                if (response) {
                    setMoto(response[0]);  // Supposons que la réponse contienne un tableau
                } else {
                    setError("Moto non trouvée");
                }
            } catch (error) {
                setError("Erreur de récupération des données.");
            } finally {
                setLoading(false); // Fin du chargement
            }
        };

        if (motoId) {
            fetchMoto();
        }
    }, [motoId]);  // L'effet se déclenche chaque fois que motoId change

    // Affichage en fonction de l'état
    if (loading) {
        return <div>Chargement...</div>;  // Affiche un message pendant le chargement
    }

    if (error) {
        return <div>{error}</div>;  // Affiche une erreur si la récupération a échoué
    }

    // Si moto est disponible, afficher les détails
    if (moto) {
        return (
            <div className="mt-4">
                <h3>Détails de la moto:</h3>
                <p><strong>Modèle:</strong> {moto.model}</p>
                <p><strong>Immatriculation:</strong> {moto.registrationNumber}</p>
                <p><strong>KM:</strong> {moto.mileage}</p>
            </div>
        );
    }

    // Si aucune moto n'est trouvée ou autre cas
    return <div>Pas de données à afficher.</div>;
};
