import { UserRepository } from "@projet-clean/prisma/src/repositories/UserRepository.js";
import { UserType } from "../entities/UserType.js";

export class GetUsers {
    constructor(private userRepository: UserRepository) {}

    async execute(): Promise<UserType[]> {
        return this.userRepository.getAllUsers();
    }
}

// Attention PAS IMPORTER INFRASTRUCTURE OU APPLICATION DANS LE DOMAIN NICO !!!!!

// DOMAINE => COEUR => Niveau 0
// APPLICATION => CERVEAU => NIVEAU 1
// INFRASTRUCTURE => CORPS => NIVEAU 2

// On peut toujours descendre de niveau mais pas en monter = REGLE POUR LES IMPORTS
