import express from "express";
import { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import cors from "cors";
import http from "http";
import signUpRouter from "./routes/Signup.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/watchparty", signUpRouter);

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

//WebSocket Connection to the users
io.on("connection", (socket) => {
        console.log("User has joined the room", socket.id);

    socket.on("join-room", (roomId) => {
        socket.join(roomId);
        console.log("User joined room " + roomId);
    });

    socket.on("offer", ({ roomId, offer }) => {
        socket.to(roomId).emit("offer", offer);
    });

    socket.on("answer", ({ roomId, answer }) => {
        socket.to(roomId).emit("answer", answer);
    });

    socket.on("candidate", ({ roomId, candidate }) => {
        socket.to(roomId).emit("candidate", candidate);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
})

server.listen(5000, "0.0.0.0", () => {
    console.log("Server port 5000 is listening...");
});