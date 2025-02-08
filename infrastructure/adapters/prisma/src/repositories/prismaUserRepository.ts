import { PrismaClient } from "@prisma/client";
import UserRepository from "@projet-clean/domain/repositories/UserRepository.js";
import type { UserType } from "@projet-clean/domain/entities/UserType.js";

const prisma = new PrismaClient();
interface payloadUser {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
}

export default class PrismaUserRepository implements UserRepository {
    async getUsers(payloadUser: payloadUser): Promise<User[]> {
        const users = await prisma.user.findMany({
            where: payloadUser,
        });
        return users;
    }

    async createUser(data: { name: string; email: string; password: string }): Promise<User> {
        const user = await prisma.user.create({
            data,
        });
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        return user;
    }
}
