import { Sequelize } from "sequelize";
import sequelize from "../../config/database";
import motoClientSeed from "./motoClient.seed";
import motoTypeSeed from "./motoType.seed";
import entretienSeed from "./entretien.seed";

// Exécuter le seeder
async function runSeeder() {
    try {
      console.log('Début de l\'exécution du seeder...');
  
      // Vérifier la connexion à la base de données
      await sequelize.authenticate();
      console.log('Connexion réussie à la base de données');
  
      // Créer une instance de QueryInterface
      const queryInterface = sequelize.getQueryInterface();
  
      // Exécuter l'up du seeder
      await motoTypeSeed.up(queryInterface, Sequelize);
      await motoClientSeed.up(queryInterface, Sequelize);
      await entretienSeed.up(queryInterface, Sequelize);
  
      console.log('Seeder exécuté avec succès!');
    } catch (error) {
      console.error('Erreur lors de l\'exécution du seeder:', error);
    } finally {
      // Fermer la connexion après l'exécution du seeder
      await sequelize.close();
    }
  }
  
  // Exécuter le seeder
  runSeeder();