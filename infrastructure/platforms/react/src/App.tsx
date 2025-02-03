import React, {useEffect, useState} from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import {fetchMotos, Moto} from './services/api';
import {useAuth} from "./contexte/AuthContext.tsx";

const App = () => {
    const [motos, setMotos] = useState<Moto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const {user} = useAuth()

    useEffect(() => {
        const loadMotos = async () => {
            try {
                const response = await fetchMotos();
                console.log(response)
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
            <Header/>
            <h2> Bienvenue à toi jeune {user?.name}</h2>
            <h2> {user?.email}</h2>
            <h2> {user?.role}</h2>
            <main className="bg-gray-50">
                {loading ? (
                    <div className="text-center py-12 text-gray-600">Chargement...</div>
                ) : (
                    <Dashboard motos={motos}/>
                )}
            </main>
        </div>
    );
};

export default App;
