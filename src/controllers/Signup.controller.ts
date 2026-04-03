import { Request, Response, NextFunction } from "express";
import { hashPassword, checkIfEmailExist, checkIfNotValidEmail } from "../utils/Helper.utils";
import { addUser } from "../repository/User.repository";
import User from "../interface/User.interface";

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const account = req.body as User;

    if(!account.email || !account.password || !account.username) return res.status(404).json({ message: "All information must be fill up!", success: false });

    if(await checkIfNotValidEmail(account.email)){
        return res.status(400).json({ message: "Your email is not valid!", success: false });
    }

    if(await checkIfEmailExist(account.email)){
        return res.status(400).json({ message: "Your email is already exist!", success: false });
    } 

    try {
        //Hashed the password before sending to database
        const hashedPassword: string = await hashPassword(account.password);

        await addUser(account, hashedPassword);

        return res.status(200).json({ message: "You have signup successfully!", success: true });

    } catch (err: unknown) {
        next(err);
    }
}