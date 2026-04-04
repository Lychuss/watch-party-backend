import bcrypt from "bcrypt";
import { getUserEmail } from "../repository/User.repository";
import { getRoomId } from "../repository/Room.repository";
import { UUID } from "node:crypto";

export const hashPassword = async (originalPassword: string): Promise<string> => {
    return bcrypt.hash(originalPassword, 10);
}

export const checkPassword = async (originalPassword: string, hashPassword: string): Promise<boolean> => {
    return bcrypt.compare(originalPassword, hashPassword);
}

export const checkIfEmailExist = async (email: string): Promise<boolean> => {
    const checkEmail = await getUserEmail(email);
    const hasEmail = checkEmail.rows[0];

    if(hasEmail) return true;

    return false;
}

export const getRoomIdIfExist = async (rooms_code: string): Promise<UUID | null> => {
    const query = await getRoomId(rooms_code);
    const data = query.rows[0];

    if(!data) return null;

    return data.rooms_id;
}