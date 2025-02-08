// import { PrismaClient } from "@prisma/client";
// import { UserRepository } from "./UserRepository.js";
// import {UserType} from "@projet-clean/domain/entities/UserType.js";
//
// const prisma = new PrismaClient();
//
// export class PrismaUserRepository implements UserRepository {
//     async getAllUsers(): Promise<UserType[]> {
//         const users = await prisma.user.findMany();
//         return users.map((u) => new UserType(u.id, u.name, u.email));
//     }
//
//     async createUser(data: { name: string; email: string }): Promise<UserType> {
//         const user = await prisma.user.create({
//             data,
//         });
//         return new UserType(user.id, user.name, user.email);
//     }
// }
