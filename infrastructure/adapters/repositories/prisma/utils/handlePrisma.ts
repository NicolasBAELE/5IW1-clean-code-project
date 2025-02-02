export const withPrisma = async (prisma, handler, req, res, next) => {
    try {
        await handler(req, res, next, prisma);
    } catch (error) {
        console.error("Erreur dans le handler :", error);
        res.status(500).json({ error: "Erreur interne du serveur." });
    } finally {
        await prisma.$disconnect();
    }
};
