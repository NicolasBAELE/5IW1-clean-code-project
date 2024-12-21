import express from 'express';
import { maintenanceRoutes } from './routes';
import sequelize from '../../config/database';
import path from 'path'; // Import de path pour accéder aux fichiers statiques

async function initializeDatabase() {
  try {
    // Synchroniser tous les modèles avec la base de données (création des tables)
    await sequelize.sync({ force: true }); // Utilisez `force: true` pour recréer les tables à chaque démarrage, à utiliser en développement
    console.log('Base de données synchronisée!');
  } catch (error) {
    console.error('Erreur lors de la synchronisation de la base de données:', error);
  }
}

initializeDatabase();

const app = express();
const PORT = process.env.PORT || 3000;

// Utilisation de JSON dans les requêtes
app.use(express.json());

// Routes pour la gestion de la maintenance
app.use('/maintenance', maintenanceRoutes);

// Ajouter un middleware pour servir votre page d'accueil si une route n'est pas trouvée
app.use(express.static(path.join(__dirname, 'public'))); // Pour servir les fichiers statiques comme index.html

// Gestion des routes non définies (404)
app.use((req, res) => {
  // Rediriger vers index.html pour toute route non définie
  res.sendFile(path.resolve(__dirname, '../../../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
