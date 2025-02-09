import {ChangeEvent, FormEvent, useState} from "react";
import {loginUser, resetPassword} from "../services/api.ts";
import {useAuth} from "../context/AuthContext.tsx";

const AuthForm = () => {
    const {login} = useAuth();
    const [error, setError] = useState<string>("")
    const [reset, setReset] = useState<boolean>(false)
    const [formData, setFormData] = useState({
        login: "",
        password: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleResetPassword = async () => {
        try {
            const reset = await resetPassword({email: formData.login, password: formData.password});
            login(reset.token);
        } catch (e) {
            console.log(e);
        }
    };

    const loginForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (reset) {
                handleResetPassword()
            } else {
                const {data} = await loginUser(formData);
                if (data.login?.status === "error") {
                    if (data.login?.message.includes("réinitialiser")) {
                        setReset(true)
                    }
                    setError(data.login?.message)
                } else if (data.login) {
                    const {token} = data.login;
                    login(token);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="flex items-center space-x-4">
            <form
                onSubmit={loginForm}
                className="flex items-center space-x-2"
            >
                <input
                    id="login"
                    type="text"
                    placeholder="Email"
                    value={formData.login}
                    onChange={handleChange}
                    className="shadow border rounded py-1 px-2 text-gray-700 focus:outline-none focus:shadow-outline w-32"
                />
                <input
                    id="password"
                    type="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    className="shadow border rounded py-1 px-2 text-gray-700 focus:outline-none focus:shadow-outline w-32"
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                >
                    {reset ? error : "Se connecter"}
                </button>
            </form>

            {!reset && error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
};

export default AuthForm;
