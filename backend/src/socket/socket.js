const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(express.json())

const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN || "http://localhost:5173", // frontend
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-chat", (chatId) => {
    socket.join(chatId);
    console.log("Joined chat:", chatId);
  });

  socket.on("send-message", (message) => {
    socket.to(message.chat).emit("receive-message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

module.exports = { app, server, io };
