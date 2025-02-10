import { toast } from "react-toastify";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getAllUsers, registerDriver } from "../services/api";
import { UserType } from "@projet-clean/domain/entities/UserType";

interface CreateMotoFormProps {
    onDriverCreated: () => void;
}

export const CreateDriverForm: React.FC<CreateMotoFormProps> = ({ onDriverCreated }) => {
    const [formData, setFormData] = useState({
        licenseNumber: "",
        experienceYears: "",
        userId: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value.trim(),
        });
    };

    const disabled = !formData.licenseNumber || !formData.experienceYears;
    const [users, setUsers] = useState<UserType[]>([]);

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const createDriver = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const { data } = await registerDriver(formData);
            const { status, message } = data.createDriver;

            if (status === "error") {
                setError(message);
                toast.error(message);
            } else {
                onDriverCreated();
                setFormData({
                    licenseNumber: "",
                    experienceYears: "",
                    userId: "",
                });
                toast.success("Conducteur créé avec succès !");
            }
        } catch (e) {
            setError("Erreur lors de la création du conducteur. Veuillez réessayer.");
            toast.error("Erreur lors de la création du conducteur. Veuillez réessayer.");
            console.log(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <form
                onSubmit={createDriver}
                className="d-flex flex-direction-column"
            >
                {error && <div className="text-red-500">{error}</div>}
                <div className="mb-4">
                    <label
                        htmlFor="userId"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Client
                    </label>
                    <select
                        id="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option
                            value=""
                            disabled
                        >
                            Choisissez un utilisateur
                        </option>
                        {users
                            .filter((user) => user.role === "CUSTOMER")
                            .map((user) => (
                                <option
                                    key={user.id}
                                    value={user.id}
                                >
                                    {user.name}: {user.email}
                                </option>
                            ))}
                    </select>
                </div>

                <input
                    id="licenseNumber"
                    type="text"
                    placeholder="Numéro de permis"
                    value={formData.licenseNumber}
                    required
                    onChange={handleChange}
                    pattern="\w{1,10}"
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />

                <input
                    id="experienceYears"
                    type="number"
                    placeholder="Année d'expériences"
                    value={parseInt(formData.experienceYears)}
                    onChange={handleChange}
                    required
                    pattern="\d{1,2}"
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />

                <button
                    type="submit"
                    disabled={disabled}
                    className={`${
                        disabled ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
                    } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                >
                    {isSubmitting ? "Création en cours..." : "Créer l'utilisateur"}
                </button>
            </form>
        </>
    );
};

export default CreateDriverForm;
