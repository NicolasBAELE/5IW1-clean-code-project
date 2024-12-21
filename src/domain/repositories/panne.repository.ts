import { Panne } from "../entities/panne.entity";

export interface PanneRepository {
  save(panne: Panne): Promise<void>;
  findByMotoId(motoId: string): Promise<Panne[]>;
  findById(id: string): Promise<Panne | null>;
}
