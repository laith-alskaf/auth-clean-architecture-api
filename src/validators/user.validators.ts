// src/validators/user.validator.ts
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';


const signupSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  mobile: Joi.number().min(10).required(),
});


const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
const ForgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

 const verifyEmailSchema  = Joi.object({
  code: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const validateSignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { error } = signupSchema.validate(req.body);
    if (error) {
      console.log("Error in validateSignup", error);
      res.status(401).json({ success: false, message: "All fields are required" });
    }
    next();
  } catch (error) {
    console.log("Error in validateSignup", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}


export const validateLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
    }
    next();
  } catch (error) {
    console.log("Error in validateLogin", error);
    res.status(500).json({ success: false, message: "Server error" });
  }

}

export const validateForgotPass = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {

    const { error } = ForgotPasswordSchema.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.details[0].message });
    }
    next();
  } catch (error) {
    console.log("Error in validateForgotPass", error);
    res.status(500).json({ success: false, message: "Server error" });
  }

}

export const validationResetPassword = Joi.object({
  password: Joi.string().min(6).required(),
});

export const  validateVerifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { error } = verifyEmailSchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
    }
    next();
  } catch (error) {
    console.log("Error in validateVerifyEmail", error);
    res.status(500).json({ success: false, message: "Server error" });
  }

}

