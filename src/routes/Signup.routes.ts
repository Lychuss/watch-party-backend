import express from "express";
import { signUpController } from "../controllers/Signup.controller";
import { userValidation } from "../schemas/User.schemas";
import { validation } from "../middlewares/Validation.middleware";

export const signUpRouter = express.Router();

signUpRouter.post("/authentication/signup", validation(userValidation), signUpController);
