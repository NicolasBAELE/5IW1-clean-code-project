import {Dispatch, SetStateAction, useState} from "react";
import {toast} from "react-toastify";
import {createTest} from "../services/api.ts";


export const CreateTestForm = ({handleMotoTestCreated, driverId}) => {
    const [startDate, setStartDate] = useState<string>("")
    const [endDate, setEndDate] = useState<string>("")
    const [moto, setMoto] = useState<string>("")

    const HandleCreationClick = async ()=> {
        if (!startDate || !endDate) {
            toast.error(`veuillez remplir tout les champs)`, {
                autoClose: 5000,
            });
        } else {
            const testCreated = await createTest({
                moto,
                startDate: new Date(startDate).toISOString(),
                endDate: new Date(endDate).toISOString(),
                driverId,
            });
            console.log(testCreated)
            handleMotoTestCreated();
        }
    }

    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Date de départ
            </label>
            <input
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
                className="block w-full border border-gray-300 rounded-md p-2 mb-4"
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Date de fin
            </label>
            <input
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
                className="block w-full border border-gray-300 rounded-md p-2 mb-4"
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Modèle de moto
            </label>
            <input
                type="text"
                onChange={(e) => setMoto(e.target.value)}
                className="block w-full border border-gray-300 rounded-md p-2 mb-4"
            />

            <button
                onClick={() => HandleCreationClick()}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded w-full"
            >
                Ajouter un essai
            </button>
        </div>
    );
};