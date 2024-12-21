import express from 'express';
import { maintenanceRoutes } from './routes/maintenanceRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Ajout des routes
app.use('/', maintenanceRoutes);

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
