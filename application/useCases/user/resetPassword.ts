import UserRepository from "@projet-clean/domain/repositories/UserRepository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {UserType} from "@projet-clean/domain/entities/UserType.js";

const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT!;
const SALT_ROUNDS = 5;

export default class ResetPasswordUseCase {
    constructor(private userRepository: UserRepository) {
    }

    async execute(data: {
        email: string;
        password: string;
    }): Promise<{ user: UserType; token: string; message: string }> {
        const {email, password} = data;

        if (!email || !password) {
            throw new Error("Email et mot de passe requis");
        }
        const existingUser = this.userRepository.findByEmail(email);

        if (!existingUser) {
            throw new Error("Cet utilisateur n'existe pas")
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await this.userRepository.resetPassword({email, password: hashedPassword})

        const token = jwt.sign(
            {id: user.id, name: user.name, email: user.email, role: user.role},
            SECRET_KEY_JWT,
            {expiresIn: '1h'}
        );

        return {
            user,
            token,
            message: "Mot de passe modifié avec succès",
        };
    }
}
