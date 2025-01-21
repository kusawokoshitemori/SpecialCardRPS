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

const waitingPlayers = [];

// クライアントと接続
io.on("connection", (socket) => {
  console.log("クライアントと接続しました");

  socket.on("start_matching", (data) => {
    console.log(`マッチング待機中: ${data.username}`);
    waitingPlayers.push({ socket, username: data.username });

    // 他のプレイヤーとマッチング
    if (waitingPlayers.length >= 2) {
      const player1 = waitingPlayers.shift();
      const player2 = waitingPlayers.shift();

      // 被らないroomの名前
      const roomName = `room-${player1.socket.id}-${player2.socket.id}`;

      // roomに参加させる
      player1.socket.join(roomName);
      player2.socket.join(roomName);

      io.to(roomName).emit("match_found", {
        message: "マッチング成立！ゲームを開始します。",
        players: [player1.username, player2.username],
        roomName,
      });

      console.log(`ルーム作成: ${roomName}`);
      console.log(`マッチング成立: ${player1.username} vs ${player2.username}`);
    }
  });

  socket.on("disconnect", () => {
    console.log("クライアントの接続が切れました");
    // 待機リストから切断されたユーザーを削除
    const index = waitingPlayers.findIndex((p) => p.socket.id === socket.id);
    if (index !== -1) {
      waitingPlayers.splice(index, 1);
    }
  });
});

server.listen(PORT, () => console.log(`サーバーに接続しました PORT = ${PORT}`));
