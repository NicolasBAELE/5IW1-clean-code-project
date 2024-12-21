import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';
import { Moto } from './moto.model';

interface PanneAttributes {
  id: number;
  motoId: number;
  description: string;
  date: Date; // Utilisation de `Date` au lieu de `string`
}

interface PanneCreationAttributes extends Optional<PanneAttributes, 'id'> {}

export class Panne extends Model<PanneAttributes, PanneCreationAttributes> {
  public id!: number;
  public motoId!: number;
  public description!: string;
  public date!: Date; // Type explicite pour la date

  // Timestamps automatiques
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialisation du modèle
Panne.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    motoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE, // Utilisation de DATE pour stocker une vraie date
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'pannes',
    modelName: 'Panne',
  }
);

// Définition des relations
Panne.belongsTo(Moto, { foreignKey: 'motoId', as: 'moto' });
