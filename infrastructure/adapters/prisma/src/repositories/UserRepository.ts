import {UserType} from "@projet-clean/domain/entities/UserType.js";

export interface UserRepository {
    getAllUsers(): Promise<UserType[]>;

    createUser(data: { name: string; email: string }): Promise<UserType>;
}
