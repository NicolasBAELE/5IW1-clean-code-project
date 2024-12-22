import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../../config/database';

interface MotoTypeAttributes {
  id: number;
  marque: string;
  modele: string;
  maintenanceIntervalKm: number;
  maintenanceIntervalTime: number; // En mois
}

interface MotoTypeCreationAttributes extends Optional<MotoTypeAttributes, 'id'> {}

export class MotoTypeModel extends Model<MotoTypeAttributes, MotoTypeCreationAttributes> {
  public id!: number;
  public marque!: string;
  public modele!: string;
  public maintenanceIntervalKm!: number;
  public maintenanceIntervalTime!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MotoTypeModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    marque: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modele: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maintenanceIntervalKm: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maintenanceIntervalTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'moto_types',
    schema: 'public',
    modelName: 'MotoType',
  }
);
