import { UUID } from "crypto";
import { pool } from "../config/Supabase.config";
import { Room } from "../schemas/Room.schemas";
import { RoomParticipants } from "../schemas/RoomParticipants.schemas";

export const createRoom = async (roomData: Room, created_by: UUID) => {
    return pool.query(
        "INSERT INTO rooms (rooms_code, created_by) VALUES ($1, $2) RETURNING rooms_id", 
        [roomData.rooms_code, created_by]
    );
}

export const joinRoom = async (roomParticipants: RoomParticipants) => {
    return pool.query(
        "INSERT INTO rooms_participants (rooms_id, users_id, left_at) VALUES ($1, $2, $3)",
        [roomParticipants.rooms_id, roomParticipants.users_id, roomParticipants.left_at]
    );
}

export const getRoomId = async (rooms_code: string) => {
    return pool.query(
        "SELECT rooms_id FROM rooms WHERE rooms_code = $1", [rooms_code]
    );
}

export const leftRoom = async (rooms_id: UUID, users_id: UUID) => {
    return pool.query(
        `UPDATE rooms_participants 
        SET left_at = NOW() 
        WHERE rooms_id = $1 AND users_id = $2`, [rooms_id, users_id]
    );
}