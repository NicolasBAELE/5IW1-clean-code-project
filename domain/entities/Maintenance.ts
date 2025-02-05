import {Moto} from "./Moto.js";
import {Reminder} from "./Reminder.js";

// Enumération des types de maintenance
export enum MaintenanceType {
    PREVENTIVE = "PREVENTIVE",  // Entretien préventif
    CURATIVE = "CURATIVE",      // Entretien curatif (réparation)
}

// Interface représentant un entretien
export interface Maintenance {
    id: string;                  // Identifiant unique de la maintenance
    motoId: string;              // Référence à la moto
    moto: Moto;                  // L'objet Moto associé à la maintenance
    type: MaintenanceType;       // Type d'entretien (préventif ou curatif)
    scheduledDate?: Date;        // Date prévue pour l'entretien (optionnelle)
    completedDate?: Date;        // Date de fin de l'entretien (optionnelle)
    mileageAtService?: number;   // Kilométrage de la moto au moment du service (optionnel)
    cost?: number;               // Coût associé à l'entretien (optionnel)
    notes?: string;              // Remarques ou notes sur l'entretien (optionnel)
    reminders: Reminder[];       // Liste des rappels liés à cet entretien
    createdAt: Date;             // Date de création de l'entretien
    updatedAt: Date;             // Date de mise à jour de l'entretien
}
