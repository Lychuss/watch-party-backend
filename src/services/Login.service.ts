import { UUID } from "crypto";
import { getUserData } from "../repository/User.repository";

type UserData = {
    users_id: UUID,
    username: string,
    password: string,
    email: string
}


export const getPasswordThroughUsername = async (username: string): Promise<UserData | null> => {
    const query = await getUserData(username);
    const data = query.rows[0] as UserData;
    
    if(!data) return null;

    return data;
}