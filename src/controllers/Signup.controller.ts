import { Request, Response, NextFunction } from "express";
import { hashPassword, checkIfEmailExist } from "../utils/Helper.utils";
import { addUser } from "../repository/User.repository";
import { User } from "../schemas/User.schemas";

export const signUpController = async (req: Request, res: Response, next: NextFunction) => {
    const account: User = req.body as User;

    try {
        if(await checkIfEmailExist(account.email)){
            return res.status(400).json({ message: "Your email is already exist!", success: false });
        } 
        //Hashed the password before sending to database
        const hashedPassword: string = await hashPassword(account.password);

        await addUser(account, hashedPassword);

        return res.status(200).json({ message: "You have signup successfully!", success: true });

    } catch (err: unknown) {
        next(err);
    }
}