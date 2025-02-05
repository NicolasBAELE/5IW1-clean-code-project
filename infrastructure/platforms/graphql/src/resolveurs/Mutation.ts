import {User} from "@projet-clean/domain/entities/User.js";

interface LoginResponse {
    token: string;
    user: User;
}

export const Mutation = {
    // createUser: async (parent: any, { name, email, password }: { name: string; email: string; password: string }): Promise<User> => {
    //     const _method = "POST_REGISTER";
    //     try {
    //         const response = await fetch("http://prisma:3000/users", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ name, email, password, _method }),
    //         });
    //
    //         if (!response.ok) {
    //             throw new Error(`Erreur HTTP : ${response.status}`);
    //         }
    //
    //         const result: User = await response.json();
    //         return result;
    //     } catch (error) {
    //         console.error(error);
    //         throw new Error("Impossible de créer l'utilisateur");
    //     }
    // },

    login: async (parent: any, {email, password}: { email: string; password: string }): Promise<LoginResponse> => {
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
            console.log(result)
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
    createMoto: async (parent: any, {model, registrationNumber, mileage, ownerId}: {
        model: string,
        registrationNumber: string,
        mileage: number,
        ownerId: string
    }) => {
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
            console.log({result})
            return result;
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de se connecter");
        }
    },
};

function isLoginResponse(data: any): data is LoginResponse {
    return typeof data.token === 'string'
        && data.user
        && typeof data.user === 'object';
}
