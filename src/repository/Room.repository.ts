import { UUID } from "crypto";
import { pool } from "../config/Supabase.config";
import { Room } from "../schemas/Room.schemas";

export const createRoom = async (roomData: Room, created_by: UUID) => {
    return pool.query(
        "INSERT INTO rooms (rooms_code, created_by) VALUES ($1, $2) RETURNING rooms_id", 
        [roomData.rooms_code, created_by]
    );
}