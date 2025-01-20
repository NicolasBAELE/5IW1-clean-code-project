import { PrismaClient } from "@prisma/client";
import { UserRepository } from "./UserRepository";
import { User } from "@projet-clean/domain/entities/User";

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository {
    async getAllUsers(): Promise<User[]> {
        const users = await prisma.user.findMany();
        return users.map((u) => new User(u.id, u.name, u.email));
    }

    async createUser(data: { name: string; email: string }): Promise<User> {
        const user = await prisma.user.create({
            data,
        });
        return new User(user.id, user.name, user.email);
    }
}
