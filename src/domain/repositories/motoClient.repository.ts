import { MotoClientModel } from '../../infrastructure/database/models/motoClient.model';
import { MotoTypeModel } from '../../infrastructure/database/models/motoType.model'; // Importer le modèle du type de moto
import { EntretienModel } from '../../infrastructure/database/models/entretien.model'; // Importer le modèle de l'entretien
import { MotoClient } from '../entities/motoClient.entity';
import { MotoType } from '../entities/motoType.entity';
import { Entretien } from '../entities/entretien.entity';

export interface InterfaceMotoClientRepository {
  findById(id: number): Promise<MotoClient | null>;
  getMotoType(id: number): Promise<MotoType | null>;
}

export class MotoClientRepository implements InterfaceMotoClientRepository {
  // Recherche d'une moto client par son ID
  async findById(id: number): Promise<MotoClient | null> {
    // Utilisation de Sequelize pour trouver le client par son ID
    const motoClient = await MotoClientModel.findByPk(id, {
      include: [
        { model: MotoTypeModel, as: 'motoType' }, // Inclure le type de moto
        { model: EntretienModel, as: 'entretiens' }, // Inclure les entretiens associés
      ],
    });

    if (!motoClient) return null;

    // Retourner une instance de l'entité MotoClient avec les données récupérées
    const entretiens = motoClient.entretiens ? motoClient.entretiens.map((entretien: EntretienModel) => new Entretien(
        entretien.id,
        entretien.motoClientId,
        entretien.type,
        entretien.date, 
        entretien.kilometrage, 
        )) : [];
    
    return new MotoClient(motoClient.id, motoClient.motoTypeId, motoClient.kilometrage, entretiens);
  }

  // Recherche du type de moto par ID
  async getMotoType(id: number): Promise<MotoType | null> {
    const motoType = await MotoTypeModel.findByPk(id);
    if (!motoType) return null;
    return new MotoType(motoType.id, motoType.marque, motoType.modele, motoType.maintenanceIntervalKm, motoType.maintenanceIntervalTime);
  }
}
