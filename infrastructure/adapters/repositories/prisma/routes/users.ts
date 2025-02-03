import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;
const SALT_ROUNDS = 5

export const getUsers = async (req, res, next, prisma) => {
    const allUsers = await prisma.user.findMany(
        {where: req.body.payloadUser}
    )
    res.status(200).json(allUsers);
};

export const createUser = async (req, res, next, prisma) => {
    const {name, email, password} = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({
            status: "error",
            message: "Email et mot de passe requis"
        });
    }
    const existingUser = await prisma.user.findUnique({
        where: {email}
    });

    if (existingUser) {
        return res.status(400).json({
            status: "error",
            message: "Souhaitez-vous réinitialiser votre mot de passe ?"
        })
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.create({
        data: {
            email: email,
            password: hashedPassword,
            name: name
        }
    });
    const token = jwt.sign(
        {id: user.id, name: user.name, email: user.email, role: user.role},
        SECRET_KEY_JWT,
        {expiresIn: '1h'}
    );

    res.status(201).json({
        user: {
            name: user.name,
            email: user.email,
        },
        token,
        message: "Compte créé avec succès",
        status: "created",
    });
}


export const loginUser = async (req, res, next, prisma) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: "error",
            message: "Email et mot de passe requis"
        });
    }

    const existingUser = await prisma.user.findUnique({
        where: {email}
    });

    if (!existingUser) {
        return res.status(400).json({
            status: "error",
            message: "Email et mot de passe invalides"
        });
    }
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
        return res.status(401).json({
            status: "error",
            message: "Email ou mot de passe incorrect"
        });
    }
    const token = jwt.sign(
        {id: existingUser.id, name: existingUser.name, email: existingUser.email, role: existingUser.role},
        SECRET_KEY_JWT,
        {expiresIn: '1h'}
    );
    return res.status(200).json({
        user: {
            name: existingUser.name,
        },
        token: token,
        status: "connected",
        message: "Authentification réussie"
    });
}