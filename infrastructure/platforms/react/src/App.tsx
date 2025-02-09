import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useAuth} from './context/AuthContext.tsx';
import {Motos} from './pages/Motos.tsx';
import {Stocks} from './pages/Stocks.tsx';
import {Customers} from './pages/Customers.tsx';
import {Admins} from './pages/Admins.tsx';
import {Profile} from './pages/Profile.tsx';
import Header from './components/Header.tsx';
import {Home} from './pages/Home.tsx';
import {Route, Routes} from "react-router";

const App = () => {
    const {isAuthenticated} = useAuth();

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header/>
            <div className="flex-grow max-w-4xl mx-auto px-4 py-6">
                <main className="w-[80vw] bg-white p-6 rounded-lg shadow-md">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        {isAuthenticated && <Route path="/motos" element={<Motos/>}/>}
                        {isAuthenticated && <Route path="/stocks" element={<Stocks/>}/>}
                        {isAuthenticated && <Route path="/customers" element={<Customers/>}/>}
                        {isAuthenticated && <Route path="/admins" element={<Admins/>}/>}
                        {isAuthenticated && <Route path="/profile" element={<Profile/>}/>}
                    </Routes>
                </main>
            </div>
            <footer className="bg-white shadow-md w-full p-4 text-center mt-auto">
                <p className="text-gray-600">&copy; 2025 Triumph Motorcycles. Tous droits réservés.</p>
            </footer>
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
