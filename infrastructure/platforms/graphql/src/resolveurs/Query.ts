import {User} from "@projet-clean/domain/entities/User"

export const Query = {
    getUsers: async (parent, {payloadUser}, context, info) => {
        const _method = "GET"
        try {
            const response = await fetch("http://prisma:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({payloadUser, _method})
            });
            const users: [User] = await response.json();
            return users;
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de récupérer les utilisateurs");
        }
    },
};
