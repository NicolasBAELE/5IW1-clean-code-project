import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter, Route, Routes} from "react-router";
import Register from "./pages/Register.tsx";
import {AuthProvider, useAuth} from "./context/AuthContext.tsx";

const AppRoutes = () => {
    const {isAuthenticated} = useAuth();
    return (
        <Routes>
            <Route path="/" element={<App/>}/>
            {!isAuthenticated && <Route path="register" element={<Register/>}/>}
            {/*{!isAuthenticated && <Route path="login" element={<Login/>}/>}*/}
            {/*{isAuthenticated && <Route path="dashboard" element={<Dashboard/>}/>}*/}
        </Routes>
    );
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes/>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
)
