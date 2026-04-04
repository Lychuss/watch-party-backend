import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validation = (schema: ZodSchema) => 
    (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if(!result.success) {
            return res.status(400).json({
                message: "Invalid Input",
                success: false
            });
        }

        req.body = result.data;

        next();
    }