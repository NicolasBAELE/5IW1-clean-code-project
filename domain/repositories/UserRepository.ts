import { User } from "@projet-clean/domain/entities/User.js";

interface payloadUser {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
}

export default interface UserRepository {
    getUsers(payloadUser: payloadUser): Promise<User[]>;
    createUser(data: { name: string; email: string; password: string }): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}
