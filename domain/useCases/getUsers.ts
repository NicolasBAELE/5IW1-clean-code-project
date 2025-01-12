import { User } from "../entities/User";
import { UserRepository } from "../../infrastructure/adapters/repositories/prisma/repositories/UserRepository";

export class GetUsers {
    constructor(private userRepository: UserRepository) {}

    async execute(): Promise<User[]> {
        return this.userRepository.getAllUsers();
    }
}
