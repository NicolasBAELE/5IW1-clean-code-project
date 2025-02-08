import express from "express";
import {PrismaClient} from "@prisma/client";
import cors from "cors";

import {authMiddleware} from "./middleware/verifyToken.js";
import {createUser, getUsers, loginUser, resetPassword} from "./controllers/UserController.js";
import {createMaintenance, validateMaintenance} from "./repositories/maintenance.js";
import {createMoto, getAllMotos} from "./repositories/moto.js";
import {createStock, getAllStocks} from "./repositories/stock.js";
import {withPrisma} from "./utils/handlePrisma.js";

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:2000",
        methods: "GET,POST,PUT,DELETE",
        allowedHeaders: "Content-Type,Authorization",
    })
);
const port = 3000;

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

app.get("/verify-token", authMiddleware, (req, res) => {
    res.json(req.user);
});

app.post("/users", async (req, res, next) => {
    const { _method } = req.body;
    if (_method === "GET") {
        return getUsers(req, res);
    } else if (_method === "POST_LOGIN") {
        return loginUser(req, res);
    } else if (_method === "POST_REGISTER") {
        return createUser(req, res);
    } else if (_method === "DELETE") {
        // return deleteUser(req, res, data);
    } else if (_method === "RESET_PASSWORD") {
        return resetPassword(req, res);
    } else {
        return res.status(400).json({ message: "Méthode invalide" });
    }
});

app.post("/moto", async (req, res, next) => {
    const { _method } = req.body;
    if (_method === "CREATE_MOTO") return withPrisma(prisma, createMoto, req, res, next);
    else if (_method === "GET_MOTOS") return withPrisma(prisma, getAllMotos, req, res, next);
});

app.post("/stock", async (req, res, next) => {
    const { _method } = req.body;
    if (_method === "CREATE_STOCK") return withPrisma(prisma, createStock, req, res, next);
    else if (_method == "GET_STOCKS") return withPrisma(prisma, getAllStocks, req, res, next);
});

app.post("/maintenance", async (req, res, next) => {
    const { _method } = req.body;
    if (_method === "CREATE_MAINTENANCE") return withPrisma(prisma, createMaintenance, req, res, next);
    if (_method === "VALIDATE_MAINTENANCE") return withPrisma(prisma, validateMaintenance, req, res, next);
});

app.listen(port, () => {
    console.log(`🚀 Prisma app ready at http://localhost:${port}`);
});
