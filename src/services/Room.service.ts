import { UUID } from "crypto";
import { createRoom } from "../repository/Room.repository";
import { Room } from "../schemas/Room.schemas";

export const createRoomAndGetData = async (roomData: Room, created_by: UUID): Promise<UUID | null> => {
    const dataRoom = await createRoom(roomData, created_by);

    if(!dataRoom) return null;

    return dataRoom.rows[0].rooms_id;
}