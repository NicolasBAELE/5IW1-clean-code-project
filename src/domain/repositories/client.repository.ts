import { Client } from "../entities/client.entity";

export interface ConducteurRepository {
  findById(id: string): Promise<Client | null>;
  save(conducteur: Client): Promise<void>;
}
