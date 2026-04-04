import { Response, Request, NextFunction } from "express";
import { Room } from "../schemas/Room.schemas";
import { createRoomAndGetData } from "../services/Room.service";
import { returnPayload } from "../services/Token.service";


export const roomController = async (req: Request, res: Response, next: NextFunction) => {
    const roomData: Room = req.body as Room;

    const usersPayload = returnPayload(req.cookies?.token);

    if(!usersPayload?.userId) return res.status(401).json({ message: "Invalid Token Payload!", sucess: false });

    try {
        const roomsId = await createRoomAndGetData(roomData, usersPayload?.userId);

        if(!roomsId) return res.status(400).json({ message: "Cannot create room!", success: false });

        return res.status(200).json({ 
            message: "Created room successfully!",
            roomsData: {
                roomsId: roomsId,
                roomsCode: roomData.rooms_code
            },
            success: true
        })
    } catch(err) {
        next(err);
    }
}