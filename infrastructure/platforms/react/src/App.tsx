import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { Motos } from "./pages/Motos";
import { Stocks } from "./pages/Stocks";
import Register from "./pages/Register";
import MainLayout from "./components/MainLayout";

const getInitialPage = () => {
  const path = window.location.pathname.slice(1); // Supprime le `/`
  return path === "" ? "motos" : path; // Par défaut, page "motos"
};

const App = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(getInitialPage);

  useEffect(() => {
    // Met à jour l'URL lorsque la page change
    window.history.pushState({}, "", `/${page}`);
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case "motos":
        return <Motos />;
      case "stocks":
        return <Stocks />;
      case "register":
        return <Register />;
      default:
        return <p>Page introuvable.</p>;
    }
  };

  return (
    <MainLayout setPage={setPage}>
      {user && (
        <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">Bienvenue {user.name} !</h2>
          <p className="text-gray-600">{user.email}</p>
          <span className="inline-block mt-2 px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
            {user.role}
          </span>
        </div>
      )}
      <main className="bg-white p-6 rounded-lg shadow-md">{renderPage()}</main>
    </MainLayout>
  );
};

export default App;
