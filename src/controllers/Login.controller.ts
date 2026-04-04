import { Request, Response, NextFunction } from "express";
import { Login } from "../schemas/Login.schemas";
import { getPasswordThroughUsername } from "../services/Login.service";
import { checkPassword } from "../utils/Helper.utils";
import { createToken } from "../services/Token.service";

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    const account: Login = req.body as Login;

    try {

        const userData = await getPasswordThroughUsername(account.username);

        const hashPassword = userData?.password;

        if(!hashPassword){
            return res.status(400).json({ message: "You don't have an account!", success: false });
        }

        const correctPassword = await checkPassword(account.password, hashPassword);

        if(!correctPassword){
            return res.status(401).json({ message: "Your password is incorrect!", success: false });
        }

        const token = await createToken(userData.users_id, userData.username);

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        return res.status(200).json({ 
            message: "You have successfully login!", 
            success: true 
        });
        
    } catch(err) {
        next(err);
    }
}

