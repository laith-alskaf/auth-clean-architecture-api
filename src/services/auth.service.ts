import { UserRepository } from '../repositories/user.repository';
import { IUser } from '../types/user.types';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendVerificationEmail, sendResetSuccessEmail } from '../utils/emails';

export class AuthService {
  private userRepository: UserRepository;
  private jwtSecret: string;

  constructor() {
    this.userRepository = new UserRepository();
    this.jwtSecret = process.env.JWT_SECRET || 'bW@$3@r%6eR%6!%6mZ%6eR@x';
  }

  async signup(userData: IUser): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    return await this.userRepository.createUser(userData);
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const payload = { id: user.id, email: user.email };

    const token = jwt.sign(payload, this.jwtSecret, {
      expiresIn: '7d'
    });
    user.lastLogin = new Date();

    return token;
  }

  async forgotPassword(email: string): Promise<IUser | null> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      return null;
    }
    try {

      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      user.otpCode = otpCode;
      user.otpCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 
      await user.save();

      await sendVerificationEmail(email, otpCode);

      return user;
    } catch (error) {
      throw new Error("Error in otplib, when generate otpCode and otpSecret");
    }

  }

  async verifiyEmail(code: string, email: string): Promise<IUser | null> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) return null;

    if (user.otpCode !== code || user.otpCodeExpires < new Date()) {
      return null;
    }
    user.isEmailVerified = true;
    user.otpCode = '';
    await user.save();

    return user;
  }

  async resetPassword(password: string, email: string): Promise<IUser> {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    // const userId = (decoded as any).id;
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save();
    await sendResetSuccessEmail(user.email);

    return user;
  }

}
