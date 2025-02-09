import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.SECRET_KEY_JWT;

export const authMiddleware = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Accès non autorisé, token manquant." });
    }

    const token = authHeader.split(" ")[1]; // Extraction du token
    try {
        if (!JWT_SECRET) {
            throw new Error("No vérification possible");
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        req.body.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalide ou expiré." });
    }
};
