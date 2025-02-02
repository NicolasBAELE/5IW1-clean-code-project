import express from "express";
import {PrismaClient} from '@prisma/client'
import {withPrisma} from "../utils/handlePrisma.js";
import {createUser, getUsers, loginUser} from "../routes/users.js";
import {authMiddleware} from "./middleware/verifyToken.js";

const app = express();
app.use(express.json());
const port = 3000;

const prisma = new PrismaClient({log: ['query', 'info', 'warn', 'error']});

app.get("/verify-token", authMiddleware)

app.post('/users', async (req, res, next) => {
    const {_method} = req.body;
    if (_method === 'GET') {
        return withPrisma(prisma, getUsers, req, res, next);
    } else if (_method === 'POST_LOGIN') {
        return withPrisma(prisma, loginUser, req, res, next);
    } else if (_method === 'POST_REGISTER') {
        return withPrisma(prisma, createUser, req, res, next);
    } else if (_method === 'DELETE') {
        // return deleteUser(req, res, data);
    } else {
        return res.status(400).json({message: 'Méthode invalide'});
    }
});

app.listen(port, () => {
    console.log(`🚀 Prisma app ready at http://localhost:${port}`);
});


