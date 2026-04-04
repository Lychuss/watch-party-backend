import express from "express";
import { loginValidation } from "../schemas/Login.schemas";
import { loginController } from "../controllers/Login.controller";
import { validation } from "../middlewares/Validation.middleware";

export const loginRouter = express.Router();

loginRouter.post("/authentication/login", validation(loginValidation), loginController);