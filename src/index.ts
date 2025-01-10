import express from 'express';
import path from 'path';
import { startGraphQLServer } from './application/graphql/server'; // Votre serveur GraphQL

const app = express();

// Servir les fichiers statiques (index.html, etc.) depuis le répertoire 'public' (ou un autre dossier de votre choix)
app.use(express.static(path.join(__dirname, 'public')));

// Vous pouvez aussi définir d'autres routes comme /graphql pour votre API GraphQL
app.post('/graphql', (req, res) => {
  // Votre logique GraphQL ici
});

// Lancer votre serveur GraphQL
startGraphQLServer().catch(console.error);

// Démarrer le serveur Express pour servir les fichiers HTML
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
