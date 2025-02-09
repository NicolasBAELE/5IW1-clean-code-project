import {toast} from "react-toastify";
import {ChangeEvent, FormEvent, useState} from "react";
import {register} from "../services/api";

interface CreateCustomerFormProps {
    onUserCreated: () => void;
    isAdmin?: boolean
}

const CreateUserForm: React.FC<CreateCustomerFormProps> = ({onUserCreated, isAdmin = false}) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "CUSTOMER",
        role: isAdmin ? "ADMIN" : "CUSTOMER",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value.trim(),
        });
    };

    const disabled = !formData.name || !formData.email;

    const createUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const registerReq = await register(formData);
            if (registerReq.status === "error") {
                setError("Cet utilisateur existe déjà")
                toast.error("Cet utilisateur existe déjà");
            } else {
                onUserCreated();
                setFormData({
                    name: "",
                    email: "",
                    password: "CUSTOMER",
                    role: isAdmin ? "ADMIN" : "CUSTOMER",
                });
                toast.success("Utilisateur créé avec succès !");
            }
        } catch (e) {
            setError("Erreur lors de la création de l'utilisateur. Veuillez réessayer.");
            toast.error("Erreur lors de la création du client. Veuillez réessayer.");
            console.log(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <form onSubmit={createUser} className="d-flex flex-direction-column">
                {error && <div className="text-red-500">{error}</div>}

                <input
                    id="name"
                    type="text"
                    placeholder="Nom de l'utilisateur"
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
                    {isSubmitting ? "Création en cours..." : "Créer l'utilisateur"}
                </button>
            </form>
        </>
    );
};

export default CreateUserForm;
