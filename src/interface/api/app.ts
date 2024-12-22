import express from 'express';
import { maintenanceRoutes } from './routes';
import { initializeDatabase } from '../../config/database';
import path from 'path'; // Import de path pour accéder aux fichiers statiques
import dotenv from 'dotenv';

dotenv.config();
console.log("DB_HOST: ", process.env.DB_HOST);
console.log("DB_PORT: ", process.env.DB_PORT);
console.log("DB_USER: ", process.env.DB_USER);
console.log("DB_PASSWORD: ", process.env.DB_PASSWORD);
console.log("DB_NAME: ", process.env.DB_NAME);

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
