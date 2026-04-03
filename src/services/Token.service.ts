import { UUID } from "crypto";
import jwt from "jsonwebtoken";

type PayLoad = {
    userId: UUID,
    username: string
}

export const createToken = (data: PayLoad): string => {
    const payLoad = {userId: data.userId, username: data.username} as PayLoad;
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


export const returnPayload = (token: string): PayLoad | null => {
    try {
        const decode: PayLoad = jwt.decode(token) as PayLoad;
        return decode;
    } catch(err) {
        return null;
    }
}