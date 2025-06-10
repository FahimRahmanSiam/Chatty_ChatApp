import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true                      // changed on June 9th after chatGPT suggestion
  },
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId]
}

//used to store online users
const userSocketMap = {} // {usedId: socketId}

io.on("connection", (socket) =>{
    console.log("A user connected", socket.id)

    io.on("connection", (socket) => {
      console.log("🔌 New socket connection:", socket.id);
    });

    const userId = socket.handshake.query.userId
    if(userId) userSocketMap[userId] = socket.id

    // io.emit() is used to send event to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id)
      delete userSocketMap[userId]
      io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

export { io, app, server };