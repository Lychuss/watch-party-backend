import express from "express";
import { validation } from "../middlewares/Validation.middleware";
import { roomValidation } from "../schemas/Room.schemas";
import { createRoomController, joinRoomController, leftRoomController } from "../controllers/Room.controller";
import { authentication } from "../middlewares/Authentication.middleware";

export const roomRouter = express.Router();

roomRouter.post("/create-room", authentication, validation(roomValidation), createRoomController);
roomRouter.post("/join-room", authentication, joinRoomController);
roomRouter.put("/left-room", authentication, leftRoomController);