import { NextFunction, Request, Response } from "express";
import { User } from "../schemas/User.schemas";
import jwt from "jsonwebtoken";

export const authenticated = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;
    const JWT_SECRET = process.env.SECRET_KEY;

    if(!JWT_SECRET) throw new Error("JWT_SECRET must have a value!");

    if(!token) return res.status(401).json({message: 'You must have a token!'});

    try {
        const decode = jwt.verify(token, JWT_SECRET) as User;
        next();
    } catch(err) {
        return res.status(401).json({
            message: "You have an invalid token!",
            success: false
        });
    }
}