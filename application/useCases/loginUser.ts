import UserRepository from "@projet-clean/domain/repositories/UserRepository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT!;

export default class LoginUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(email: string, password: string): Promise<{ token: string; message: string }> {
        if (!email || !password) {
            throw new Error("Email et mot de passe requis");
        }

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("Email ou mot de passe incorrect");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Email ou mot de passe incorrect");
        }

        const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, SECRET_KEY_JWT, {
            expiresIn: "1h",
        });

        return { token, message: "Authentification réussie" };
    }
}
