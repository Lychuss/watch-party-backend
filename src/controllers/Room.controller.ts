import { Response, Request, NextFunction } from "express";
import { Room } from "../schemas/Room.schemas";
import { createRoomAndGetData } from "../services/Room.service";
import { RoomParticipants } from "../schemas/RoomParticipants.schemas";
import { getRoomIdIfExist } from "../utils/Helper.utils";
import { joinRoom, leftRoom } from "../repository/Room.repository";

export const createRoomController = async (req: Request, res: Response, next: NextFunction) => {
    const roomData: Room = req.body as Room;

    const usersPayload = (req as any).user;

    if(!usersPayload.userId) return res.status(401).json({ message: "Invalid Token Payload!", success: false });

    try {
        const roomsId = await createRoomAndGetData(roomData, usersPayload.userId);

        if(!roomsId) return res.status(400).json({ message: "Cannot create room!", success: false });

        const roomParticipantsData: RoomParticipants = {
            rooms_id: roomsId,
            users_id: usersPayload.userId,
            rooms_code: roomData.rooms_code,
            left_at: null
        }

        await joinRoom(roomParticipantsData);

        return res.status(200).json({ 
            message: "Created room successfully!",
            roomsData: {
                roomsId: roomsId,
                roomsCode: roomData.rooms_code
            },
            success: true
        });
        
    } catch(err) {
        next(err);
    }
}

export const joinRoomController = async (req: Request, res: Response, next: NextFunction) => {
    const userJoinData: RoomParticipants = req.body;
    const userId = (req as any).user?.userId;
    const roomsId = await getRoomIdIfExist(userJoinData.rooms_code);

    if(!roomsId) return res.status(401).json({ message: "Invalid room code!", success: false });

    const roomParticipantsData: RoomParticipants = {
        rooms_id: roomsId,
        users_id: userId,
        rooms_code: userJoinData.rooms_code,
        left_at: null
    }

    try {
        await joinRoom(roomParticipantsData);

        return res.status(200).json({ message: "You joined the room!", success: true });

    } catch(err) {
        next(err);
    }
}

export const leftRoomController = async (req: Request, res: Response, next: NextFunction) => {
    const {rooms_id} = req.body;
    const userId = (req as any).user?.userId;

    if(!rooms_id) return res.status(401).json({ message: "Invalid cannot leave!", success: false });

    try {
        await leftRoom(rooms_id, userId);

        return res.status(200).json({ message: "You left the room!", success: true });

    } catch(err) {
        next(err);
    }
}