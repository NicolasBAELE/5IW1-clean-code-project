import express from "express";
import {PrismaClient} from '@prisma/client'
import {withPrisma} from "../utils/handlePrisma.js";
import {getUsers} from "./users.js";

const app = express();
app.use(express.json());
const port = 3000;

const prisma = new PrismaClient({log: ['query', 'info', 'warn', 'error']});


app.post('/users', withPrisma(prisma)(getUsers));

app.listen(port, () => {
    console.log(`🚀 Prisma app ready at http://localhost:${port}`);
});
