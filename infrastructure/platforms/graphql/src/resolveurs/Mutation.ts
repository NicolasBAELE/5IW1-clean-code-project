import { CreateUser } from "@projet-clean/domain/useCases/createUser.js";

export const Mutation = {
    createUser: async (_: any, { name, email }: { name: string; email: string }) => {},
};
