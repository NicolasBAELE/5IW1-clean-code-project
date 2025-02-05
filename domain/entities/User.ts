import {Moto} from "./Moto.js";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  phone?: string;
  motos: Moto[];
  createdAt: Date;
  updatedAt: Date;
}