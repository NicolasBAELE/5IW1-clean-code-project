import {ChangeEvent, FormEvent, useState} from "react";
import {register} from "../services/api.ts";

interface CreateCustomerFormProps {
    onCustomerCreated: () => void;
}

const CreateCustomerForm: React.FC<CreateCustomerFormProps> = ({onCustomerCreated}) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "CUSTOMER",
        role: "CUSTOMER",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    const disabled = !formData.name || !formData.email;

    const createCustomerForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const registerReq = await register(formData);
            if (registerReq.status === "error") {
                setError("Cet utilisateur existe déjà")
            } else {
                onCustomerCreated();
                setFormData({
                    name: "",
                    email: "",
                    password: "CUSTOMER",
                    role: "CUSTOMER",
                });
            }
        } catch (e) {
            setError("Erreur lors de la création de la moto. Veuillez réessayer.");
            console.log(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <form onSubmit={createCustomerForm} className="d-flex flex-direction-column">
                {error && <div className="text-red-500">{error}</div>}

                <input
                    id="name"
                    type="text"
                    placeholder="Nom du client"
                    value={formData.name}
                    required
                    onChange={handleChange}
                    pattern="[a-zA-Z\s]{3,20}"
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />

                <input

                    id="email"
                    type="text"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
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
                    {isSubmitting ? "Création en cours..." : "Créer le client"}
                </button>
            </form>
        </>
    );
};

export default CreateCustomerForm;
