// infrastructure/database/models/entretien.model.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database'; // L'instance Sequelize
import { MotoClientModel } from './motoClient.model'; // Import du modèle MotoClient

export class EntretienModel extends Model {
  public id!: number;
  public motoClientId!: number; // Clé étrangère vers MotoClient
  public kilometrage!: number;
  public date!: Date;
  public type!: 'Préventif' | 'Curatif'; // Par exemple : "curatif" ou "préventif"
}

EntretienModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Auto-incrémentation de l'ID
    },
    motoClientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: MotoClientModel, // Référence au modèle MotoClient
        key: 'id',              // Référence sur la clé primaire de MotoClient
      },
    },
    kilometrage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Instance de Sequelize
    tableName: 'entretiens', // Nom de la table dans la base de données
    timestamps: false, // Pas de timestamps
  }
);

// Définir la relation entre Entretien et MotoClient
EntretienModel.belongsTo(MotoClientModel, {
  foreignKey: 'motoClientId', // Clé étrangère dans Entretien
  as: 'motoClient',           // Alias pour l'inclusion dans les requêtes
});
