// domain/usecases/GetProchainEntretien.ts
import { MotoClientRepository } from '../repositories/motoClient.repository';
import { MotoClient, ProchainEntretien } from '../entities/motoClient.entity';
import { MotoType } from '../entities/motoType.entity';

export class GetProchainEntretien {
  constructor(private motoClientRepository: MotoClientRepository) {}

  // Fonction principale pour récupérer le prochain entretien
  async execute(motoClientId: number): Promise<ProchainEntretien | { message: string }> {
    const motoClient = await this.getMotoClientById(motoClientId);
    const motoType = await this.getMotoTypeById(motoClient.motoTypeId);

    const prochainEntretien = motoClient.getProchainEntretien(motoType);

    return prochainEntretien;
  }

  // Récupère une moto client par son ID
  private async getMotoClientById(motoClientId: number): Promise<MotoClient> {
    const motoClient = await this.motoClientRepository.findById(motoClientId);

    if (!motoClient) {
      throw new Error('Moto client introuvable');
    }

    return motoClient;
  }

  // Récupère le type de la moto par ID
  private async getMotoTypeById(motoTypeId: number): Promise<MotoType> {
    const motoType = await this.motoClientRepository.getMotoType(motoTypeId);

    if (!motoType) {
      throw new Error('Type de moto introuvable');
    }

    return motoType;
  }
}
