import { Request, Response } from "express";
import User from "../interface/User.interface";

export const signUp = async (req: Request, res: Response) => {
    const { email, username, password } = req.body as User;

    if(!email || !username || !password) 
        return res.status(404).json({ message: "All information must be fill up!", success: false });

    try {
        
        
    } catch {

    }
}