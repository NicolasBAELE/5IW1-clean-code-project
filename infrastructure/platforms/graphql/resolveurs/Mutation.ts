import { CreateUser } from "../../../../domain/useCases/createUser";
import { PrismaUserRepository } from "../../../adapters/repositories/prisma/repositories/prismaUserRepository";

const userRepository = new PrismaUserRepository();
const createUser = new CreateUser(userRepository);

export const Mutation = {
    createUser: async (_: any, { name, email }: { name: string; email: string }) => {
        return createUser.execute(name, email);
    },
};
