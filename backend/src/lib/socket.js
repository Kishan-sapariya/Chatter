import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReceiverSocketId(userId){
  return userSokectMap[userId];
}

const userSokectMap={}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  const userId=socket.handshake.query.userId;

  if(userId) userSokectMap[userId]=socket.id;
  //io.emit is used to to make changes visible to other user at real time(ex:users goes offline/online)
  io.emit("getOnlineUsers",Object.keys(userSokectMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSokectMap[userId];
    io.emit("getOnlineUsers",Object.keys(userSokectMap));
  });
});

export { io, app, server };
