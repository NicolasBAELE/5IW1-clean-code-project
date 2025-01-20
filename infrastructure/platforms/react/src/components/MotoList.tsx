import React from 'react';
import { Moto } from '../services/api';

interface MotoListProps {
  motos: Moto[];
}

const MotoList: React.FC<MotoListProps> = ({ motos }) => {
  return (
    <div className="mt-6">
      <h3 className="text-2xl font-semibold text-gray-800">Liste des Motos</h3>
      <ul className="mt-4 space-y-4">
        {motos.map((moto, index) => (
          <li key={index} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <div className="flex justify-between items-center">
              <strong className="text-lg text-gray-700">{moto.model}</strong>
              <span className="text-sm text-gray-500">{moto.kilometrage} km</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MotoList;
