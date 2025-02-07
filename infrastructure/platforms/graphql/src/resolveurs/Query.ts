import {User} from "@projet-clean/domain/entities/User.js";

export const Query = {
    getUsers: async (parent: any, {payloadUser}: { payloadUser: User }, context: any, info: any): Promise<User[]> => {
        const _method = "POST";
        try {
            const response = await fetch("http://prisma:3000/users", {
                method: _method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({payloadUser, _method})
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const users: unknown = await response.json();
            if (Array.isArray(users) && users.every(user => isValidUser(user))) {
                return users;
            } else {
                throw new Error('Les données retournées ne sont pas dans le format attendu.');
            }
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de récupérer les utilisateurs");
        }
    },
    getAllMotos: async (parent: any, args: { motoId?: string }) => {
        try {
            const response = await fetch("http://prisma:3000/moto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    motoId: args.motoId,
                    _method: "GET_MOTOS",
                }),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error("❌ Erreur dans getAllMotos:", error);
            throw new Error("Impossible de récupérer les motos");
        }
    },
    getAllStocks: async (
        parent: any,
        {}: {}
    ): Promise<any> => {
        const _method = "GET_STOCKS";
        try {
            const response = await fetch("http://prisma:3000/stock", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({_method}),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const result: unknown = await response.json();
            return result;
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de récupérer les produits");
        }
    },
};

function isValidUser(user: any): user is User {
    return typeof user.id === 'string' &&
        typeof user.name === 'string' &&
        typeof user.email === 'string' &&
        typeof user.password === 'string' &&
        user.createdAt instanceof Date &&
        user.updatedAt instanceof Date;
}
