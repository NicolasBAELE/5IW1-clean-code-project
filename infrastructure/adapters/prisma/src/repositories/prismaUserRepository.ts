import {PrismaClient} from "@prisma/client";
import UserRepository from "@projet-clean/domain/repositories/UserRepository.js";
import type {UserType} from "@projet-clean/domain/entities/UserType.js";

const prisma = new PrismaClient();

interface payloadUser {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
}

export default class PrismaUserRepository implements UserRepository {
    async getUsers(payloadUser: payloadUser): Promise<UserType[]> {
        const users = await prisma.user.findMany({
            where: payloadUser,
            include: {
                motos: {
                    include: {
                        owner: true,
                        maintenances: true,
                    },
                },
            },
        });
        return users;
    }

    async createUser(data: { name: string; email: string; password: string }): Promise<UserType> {
        const user = await prisma.user.create({
            data,
        });
        return user;
    }

    async resetPassword(data: { email: string; password: string }): Promise<UserType> {
        const user = await prisma.user.update({
            where: {email: data.email},
            data : {password: data.password},
        });
        return user;
    }

    async findByEmail(email: string): Promise<UserType | null> {
        const user = await prisma.user.findUnique({
            where: {email},
        });

        return user;
    }
}
