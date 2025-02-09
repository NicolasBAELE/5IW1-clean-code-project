import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { createMoto, getAllUsers } from "../services/api.ts";
import { motoModels } from "../utils/motoUtils.ts";
import { UserType } from "@projet-clean/domain/entities/UserType.ts";

interface CreateMotoFormProps {
    onMotoCreated: () => void;
}

const CreateMotoForm: React.FC<CreateMotoFormProps> = ({ onMotoCreated }) => {
    const [formData, setFormData] = useState({
        model: "",
        registrationNumber: "",
        mileage: 0,
        ownerId: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
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

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    const disabled = !formData.model || !formData.mileage || !formData.registrationNumber;

    const createMotoForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await createMoto(formData);
            if (response.errors) {
                setError(response.errors[0].message);
                return;
            }
            onMotoCreated();
            setFormData({
                model: "",
                registrationNumber: "",
                mileage: 0,
                ownerId: "",
            });
        } catch (e) {
            setError("Erreur lors de la création de la moto. Veuillez réessayer.");
            console.log(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <form
                onSubmit={createMotoForm}
                className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"
            >
                {error && <div className="text-red-500 mb-4">{error}</div>}

                <div className="mb-4">
                    <label
                        htmlFor="ownerId"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Propriétaire
                    </label>
                    <select
                        id="ownerId"
                        value={formData.ownerId}
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

                <div className="mb-4">
                    <label
                        htmlFor="model"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Modèle
                    </label>
                    <select
                        id="model"
                        value={formData.model}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option
                            value=""
                            disabled
                        >
                            Choisissez un modèle
                        </option>
                        {motoModels.map((motoModel) => (
                            <option
                                key={motoModel}
                                value={motoModel}
                            >
                                {motoModel}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="registrationNumber"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Numéro d'identification
                    </label>
                    <input
                        id="registrationNumber"
                        type="text"
                        placeholder="Numéro d'identification"
                        value={formData.registrationNumber}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="mileage"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Kilométrage
                    </label>
                    <input
                        id="mileage"
                        type="number"
                        placeholder="Kilométrage"
                        value={formData.mileage}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        disabled={disabled}
                        className={`${
                            disabled
                                ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-700"
                        } text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                        {isSubmitting ? "Création en cours..." : "Créer la moto"}
                    </button>
                </div>
            </form>
        </>
    );
};

export default CreateMotoForm;
