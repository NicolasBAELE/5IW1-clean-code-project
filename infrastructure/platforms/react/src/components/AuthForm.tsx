import {useState} from "react";
import {Link} from "react-router";

const AuthForm = () => {
    const [formData, setFormData] = useState({
        login: "",
        password: "",
    })
    const handleChange = (e) => {
        setFormData({
                ...formData,
                [e.target.id]: e.target.value
            }
        )
    }
    const login = async (e) => {
        e.preventDefault()
        try {
            // const response = await loginOrRegister()
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <form onSubmit={login} className={"d-flex flex-direction-column"}>
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
