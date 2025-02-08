import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router";
import { loginUser } from "../services/api.ts";
import { useAuth } from "../context/AuthContext.tsx";

const AuthForm = () => {
  const { login } = useAuth();
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

  const loginForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      const { token} = response.data.login;
      login(token);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Formulaire de connexion en ligne */}
      <form onSubmit={loginForm} className="flex items-center space-x-2">
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
          Se connecter
        </button>
      </form>
      {/* Bouton "Pas encore inscrit ?" */}
    
    </div>
  );
};

export default AuthForm;
