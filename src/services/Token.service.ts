import { UUID } from "crypto";
import jwt from "jsonwebtoken";


export const createToken = (userId: UUID, username: string): string => {
    const payLoad = {userId: userId, username: username};
    const JWT_SECRET = process.env.SECRET_KEY;

    if(!JWT_SECRET) throw new Error("JWT_SECRET must have a value!");

    const token = jwt.sign(payLoad, JWT_SECRET, {expiresIn: '1h'});

    return token;
}

export const verify_token = (token: string) => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY!);
    } catch {
        return false;
    }
};


export const returnPayload = (token: string) => {
    try {
        const decode = jwt.decode(token);
        return decode;
    } catch(err) {
        return null;
    }
}