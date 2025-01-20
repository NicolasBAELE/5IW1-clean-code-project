import React from 'react';
import MotoList from './MotoList';
import { Moto } from '../services/api';

interface DashboardProps {
  motos: Moto[];
}

const Dashboard: React.FC<DashboardProps> = ({ motos }) => {
  return (
    <section className="p-6 max-w-screen-lg mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800">Tableau de Bord</h2>
      <p className="text-gray-600 mt-2">Bienvenue sur la plateforme de gestion des motos</p>
      <MotoList motos={motos} />
    </section>
  );
};

export default Dashboard;
