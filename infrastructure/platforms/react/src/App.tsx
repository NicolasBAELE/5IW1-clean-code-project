import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { fetchMotos, Moto } from './services/api';

const App = () => {
    const [motos, setMotos] = useState<Moto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadMotos = async () => {
            try {
                const response = await fetchMotos();
                setMotos(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des motos:", error);
            } finally {
                setLoading(false);
            }
        };
        loadMotos();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="bg-gray-50">
                {loading ? (
                    <div className="text-center py-12 text-gray-600">Chargement...</div>
                ) : (
                    <Dashboard motos={motos} />
                )}
            </main>
        </div>
    );
};

export default App;
