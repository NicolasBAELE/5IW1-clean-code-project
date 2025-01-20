const Header = () => {
  return (
    <header className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-semibold">Gestion de Flotte - Triumph Motorcycles</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#motos" className="text-white hover:text-gray-300">Motos</a></li>
            <li><a href="#entretien" className="text-white hover:text-gray-300">Entretiens</a></li>
            <li><a href="#pieces" className="text-white hover:text-gray-300">Pièces Détachées</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
