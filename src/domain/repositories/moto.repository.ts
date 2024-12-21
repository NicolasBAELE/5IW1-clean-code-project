import { Moto } from "../entities/moto.entity";

export interface MotoRepository {
  findById(id: string): Promise<Moto | null>;
  save(moto: Moto): Promise<void>;
  update(moto: Moto): Promise<void>;
}
