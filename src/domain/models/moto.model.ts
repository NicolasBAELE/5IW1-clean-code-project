import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';
import { Entretien } from './entretien.model';
import { Panne } from './panne.model';

// Définir l'interface des attributs de Moto
interface MotoAttributes {
  id: number;
  marque: string;
  modele: string;
  annee: number;
  kilometrage: number;
}

// Définir les attributs nécessaires à la création (sans l'ID qui est auto-généré)
interface MotoCreationAttributes extends Optional<MotoAttributes, 'id'> {}

export class Moto extends Model<MotoAttributes, MotoCreationAttributes> {
  public id!: number;
  public marque!: string;
  public modele!: string;
  public annee!: number;
  public kilometrage!: number;

  // Relations
  public readonly entretiens?: Entretien[];
  public readonly pannes?: Panne[];

  // Timestamps automatiques
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialisation du modèle
Moto.init(
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
    annee: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    kilometrage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'motos',
    modelName: 'Moto', // Nom du modèle
  }
);

// Définition des relations
Moto.hasMany(Entretien, { foreignKey: 'motoId', as: 'entretiens' });
Moto.hasMany(Panne, { foreignKey: 'motoId', as: 'pannes' });
