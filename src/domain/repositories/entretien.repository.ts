import { Entretien } from "../entities/entretien.entity";

export interface EntretienRepository {
  save(entretien: Entretien): Promise<void>;
  findByMotoId(motoId: string): Promise<Entretien[]>;
}
