import { pool } from "../config/Supabase.config";
import User from "../interface/User.interface";

export const addUser = async (account: User) => {
    return await pool.query(
        "INSERT INTO users (email, password, username) VALUE ($1, $2, $3)",
        [account.email, account.password, account.username]
    );
}