import { GetUsers } from "../../../../domain/useCases/getUsers";
import { PrismaUserRepository } from "../../../adapters/repositories/prisma/repositories/prismaUserRepository";

const userRepository = new PrismaUserRepository();
const getUsers = new GetUsers(userRepository);

export const Query = {
    users: async () => {
        return getUsers.execute();
    },
};
