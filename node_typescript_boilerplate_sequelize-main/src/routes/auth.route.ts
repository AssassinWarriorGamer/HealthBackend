/* eslint-disable prettier/prettier */
import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class AuthRoute implements Routes {
  public path = '';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Log the request body before handling the signup
    this.router.post(`register`, (req, res, next) => {
      console.log("Request body for register:", req.body); // Log the request body
      next(); // Proceed to validation and controller
    }, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);

    this.router.post(`/auth/sign-in`, validationMiddleware(CreateUserDto, 'body'), this.authController.logIn);
    this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;
 