import {Moto} from "./Moto.js";

export interface Breakdown {
  id: string;
  motoId: string;
  moto: Moto;
  description: string;
  warranty: boolean;
  createdAt: Date;
  updatedAt: Date;
}