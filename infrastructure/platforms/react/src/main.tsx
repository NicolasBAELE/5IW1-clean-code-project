import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter, Route, Routes} from "react-router";
import {AuthProvider} from "./context/AuthContext.tsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<App/>}/>
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
