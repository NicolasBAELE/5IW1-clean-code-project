import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

import { authMiddleware } from "./middleware/verifyToken.js";
import { createUser, getUsers, loginUser, resetPassword } from "./controllers/UserController.js";
import { createMoto, getAllMotos } from "./controllers/MotoController.js";

import { createMaintenance, validateMaintenance } from "./repositories/maintenance.js";
import { createStock, getAllStocks } from "./repositories/stock.js";
import { withPrisma } from "./utils/handlePrisma.js";
import { createDriver, getDrivers } from "./controllers/DriverHistoryController.js";
import {createMotoTest} from "./repositories/motoTest.js";

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
    res.json(req.body.user);
});

app.post("/users", async (req, res, next) => {
    const { _method } = req.body;
    if (_method === "GET") {
        return getUsers(req, res);
    } else if (_method === "POST_LOGIN") {
        return loginUser(req, res);
    } else if (_method === "POST_REGISTER") {
        return createUser(req, res);
    } else if (_method === "RESET_PASSWORD") {
        return resetPassword(req, res);
    } else {
        return res.status(400).json({ message: "Méthode invalide" });
    }
});

app.post("/moto", async (req, res, next) => {
    const { _method } = req.body;
    if (_method === "POST") return createMoto(req, res, next);
    else if (_method === "GET") {
        return getAllMotos(req, res, next);
    }
});

app.post("/stock", async (req, res, next) => {
    const { _method, id, name, cost, quantity } = req.body;  // ✅ Extraire les variables ici

    if (_method === "CREATE_STOCK") {
        return withPrisma(prisma, createStock, req, res, next);
    }
    else if (_method == "GET_STOCKS") {
        return withPrisma(prisma, getAllStocks, req, res, next);
    }
    else if (_method === "UPDATE_STOCK") {
        try {
            // 🔍 Vérifions les variables extraites
            console.log("🔍 Mise à jour du stock avec : ", { id, name, cost, quantity });

            const updatedStock = await prisma.stock.update({
                where: { id },  // ✅ Vérifie que 'id' n'est pas undefined ici
                data: { name, cost, quantity },
            });
            res.json(updatedStock);
        } catch (error) {
            console.error("❌ Erreur lors de la mise à jour du stock:", error);
            next(error);
        }
    }
    else if (_method === "DELETE_STOCK") {
        try {
            // 🔍 Vérifions l’ID avant de le passer à Prisma
            console.log("🔍 Suppression du stock avec l'ID : ", id);

            await prisma.stock.delete({ where: { id } });
            res.json({ id, message: "Produit supprimé avec succès" });
        } catch (error) {
            console.error("❌ Erreur lors de la suppression du stock:", error);
            next(error);
        }
    }
});



app.post("/motoTest", async (req, res, next) => {
    const { _method } = req.body;
    if (_method === "POST") return withPrisma(prisma, createMotoTest, req, res, next);
});

app.post("/maintenance", async (req, res, next) => {
    const { _method } = req.body;
    if (_method === "CREATE_MAINTENANCE") return withPrisma(prisma, createMaintenance, req, res, next);
    if (_method === "VALIDATE_MAINTENANCE") return withPrisma(prisma, validateMaintenance, req, res, next);
});

app.post("/driver", async (req, res, next) => {
    const { _method } = req.body;
    if (_method === "POST") return createDriver(req, res, next);
    else if (_method == "GET") return getDrivers(req, res, next);
});

app.listen(port, () => {
    console.log(`🚀 Prisma app ready at http://localhost:${port}`);
});
