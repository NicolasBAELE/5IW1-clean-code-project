import { User } from "../entities/User";
import { UserRepository } from "@projet-clean/prisma/src/repositories/UserRepository";

export class CreateUser {
    constructor(private userRepository: UserRepository) {}

    async execute(name: string, email: string): Promise<User> {
        return this.userRepository.createUser({ name, email });
    }
}

// Attention PAS IMPORTER INFRASTRUCTURE OU APPLICATION DANS LE DOMAIN NICO !!!!!

// DOMAINE => COEUR => Niveau 0
// APPLICATION => CERVEAU => NIVEAU 1
// INFRASTRUCTURE => CORPS => NIVEAU 2

// On peut toujours descendre de niveau mais pas en monter = REGLE POUR LES IMPORTS
