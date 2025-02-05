import {ChangeEvent, FormEvent, useState} from "react";
import {createMoto} from "../services/api.ts";
import {useAuth} from "../context/AuthContext.tsx";
import {motoModels} from "../utils/motoUtils.ts";

interface CreateMotoFormProps {
    onMotoCreated: () => void;
}

const CreateMotoForm: React.FC<CreateMotoFormProps> = ({onMotoCreated}) => {
    const {user} = useAuth();
    const [formData, setFormData] = useState({
        model: "",
        registrationNumber: "",
        mileage: 0,
        ownerId: user?.id || "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);  // Gérer l'état de soumission
    const [error, setError] = useState<string | null>(null);  // Gérer les erreurs

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    const disabled = !formData.model || !formData.mileage || !formData.registrationNumber;

    const createMotoForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);  // Désactiver le bouton pendant l'envoi
        setError(null);  // Réinitialiser l'erreur avant la nouvelle soumission

        try {
            await createMoto(formData);
            onMotoCreated();
            setFormData({
                model: "",
                registrationNumber: "",
                mileage: 0,
                ownerId: user?.id || "",
            }); // Réinitialiser le formulaire après la création
        } catch (e) {
            setError("Erreur lors de la création de la moto. Veuillez réessayer.");
            console.log(e);
        } finally {
            setIsSubmitting(false);  // Réactiver le bouton
        }
    };

    return (
        <>
            <form onSubmit={createMotoForm} className="d-flex flex-direction-column">
                {error && <div className="text-red-500">{error}</div>} {/* Affichage des erreurs */}

                <select
                    id="model"
                    value={formData.model}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="" disabled>
                        Choisissez un modèle
                    </option>
                    {motoModels.map((motoModel, index) => (
                        <option key={index} value={motoModel}>
                            {motoModel}
                        </option>
                    ))}
                </select>

                <input
                    id="registrationNumber"
                    type="text"
                    placeholder="Numéro d'identification"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />

                <input
                    id="mileage"
                    type="number"
                    placeholder="Kilométrage"
                    value={formData.mileage}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />

                <button
                    type="submit"
                    disabled={disabled}
                    className={`${
                        disabled
                            ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-700"
                    } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                >
                    {isSubmitting ? "Création en cours..." : "Créer la moto"}
                </button>
            </form>
        </>
    );
};

export default CreateMotoForm;
