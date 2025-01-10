import { IUserRepository } from '../repositories/IUserRepository';
import { User } from '../entities/User';

export class GetUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }
}