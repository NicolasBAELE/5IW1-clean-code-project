import { ChangeEvent, FormEvent, useState } from "react";
import { register } from "../services/api.ts";
import { useAuth } from "../context/AuthContext.tsx";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const { login } = useAuth();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await register(formData);
      if (!data) {
        return console.error("Error durant la soumission du formulaire");
      }
      const { token, user } = data.createUser;
      login(token, user);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-center text-2xl font-bold mb-6 underline">
          Inscrivez-vous 🏍️
        </h2>
        <form onSubmit={submit} className="flex flex-col space-y-4">
          <input
            id="name"
            type="text"
            placeholder="Nom"
            value={formData.name}
            onChange={handleChange}
            className="w-full shadow border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline invalid:border-pink-500 invalid:text-pink-600"
            required
            pattern="[a-zA-Z\s]{3,20}"
          />
          <input
            id="email"
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full shadow border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline invalid:border-pink-500 invalid:text-pink-600"
            required
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          />
          <input
            id="password"
            type="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            className="w-full shadow border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline invalid:border-pink-500 invalid:text-pink-600"
            required
            pattern="[^\\s]{1,20}"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
