import { User } from "../entities/User";
import { UserRepository } from "../../infrastructure/adapters/repositories/prisma/repositories/UserRepository";

export class CreateUser {
    constructor(private userRepository: UserRepository) {}

    async execute(name: string, email: string): Promise<User> {
        return this.userRepository.createUser({ name, email });
    }
}
