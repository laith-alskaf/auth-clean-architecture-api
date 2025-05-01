// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ResponseHandling } from "../utils/handleRespose";


export class AuthController {
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.verifiyEmail = this.verifiyEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  async signup(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body;
      const newUser = await this.authService.signup(userData);
      ResponseHandling.handleResponse({
        res: res, statusCode: 200,
        message: "The account has been created successfully",
      });

    } catch (error: any) {
      console.log("Error in signup", error);
      ResponseHandling.handleResponse({ res: res, statusCode: 400, message: error.message });
    }
  }


  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);
      if (!token) {
        ResponseHandling.handleResponse({ res: res, statusCode: 400, message: "Invalid credentials" });
      }
      ResponseHandling.handleResponse({ res: res, statusCode: 200, body: { token: token } });
    } catch (error: any) {
      ResponseHandling.handleResponse({ res: res, statusCode: 401, message: error.message });
    }
  }

  async logout(_req: Request, res: Response) {
    ResponseHandling.handleResponse({ res: res, statusCode: 200, message: "Logged out successfully" });
  }


  async forgotPassword(req: Request, res: Response): Promise<void> {

    try {
      const { email } = req.body;
      const user = await this.authService.forgotPassword(email);
      if (!user) {
        ResponseHandling.handleResponse({ res: res, statusCode: 400, message: "User not found" });
      }
      ResponseHandling.handleResponse({ res: res, statusCode: 200, message: "Password reset Code sent to your email" });

    } catch (error: any) {
      ResponseHandling.handleResponse({ res: res, statusCode: 500 });
    }

  }


  async verifiyEmail(req: Request, res: Response) {
    try {
      const { code, email } = req.body;
      const { user, token } = await this.authService.verifiyEmail(code, email);

      if (!user) {
        ResponseHandling.handleResponse({
          res: res, message: "Invalid or expired verification code",
          statusCode: 400
        });
      }
      if (!token) {
        ResponseHandling.handleResponse({
          res: res, message: "Email verifiy successfully", statusCode: 200,
          body: {
            userInfo: { "_id": user._id, "name": user.name, "email": user.email, "mobile": user.mobile, },
          },
        });
      }
      else {
        ResponseHandling.handleResponse({
          res: res, message: "Email verifiy successfully", statusCode: 200,
          body: {
            userInfo: { "_id": user._id, "name": user.name, "email": user.email, "mobile": user.mobile, },
            token: token
          },
        });
      }

    } catch (error: any) {
      console.log("Error in Verifiy Email");
      ResponseHandling.handleResponse({ res: res, statusCode: 400, message: error.message });
    }
  }


  async changePassword(req: Request, res: Response) {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      console.log(token);
      const { password } = req.body;

      await this.authService.changePassword(password, token!);
      ResponseHandling.handleResponse({ res: res, statusCode: 200, message: "Password reset successful" });

    } catch (error: any) {
      console.log("Error in change password");
      ResponseHandling.handleResponse({ res: res, statusCode: 500, message: error.message });
    }
  }


}
