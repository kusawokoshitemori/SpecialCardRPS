const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

const PORT = 4000;

// クライアントと接続
io.on("connection", (socket) => {
  console.log("クライアントと接続しました");

  // フロントエンドから情報を取ってくる
  socket.on("send_message", (data) => {
    console.log(
      `フロントエンドから情報を受け取りました${JSON.stringify(data)}`
    );
  });

  socket.on("disconnect", () => {
    console.log("クライアントの接続が切れました");
  });
});

server.listen(PORT, () => console.log(`サーバーに接続しました PORT = ${PORT}`));
