import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT), 
  username: process.env.DB_USER, 
  password: process.env.DB_PASSWORD,  
  database: process.env.DB_NAME,  
});

export async function initializeDatabase() {
    try {
      // Vérifier la connexion à la base de données
      await sequelize.authenticate();
      console.log('La connexion à la base de données a été établie avec succès.');
  
      await sequelize.sync({ force: true }); // Utilisez force: true seulement en développement
      console.log('Base de données synchronisée!');
      
      const tables = await sequelize.getQueryInterface().showAllTables();
      console.log('Tables dans la base de données:', tables);
    } catch (error) {
      console.error('Erreur lors de la synchronisation de la base de données:', error);
    }
}

export default sequelize;
