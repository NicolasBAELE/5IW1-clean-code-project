import { User } from "../../../../../domain/entities/User";

export interface UserRepository {
    getAllUsers(): Promise<User[]>;
    createUser(data: { name: string; email: string }): Promise<User>;
}
