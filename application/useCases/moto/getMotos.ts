import MotoRepository from "@projet-clean/domain/repositories/MotoRepository.js";
import { MotoType } from "@projet-clean/domain/entities/MotoType.js";

export default class GetAllMotosUseCase {
    constructor(private motoRepository: MotoRepository) {}

    async execute(): Promise<MotoType[]> {
        return this.motoRepository.getAllMotos();
    }
}
