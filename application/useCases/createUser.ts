import UserRepository from "@projet-clean/domain/repositories/UserRepository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT!;
const SALT_ROUNDS = 5;

export default class CreateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(data: {
        name: string;
        email: string;
        password: string;
    }): Promise<{ token: string; message: string }> {
        const { name, email, password } = data;

        if (!email || !password || !name) {
            throw new Error("Email, nom et mot de passe requis.");
        }

        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error("Un utilisateur avec cet email existe déjà.");
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const user = await this.userRepository.createUser({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, SECRET_KEY_JWT, {
            expiresIn: "1h",
        });

        return { token, message: "Compte créé avec succès" };
    }
}
