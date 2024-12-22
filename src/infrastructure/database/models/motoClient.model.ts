// infrastructure/database/models/motoClient.model.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database'; // L'instance Sequelize
import { MotoTypeModel } from './motoType.model'; // Import du modèle de type de moto
import { EntretienModel } from './entretien.model'; // Import du modèle d'entretien

export class MotoClientModel extends Model {
  public id!: number;
  public motoTypeId!: number;
  public kilometrage!: number;
  public motoType?: MotoTypeModel; // Associe un objet de type MotoType
  public entretiens?: EntretienModel[]; 

  // Cette méthode définit la relation entre MotoClient et MotoType/Entretien
  static associate() {
    // Associer MotoClient à MotoType (relatif à motoTypeId)
    MotoClientModel.belongsTo(MotoTypeModel, {
      foreignKey: 'motoTypeId', // Clé étrangère
      as: 'motoType',           // Alias pour l'inclusion
    });

    // Associer MotoClient à Entretien (un client a plusieurs entretiens)
    MotoClientModel.hasMany(EntretienModel, {
      foreignKey: 'motoClientId', // Clé étrangère
      as: 'entretiens',           // Alias pour l'inclusion
    });
  }
}

// Initialisation du modèle MotoClient
MotoClientModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Auto-incrémentation de l'ID
    },
    motoTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: MotoTypeModel,  // Référence au modèle MotoType
        key: 'id',             // Référence sur la clé primaire de MotoType
      },
    },
    kilometrage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize, // Instance de Sequelize
    tableName: 'motoClients', // Nom de la table dans la base de données
    timestamps: false, // Désactiver les timestamps
  }
);

MotoClientModel.associate(); 
