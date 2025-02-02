export const Mutation = {
    createUser: async (parent, {name, email, password}) => {
        const _method = "POST_REGISTER"
        try {
            const response = await fetch("http://prisma:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name, email, password, _method})
            });
            return await response.json();
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de récupérer les utilisateurs");
        }
    }

};
