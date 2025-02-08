import { Request, Response } from "express";
import prismaUserRepository from "../repositories/prismaUserRepository.js";
import CreateUserUseCase from "@projet-clean/application/useCases/createUser.js";
import GetUserUseCase from "@projet-clean/application/useCases/getUser.js";
import LoginUserUseCase from "@projet-clean/application/useCases/loginUser.js";

const userRepository = new prismaUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const getUsersUseCase = new GetUserUseCase(userRepository);
const loginUserUseCase = new LoginUserUseCase(userRepository);

export const getUsers = async (req: Request, res: Response) => {
    try {
        const where = req.body.payloadUser;
        const users = await getUsersUseCase.execute(where);
        res.status(200).json(users);
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "Une erreur est survenue";
        res.status(500).json({ message: errMessage });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const { token, message } = await createUserUseCase.execute({ name, email, password });
        res.status(201).json({ token, message, status: "created" });
    } catch (error) {
        const errMessage =
            error instanceof Error ? error.message : "Une erreur est survenue lors de la création de l'utilsateur";
        res.status(400).json({ status: "error", message: errMessage });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const tokenAndMessage = await loginUserUseCase.execute(email, password);
        res.status(200).json(tokenAndMessage);
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "Une erreur est survenue";
        res.status(400).json({ status: "error", message: errMessage });
    }
};
