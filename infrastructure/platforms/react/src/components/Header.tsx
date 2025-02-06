import AuthForm from "./AuthForm.tsx";
import { useAuth } from "../context/AuthContext.tsx";

const Header = () => {
  const { logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-md">
      <div className="container mx-auto px-6 py-4">
        {/* Conteneur principal : en colonne sur mobile, en ligne sur desktop */}
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          {/* Titre du site avec sous-titre en dessous */}
          <div className="text-center md:text-left">
            <h1 className="text-white text-3xl font-extrabold">
              Triumph Motorcycles
            </h1>
            <span className="text-sm text-gray-200">
              Gestion de Flotte -
            </span>
          </div>
          {/* Navigation */}
          <nav className="mt-4 md:mt-0">
            <ul className="flex items-center space-x-8">
              <li>
                <a
                  href="#motos"
                  className="text-white text-lg hover:text-gray-300 transition-colors duration-200"
                >
                  Motos
                </a>
              </li>
              <li>
                <a
                  href="#entretien"
                  className="text-white text-lg hover:text-gray-300 transition-colors duration-200"
                >
                  Entretiens
                </a>
              </li>
              <li>
                <a
                  href="#pieces"
                  className="text-white text-lg hover:text-gray-300 transition-colors duration-200"
                >
                  Pièces Détachées
                </a>
              </li>
              {!isAuthenticated && (
                <li className="flex items-center">
                  <AuthForm />
                </li>
              )}
              {isAuthenticated && (
                <li>
                  <button
                    onClick={() => logout()}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:shadow-outline"
                  >
                    Se déconnecter
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
