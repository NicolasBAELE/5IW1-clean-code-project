import { UserType } from "@projet-clean/domain/entities/UserType.js";
import { MotoType } from "@projet-clean/domain/entities/MotoType.js";
import { Maintenance } from "@projet-clean/domain/entities/Maintenance.js";

export const Mutation = {
    createUser: async (
        parent: UserType,
        { name, email, password, role }: { name: string; email: string; password?: string; role?: string }
    ): Promise<unknown> => {
        const _method = "POST_REGISTER";
        try {
            const response = await fetch("http://prisma:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password, role, _method }),
            });

            return await response.json();
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de créer l'utilisateur");
        }
    },

    resetPassword: async (parent: UserType, { email, password }: { email: string; password?: string }) => {
        const _method = "RESET_PASSWORD";
        try {
            const response = await fetch("http://prisma:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, _method }),
            });

            return await response.json();
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de réinitialiser le mot de passe");
        }
    },

    login: async (parent: UserType, { email, password }: { email: string; password: string }) => {
        const _method = "POST_LOGIN";
        try {
            const response = await fetch("http://prisma:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, _method }),
            });
            return await response.json();
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de se connecter");
        }
    },

    createMoto: async (
        parent: MotoType,
        {
            model,
            registrationNumber,
            mileage,
            ownerId,
        }: {
            model: string;
            registrationNumber: string;
            mileage: number;
            ownerId: string;
        }
    ): Promise<MotoType> => {
        const _method = "POST";
        try {
            const response = await fetch("http://prisma:3000/moto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ model, registrationNumber, mileage, ownerId, _method }),
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
        {
            year,
            motoId,
            type,
            mileage,
            products,
        }: {
            motoId: string;
            year: Date;
            type: string;
            mileage: number;
            products: { id: string; quantity: number }[];
        }
    ): Promise<Maintenance> => {
        const _method = "CREATE_MAINTENANCE";
        try {
            const response = await fetch("http://prisma:3000/maintenance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ year, motoId, type, mileage, products, _method }),
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
        { maintenanceId, mileage }: { maintenanceId: string; mileage: number }
    ): Promise<Maintenance> => {
        const _method = "VALIDATE_MAINTENANCE";
        try {
            const response = await fetch("http://prisma:3000/maintenance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ maintenanceId, mileage, _method }),
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
            name: string;
            cost: number;
            quantity: number;
        }
    ): Promise<any> => {
        const _method = "CREATE_STOCK";
        try {
            const response = await fetch("http://prisma:3000/stock", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, cost, quantity, _method }),
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

function isMoto(data: any): data is MotoType {
    return (
        typeof data.id === "string" &&
        typeof data.model === "string" &&
        typeof data.registrationNumber === "string" &&
        typeof data.mileage === "number" &&
        typeof data.ownerId === "string"
    );
}

function isMaintenance(data: any): data is Maintenance {
    return (
        typeof data.id === "string" &&
        typeof data.scheduledDate === "string" &&
        typeof data.motoId === "string" &&
        typeof data.type === "string"
    );
}
