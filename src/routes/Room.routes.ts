import express from "express";
import { validation } from "../middlewares/Validation.middleware";
import { roomValidation } from "../schemas/Room.schemas";
import { roomController } from "../controllers/Room.controller";
import { authentication } from "../middlewares/Authentication.middleware";

export const roomRouter = express.Router();

roomRouter.post("/create-room", authentication, validation(roomValidation), roomController);