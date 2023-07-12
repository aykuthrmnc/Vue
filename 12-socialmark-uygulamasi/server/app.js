const socketio = require("socket.io");
const express = require("express");
const http = require("http");
const app = express();

const PORT = process.env.PORT || 2022;

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
  },
});

server.listen(PORT, () => {
  io.on("connection", (socket) => {
    // console.log("AAAAAAAAAA");
    // console.log(socket.id);

    // socket.join(133);
    // io.in(roomID).emit()

    // Karşılama mesajı
    socket.emit("WELCOME_MESSAGE", `Hoşgeldin ${socket.id}...`);
    socket.on("NEW_BOOKMARK_EVENT", (bookmark) => {
      // io.emit("NEW_BOOKMARK_ADDED", bookmark);

      // Gonderen hariç herkese gonderir
      socket.broadcast.emit("NEW_BOOKMARK_ADDED", bookmark);
    });
  });
});
