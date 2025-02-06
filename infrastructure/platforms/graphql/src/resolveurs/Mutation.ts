import {User} from "@projet-clean/domain/entities/User.js";
import {Moto} from "@projet-clean/react/src/types/Moto.js";
import {Maintenance} from "@projet-clean/react/src/types/Moto.js";

// Définir les interfaces pour les types manquants
interface LoginResponse {
    token: string;
    user: User;
}

export const Mutation = {
    createUser: async (
        parent: any,
        {name, email, password}: { name: string; email: string; password: string }
    ): Promise<User> => {
        const _method = "POST_REGISTER";
        try {
            const response = await fetch("http://prisma:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, email, password, _method}),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const result: unknown = await response.json();
            if (isUser(result)) {
                return result;
            } else {
                throw new Error("Les données retournées ne sont pas dans le format attendu.");
            }
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de créer l'utilisateur");
        }
    },

    login: async (
        parent: any,
        {email, password}: { email: string; password: string }
    ): Promise<LoginResponse> => {
        const _method = "POST_LOGIN";
        try {
            const response = await fetch("http://prisma:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password, _method}),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const result: unknown = await response.json();
            if (isLoginResponse(result)) {
                return result;
            } else {
                throw new Error("Les données retournées ne sont pas dans le format attendu.");
            }
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de se connecter");
        }
    },

    createMoto: async (
        parent: any,
        {model, registrationNumber, mileage, ownerId}: {
            model: string;
            registrationNumber: string;
            mileage: number;
            ownerId: string
        }
    ): Promise<Moto> => {
        const _method = "CREATE_MOTO";
        try {
            const response = await fetch("http://prisma:3000/moto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({model, registrationNumber, mileage, ownerId, _method}),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const result: unknown = await response.json();
            if (isMoto(result)) {
                return result;
            } else {
                throw new Error("Les données retournées ne sont pas dans le format attendu.");
            }
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de créer la moto");
        }
    },

    createMaintenance: async (
        parent: any,
        {year, motoId, type, mileage}: { motoId: string; year: Date; type: string; mileage: number }
    ): Promise<Maintenance> => {
        const _method = "CREATE_MAINTENANCE";
        try {
            const response = await fetch("http://prisma:3000/maintenance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({year, motoId, type, mileage, _method}),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const result: unknown = await response.json();
            if (isMaintenance(result)) {
                return result;
            } else {
                throw new Error("Les données retournées ne sont pas dans le format attendu.");
            }
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de créer la maintenance");
        }
    },

    validateMaintenance: async (
        parent: any,
        {maintenanceId, mileage}: { maintenanceId: string; mileage: number }
    ): Promise<Maintenance> => {
        const _method = "VALIDATE_MAINTENANCE";
        try {
            const response = await fetch("http://prisma:3000/maintenance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({maintenanceId, mileage, _method}),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const result: unknown = await response.json();
            if (isMaintenance(result)) {
                return result;
            } else {
                throw new Error("Les données retournées ne sont pas dans le format attendu.");
            }
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de valider la maintenance");
        }
    },

    createStock: async (
        parent: any,
        {
            name,
            cost,
            quantity,
        }: {
            name: string
            cost: number
            quantity: number
        }
    ): Promise<any> => {
        const _method = "CREATE_STOCK";
        try {
            const response = await fetch("http://prisma:3000/stock", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, cost, quantity, _method}),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const result: unknown = await response.json();
            return result;
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de créer le produit");
        }
    },
};

// Gardes de type pour vérifier les structures des objets
function isLoginResponse(data: any): data is LoginResponse {
    return typeof data.token === 'string' && data.user && typeof data.user === 'object';
}

function isUser(data: any): data is User {
    return typeof data.id === 'string' && typeof data.name === 'string' && typeof data.email === 'string';
}

function isMoto(data: any): data is Moto {
    return typeof data.id === 'string' && typeof data.model === 'string' && typeof data.registrationNumber === 'string' && typeof data.mileage === 'number' && typeof data.ownerId === 'string';
}

function isMaintenance(data: any): data is Maintenance {
    return typeof data.id === 'string' && data.year instanceof Date && typeof data.motoId === 'string' && typeof data.type === 'string' && typeof data.mileage === 'number';
}