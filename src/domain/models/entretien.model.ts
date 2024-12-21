import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';
import { Moto } from './moto.model';

// Définir l'interface des attributs de Entretien
interface EntretienAttributes {
  id: number;
  motoId: number;
  type: string;
  description: string;
  date: Date; // Utilisation de Date pour le champ 'date'
}

// Définir les attributs nécessaires à la création (sans l'ID qui est auto-généré)
interface EntretienCreationAttributes extends Optional<EntretienAttributes, 'id'> {}

export class Entretien extends Model<EntretienAttributes, EntretienCreationAttributes> {
  public id!: number;
  public motoId!: number;
  public type!: string;
  public description!: string;
  public date!: Date; // Utilisation de Date ici

  // Timestamps automatiques
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialisation du modèle
Entretien.init(
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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE, // Utilisation du type DATE dans Sequelize
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'entretiens',
    modelName: 'Entretien', // C'est une bonne pratique de définir le nom du modèle
  }
);

// Définition des relations
Entretien.belongsTo(Moto, { foreignKey: 'motoId', as: 'moto' });
