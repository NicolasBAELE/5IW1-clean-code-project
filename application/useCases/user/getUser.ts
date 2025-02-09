import UserRepository from "@projet-clean/domain/repositories/UserRepository.js";
import {UserType} from "@projet-clean/domain/entities/UserType.js";

interface PayloadUser {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
}

export default class GetUsersUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(payloadUser: PayloadUser): Promise<UserType[]> {
        return this.userRepository.getUsers(payloadUser);
    }
}
