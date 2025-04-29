// src/repositories/user.repository.ts
import { IUser } from '../types/user.types';
import { UserModel } from '../models/user.model';

export class UserRepository {

  async createUser(user: IUser): Promise<IUser> {
    const newUser = new UserModel(user);
    return await newUser.save();
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email });
  }

  async getUserById(userId: string): Promise<IUser | null> {
    return await UserModel.findById(userId);
  }

}
