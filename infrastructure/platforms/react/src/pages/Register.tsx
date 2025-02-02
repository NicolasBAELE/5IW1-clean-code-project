import {useState} from "react";
import {register} from "../services/api.ts";
import {useAuth} from "../contexte/AuthContext.tsx";
import {useNavigate} from "react-router";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })
    const handleChange = (e) => {
        setFormData({
                ...formData,
                [e.target.id]: e.target.value
            }
        )
    }
    const {user, isAuthenticated, login, logout, loading} = useAuth()
    const navigate = useNavigate(); // Hook pour la redirection

    const submit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await register(formData)
            if (!data) {
                return console.log('Error bro')
            }
            const {token, user} = data.createUser
            login(token, user)
            console.log('redirection')
            navigate("/")

        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <h2 className={"text-center text-2xl p-2 underline"}>Inscrivez-vous 🏍️ Vroum Vroum </h2>
            <form onSubmit={submit} className={"flex flex-col space-y-4 p-4"}>
                <input id="name"
                       type={'text'}
                       placeholder={"Nom"}
                       value={formData.name}
                       onChange={handleChange}
                       className={"shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline invalid:border-pink-500 invalid:text-pink-600"}
                       required
                       pattern={"[a-zA-Z\\s]{3,20}"}
                />
                <input id="email"
                       type={'text'}
                       placeholder={"Email"}
                       value={formData.email}
                       onChange={handleChange}
                       className={"shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline invalid:border-pink-500 invalid:text-pink-600"}
                       required
                       pattern={"[\\w]{3,30}@[\\w]{3,30}\\.[a-z]{2,3}"}
                />
                <input id="password"
                       type={'password'}
                       placeholder={"Mot de passe"}
                       value={formData.password}
                       onChange={handleChange}
                       className={"shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline invalid:border-pink-500 invalid:text-pink-600"}
                       required
                       pattern={"[^\\s]{1,20}"}
                />
                <button type={"submit"}
                        className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"}
                >
                    S'inscrire
                </button>
            </form>
        </>
    )
}
export default Register;
