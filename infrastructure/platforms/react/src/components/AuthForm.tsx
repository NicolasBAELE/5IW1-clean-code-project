import {ChangeEvent, FormEvent, useState} from "react";
import {Link} from "react-router";
import {loginUser} from "../services/api.ts";
import {useAuth} from "../context/AuthContext.tsx";

const AuthForm = () => {
    const {login} = useAuth()
    const [formData, setFormData] = useState({
        login: "",
        password: "",
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
                ...formData,
                [e.target.id]: e.target.value
            }
        )
    }

    const loginForm = async (e:  FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await loginUser(formData)
            console.log(response, formData)
            const {token, user} = response.data.login
            login(token, user)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <form onSubmit={loginForm} className={"d-flex flex-direction-column"}>
                <input id="login" type={'text'} placeholder={"Email"} value={formData.login} onChange={handleChange}
                       className={"shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}/>
                <input id="password" type={'password'} placeholder={"Mot de passe"} value={formData.password}
                       onChange={handleChange}
                       className={"shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin"}/>
                <button type={"submit"}
                        className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"}>Se
                    connecter
                </button>
            </form>
            <Link to={"/register"}>
                <button
                    className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"}> Pas
                    encore inscrit ?
                </button>
            </Link>
        </>
    )
}
export default AuthForm;
