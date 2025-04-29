import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            res.status(401).json({ message: 'Authentication required' });
        }
        const decoded: any = jwt.verify(token!, process.env.JWT_SECRET || 'your-secret-key'); // Replace with your actual secret
        const user = await UserModel.findById(decoded.userId);
        if (!user) {
            throw new Error();
        }

        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
