import { Schema, model } from "mongoose"; // Erase if already required
import { IUser } from "../types/user.types";




const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    otpCode: { type: String, default: "" },
    otpCodeExpires: { type: Date, },
}, { timestamps: true },);


export const UserModel = model<IUser>('User', userSchema);