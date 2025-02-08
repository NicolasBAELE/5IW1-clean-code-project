import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";
import {PrismaClient} from '@prisma/client';

const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;
const SALT_ROUNDS = 5

export const getUsers = async (req: Request, res: Response, next: NextFunction, prisma: PrismaClient) => {
    const allUsers = await prisma.user.findMany({
        where: {id: req.body.userId},
        include: {
            motos: {
                include: {
                    maintenances: true,
                },
            }
        },
    },)
    res.status(200).json(allUsers);
};

export const createUser = async (req: Request, res: Response, next: NextFunction, prisma: PrismaClient) => {
    const {name, email, password, role} = req.body;

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
            name: name,
            role: role,
        }
    });
    const token = jwt.sign(
        {id: user.id, name: user.name, email: user.email, role: user.role},
        SECRET_KEY_JWT,
        {expiresIn: '1h'}
    );

    res.status(201).json({
        user,
        token,
        message: "Compte créé avec succès",
        status: "created",
    });
}

export const resetPassword = async (req: Request, res: Response, next: NextFunction, prisma: PrismaClient) => {
    const { email, password} = req.body;

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
            message: "Cet utilisateur n'existe pas"
        })
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.update({
        where: {
            email: email
        },
        data: {
            password: hashedPassword,
        }
    });
    const token = jwt.sign(
        {id: user.id, name: user.name, email: user.email, role: user.role},
        SECRET_KEY_JWT,
        {expiresIn: '1h'}
    );

    res.status(201).json({
        user,
        token,
        message: "Compte créé avec succès",
        status: "created",
    });
}


export const loginUser = async (req: Request, res: Response, next: NextFunction, prisma: PrismaClient) => {
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