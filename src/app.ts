import express from "express";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import cors from "cors";
import http from "http";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

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

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

server.listen(5000, "0.0.0.0", () => {
    console.log("Server port 5000 is listening...");
});