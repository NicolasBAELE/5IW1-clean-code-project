import {MotoType} from "./MotoType.js";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  phone?: string;
  motos: MotoType[];
  createdAt: Date;
  updatedAt: Date;
}