import { PrismaClient } from '@prisma/client';
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map(user => new User(user.id, user.name, user.email, user.createdAt));
  }
}