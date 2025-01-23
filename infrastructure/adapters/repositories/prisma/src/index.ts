import express from "express";
import { PrismaClient } from '@prisma/client'

const app = express();
const port = 3000;

const prisma = new PrismaClient({log : ['query', 'info', 'warn', 'error'],
});

app.get("/motos", (req, res) => {
    async function main() {
        try {
            // Requête pour récupérer les motos
            const allMotos = await prisma.moto.findMany({
                take: 10, // Limite à 10 résultats
            });

            // Envoyer les résultats au client
            res.status(200).json(allMotos);
        } catch (error) {
            // Gérer les erreurs et envoyer une réponse appropriée
            console.error("Erreur lors de la récupération des motos :", error);
            res.status(500).json({ error: "Erreur lors de la récupération des motos." });
        }
    }

    // Exécuter la fonction main() et gérer la déconnexion
    main()
        .then(async () => {
            await prisma.$disconnect();
        })
        .catch(async (e) => {
            console.error("Erreur fatale :", e);
            await prisma.$disconnect();
            process.exit(1); // Quitte le processus en cas d'erreur critique
        });
});

app.listen(port, () => {
    console.log(`🚀 Prisma app ready at http://localhost:${port}`);
});
