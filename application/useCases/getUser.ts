import UserRepository from "@projet-clean/domain/repositories/UserRepository.js";
import { User } from "@projet-clean/domain/entities/User.js";

interface PayloadUser {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
}

export default class GetUsersUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(payloadUser: PayloadUser): Promise<User[]> {
        return this.userRepository.getUsers(payloadUser);
    }
}
