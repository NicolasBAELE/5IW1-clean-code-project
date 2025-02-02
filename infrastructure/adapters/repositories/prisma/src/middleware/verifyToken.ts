import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.SECRET_KEY_JWT;

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Accès non autorisé, token manquant." });
    }

    const token = authHeader.split(" ")[1]; // Extraction du token

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Ajoute l'utilisateur décodé à la requête
        next(); // Passe à la suite
    } catch (error) {
        return res.status(401).json({ message: "Token invalide ou expiré." });
    }
};
