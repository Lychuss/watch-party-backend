import bcrypt from "bcrypt";

export const hashPassword = async (originalPassword: string): Promise<string> => {
    return bcrypt.hash(originalPassword, 10);
}

export const checkPassword = async (originalPassword: string, hashPassword: string): Promise<boolean> => {
    return bcrypt.compare(originalPassword, hashPassword);
}