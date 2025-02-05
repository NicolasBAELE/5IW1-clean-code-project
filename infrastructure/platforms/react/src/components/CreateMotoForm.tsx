import {ChangeEvent, FormEvent, useState} from "react";
import {Link} from "react-router";
import {createMoto, loginUser} from "../services/api.ts";
import {useAuth} from "../context/AuthContext.tsx";

const CreateMotoForm = ({onMotoCreated}) => {
    const {user} = useAuth()
    const [formData, setFormData] = useState({
        model: "",
        registrationNumber: "",
        mileage: 0,
        ownerId: user?.id,
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
                ...formData,
                [e.target.id]: e.target.value
            }
        )
    }

    const createMotoForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await createMoto(formData)
            onMotoCreated()
            // setFormData({model: "", registrationNumber: "", mileage: 0, ownerId: user?.id }); // Réinitialiser le formulaire
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <form onSubmit={createMotoForm} className={"d-flex flex-direction-column"}>
                <input
                    id="model"
                    type={'text'}
                    placeholder={"Modèle de la moto"}
                    value={formData.model}
                    onChange={handleChange}
                    className={"shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                />
                <input
                    id="registrationNumber"
                    type={'text'}
                    placeholder={"Numéro d'identification"}
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    className={"shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin"}
                />
                <input
                    id="mileage"
                    type={'number'}
                    placeholder={"Kilométrage"}
                    value={formData.mileage}
                    onChange={handleChange}
                    className={"shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin"}
                />
                <button type={"submit"}
                        className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"}
                >
                    Créer la moto
                </button>
            </form>
        </>
    )
}
export default CreateMotoForm;
