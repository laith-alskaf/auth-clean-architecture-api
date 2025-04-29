import { Document } from "mongoose";
export interface IUser extends Document {
  name: string;
  email: string;
  mobile: number
  password: string;
  isEmailVerified : boolean;
  lastLogin: Date;
  otpCode: string;
  otpCodeExpires : Date;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ResetPasswordInput {
  password: string;
}