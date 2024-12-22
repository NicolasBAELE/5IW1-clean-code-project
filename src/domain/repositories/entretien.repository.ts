// domain/repositories/EntretienRepository.ts
import { Entretien } from '../entities/entretien.entity'; // Entité Entretien

export interface EntretienRepository {
  getEntretienByMotoClientId(motoClientId: number): Promise<Entretien[]>;  // Récupère tous les entretiens pour une moto client donnée
  createEntretien(entretien: Entretien): Promise<Entretien>;  // Crée un nouvel entretien
}
