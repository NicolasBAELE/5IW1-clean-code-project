import {ChangeEvent, FormEvent, useState} from "react";
import {createStock} from "../services/api.ts";

interface CreateStockFormProps {
    onStockCreated: () => void;
}

const CreateStockForm: React.FC<CreateStockFormProps> = ({onStockCreated}) => {
    const [formData, setFormData] = useState({
        name: "",
        cost: "",
        quantity: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);  // Gérer l'état de soumission
    const [error, setError] = useState<string | null>(null);  // Gérer les erreurs

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    const disabled = !formData.name || !formData.cost || !formData.quantity;

    const createStockForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);  // Désactiver le bouton pendant l'envoi
        setError(null);  // Réinitialiser l'erreur avant la nouvelle soumission

        try {
            await createStock(formData);
            onStockCreated();
            setFormData({
                name: "",
                cost: "",
                quantity: "",
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
            <form onSubmit={createStockForm} className="d-flex flex-direction-column">
                {error && <div className="text-red-500">{error}</div>}

                <input
                    id="name"
                    type="text"
                    placeholder="Nom du produit"
                    value={formData.name}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />

                <input
                    id="cost"
                    type="number"
                    step="0.01"
                    placeholder="Prix"
                    value={formData.cost}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />

                <input
                    id="quantity"
                    type="number"
                    placeholder="Quantité"
                    value={formData.quantity}
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
                    {isSubmitting ? "Création en cours..." : "Créer le produit"}
                </button>
            </form>
        </>
    );
};

export default CreateStockForm;
