import { pool } from "../config/Supabase.config";
import User from "../interface/User.interface";

export const addUser = async (account: User, hashPassword: string) => {
    return await pool.query(
        "INSERT INTO users (email, password, username) VALUES ($1, $2, $3)",
        [account.email, hashPassword, account.username]
    );
}

export const getUserEmail = async (email: string) => {
    return await pool.query(
        "SELECT * FROM users WHERE users.email = $1", [email]
    );
}