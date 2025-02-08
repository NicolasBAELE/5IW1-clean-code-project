import {MotoType} from "./MotoType.js";

export interface UserType {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  phone?: string;
  motos: MotoType[];
}