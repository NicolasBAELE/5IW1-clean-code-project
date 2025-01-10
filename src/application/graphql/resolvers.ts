import { GetUsersUseCase } from "../../domain/usecases/GetUsersUseCase";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { prismaClient } from "../../../infrastructure/prisma/prismaClient";

// Création de l'instance de UserRepository
const userRepository = new UserRepository(prismaClient);
// Création de l'instance du cas d'utilisation
const getUsersUseCase = new GetUsersUseCase(userRepository);

export const resolvers = {
    Query: {
        users: async () => {
            return await getUsersUseCase.execute();
        },
    },
};
