import { Request, Response } from "express";
import prismaUserRepository from "../repositories/prismaUserRepository.js";
import CreateUserUseCase from "@projet-clean/application/useCases/user/createUser.js";
import GetUserUseCase from "@projet-clean/application/useCases/user/getUser.js";
import LoginUserUseCase from "@projet-clean/application/useCases/user/loginUser.js";
import ResetPasswordUseCase from "@projet-clean/application/useCases/user/resetPassword.js";

const userRepository = new prismaUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const getUsersUseCase = new GetUserUseCase(userRepository);
const loginUserUseCase = new LoginUserUseCase(userRepository);
const resetPasswordUseCase = new ResetPasswordUseCase(userRepository);

export const getUsers = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId;
        const users = await getUsersUseCase.execute({id: userId});
        res.status(200).json(users);
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "Une erreur est survenue";
        res.status(500).json({ message: errMessage });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;
        const { token, message } = await createUserUseCase.execute({ name, email, password, role });
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

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const tokenAndMessage = await resetPasswordUseCase.execute({email, password});
        res.status(200).json(tokenAndMessage);
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "Une erreur est survenue";
        res.status(400).json({ status: "error", message: errMessage });
    }
};
