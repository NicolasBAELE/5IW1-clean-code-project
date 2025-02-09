import {UserType} from "../entities/UserType.js";

interface payloadUser {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
}

export default interface UserRepository {
    getUsers(payloadUser: payloadUser): Promise<UserType[]>;
    createUser(data: { name: string; email: string; password: string, role?: string }): Promise<UserType>;
    resetPassword(data: { email: string; password: string, role?: string }): Promise<UserType>;
    findByEmail(email: string): Promise<UserType | null>;
}
