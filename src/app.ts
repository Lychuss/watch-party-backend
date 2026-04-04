import express from "express";
import { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import cors from "cors";
import http from "http";
import { initSocket } from "./socket/socket";

//All router 
import { signUpRouter } from "./routes/Signup.routes";
import { loginRouter } from "./routes/Login.routes";
import { roomRouter } from "./routes/Room.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//All routes for controllers
app.use("/watchparty", signUpRouter, loginRouter, roomRouter);

//Global Handler Error
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if(err instanceof Error){
        return res.status(500).json({
            message: err.message,
            success: false
        });
    };

    return res.status(500).json({
        message: "Unknown Error",
        success: false
    });
});

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

initSocket(io);

server.listen(5000, "0.0.0.0", () => {
    console.log("Server port 5000 is listening...");
});