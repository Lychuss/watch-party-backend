import { UUID } from "crypto";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type PayLoad = {
    userId: UUID, 
    username: string
}

export const authentication = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;
    const JWT_SECRET = process.env.SECRET_KEY;

    if(!JWT_SECRET) throw new Error("JWT_SECRET must have a value!");

    if(!token) return res.status(401).json({message: 'You must have a token!', success: false});

    try {
        const decode: PayLoad = jwt.verify(token, JWT_SECRET) as PayLoad;
        (req as any).user = decode;
        next();
    } catch(err) {
        return res.status(401).json({
            message: "You have an invalid token!",
            success: false
        });
    }
}