import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router";
import { UserType } from "@projet-clean/domain/entities/UserType.js";

interface AuthContextType {
    user: UserType | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (token: string) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setIsAuthenticated(false);
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
                const decodedToken: UserType | null = await response.json();
                if (response.status === 401) {
                    logout();
                } else if (decodedToken) {
                    setUser(decodedToken);
                    setIsAuthenticated(true);
                    setIsAdmin(decodedToken.role === "ADMIN");
                }
            } catch (error) {
                console.error("Error verifying token:", error);
            } finally {
                setLoading(false);
            }
        };
        verifyToken();
    }, [navigate]);

    const login = (token: string) => {
        localStorage.setItem("token", token);
        navigate("/profile");
        navigate(0);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
        navigate("/");
        navigate(0);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
