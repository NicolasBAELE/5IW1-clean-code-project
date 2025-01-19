import express from "express";
import { PrismaClient } from "@prisma/client/extension";

const app = express();
const port = 3000;

const prisma = PrismaClient;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// app.get("/users", (req, res) => {
//     res.send(prisma.users.sync);
// });

// Je pense que tu devras renvoyer un truc du genre quoi

app.listen(port, () => {
    console.log(`🚀 Prisma app ready at http://localhost:${port}`);
});
