import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/verify-token", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                const user = await response.json();
                if (user) {
                    setUser(user);
                    setIsAuthenticated(true);

                } else {
                    logout();
                }
            } catch (error) {
                console.error("Error verifying token:", error);
            } finally {
                setLoading(false);
            }
        };
        verifyToken();
    }, []);

    const login = (token, user) => {
        localStorage.setItem("token", token);
        setUser(user);
        setIsAuthenticated(true);
        navigate("/")
        navigate(0)
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
        navigate("/")
        navigate(0)
    };

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personnalisé pour accéder au contexte correctement
export const useAuth = () => {
    return useContext(AuthContext);
};
