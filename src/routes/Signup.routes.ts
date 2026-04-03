import express from "express";
import { signUp } from "../controllers/Signup.controller";

const signUpRouter = express.Router();

signUpRouter.post("/authentication/signup",signUp);

export default signUpRouter;