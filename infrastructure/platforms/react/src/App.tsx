import Header from "./components/Header";
import { ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {useAuth} from "./context/AuthContext.tsx";
import {Motos} from "./pages/Motos.tsx";
import {useState} from "react";
import {Stocks} from "./pages/Stocks.tsx";

const App = () => {
    const {user} = useAuth();
    const [page, setPage] = useState('motos')

    return (
        <div className="min-h-screen bg-gray-100">
            <Header setPage={setPage}/>
            <div className="max-w-4xl mx-auto px-4 py-6">
                {user && (
                    <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800">Bienvenue {user.name} !</h2>
                        <p className="text-gray-600">{user.email}</p>
                        <span
                            className="inline-block mt-2 px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
              {user.role}
            </span>
                    </div>
                )}
                <main className="bg-white p-6 rounded-lg shadow-md">
                    {page === 'motos' && <Motos/>}
                    {page === 'stocks' && <Stocks/>}
                </main>
            </div>
            <ToastContainer
                position="bottom-right"  
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" 
            />
        </div>
    );
};

export default App;
