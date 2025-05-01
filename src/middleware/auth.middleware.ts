import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error("Authentication required");
        }
        const decoded: any = jwt.verify(token!, process.env.JWT_SECRET || 'y#^o%ur!-@se^&cr!~%^et-ke$&y'); // Replace with your actual secret
        const user = await UserModel.findById(decoded.id);
        if (!user) {
            throw new Error("User not foun");
        }

        next();
    } catch (error: any) {
        res.status(401).json({ message: error.message ?? 'Invalid token' });
    }
};
