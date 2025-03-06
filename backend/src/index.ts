import winTable from "./data/winTable";

const express = require("express");
const cors = require("cors");
const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

require("dotenv").config();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const waitingPlayers = [];
const gameRooms = {}; // ルームごとの情報を管理

const determineWinner = (choice1, choice2) => {
  return winTable[choice1]?.[choice2]
    ? {
        result: winTable[choice1][choice2][0],
        getPoint: winTable[choice1][choice2][1],
      }
    : { result: "draw", getPoint: 0 };
};

let roundCount = 0;

// クライアントと接続
io.on("connection", (socket) => {
  console.log("クライアントと接続しました");

  socket.on("start_matching", (data) => {
    const { username, roomKey } = data;
    console.log(`マッチング待機中: ${username}`);

    if (!roomKey) {
      console.log(data.roomKey);
      return;
    }
    // roomKeyがまだ存在しない場合は初期化
    if (!waitingPlayers[roomKey]) {
      waitingPlayers[roomKey] = [];
    }
    if (waitingPlayers[roomKey].some((player) => player.socket === socket)) {
      // socketが一致するプレイヤーのインデックスを取得
      const playerIndex = waitingPlayers[roomKey].findIndex(
        (player) => player.socket === socket
      );

      if (playerIndex !== -1) {
        waitingPlayers[roomKey].splice(playerIndex, 1);
        console.log("あるプレイヤーがゲーム待機画面から退出しました");
        return;
      }
    }

    waitingPlayers[roomKey].push({ socket, username: username });

    // 他のプレイヤーとマッチング
    if (waitingPlayers[roomKey].length >= 2) {
      const player1 = waitingPlayers[roomKey].shift();
      const player2 = waitingPlayers[roomKey].shift();

      // 被らないroomの名前
      const roomName = `room-${player1.socket.id}-${player2.socket.id}`;

      // roomに参加させる
      player1.socket.join(roomName);
      player2.socket.join(roomName);

      // ルーム情報を登録
      gameRooms[roomName] = {
        players: [
          {
            id: player1.socket.id,
            username: player1.username,
            choice: null,
            points: 0,
            specialCard: "",
          },
          {
            id: player2.socket.id,
            username: player2.username,
            choice: null,
            points: 0,
            specialCard: "",
          },
        ],
      };

      io.to(roomName).emit("match_found", {
        message: "マッチング成立！ゲームを開始します。",
        players: [player1.username, player2.username],
        roomName,
      });

      console.log(`ルーム作成: ${roomName}`);
      console.log(`マッチング成立: ${player1.username} vs ${player2.username}`);
      roundCount = 0;
    }
  });

  // プレイヤーの選択を受け取る
  socket.on("player_choice", (data) => {
    const {
      roomName,
      socketId,
      choice,
      isReverse,
      isBanSpecialCard,
      specialTitle,
    } = data;
    console.log("受信したデータ:", data);

    if (!gameRooms[roomName]) {
      console.log("無効なルーム名");
      return;
    }

    const room = gameRooms[roomName];
    const player = room.players.find((p) => p.id === socketId);

    if (!player) {
      console.log("プレイヤーが見つかりません");
      return;
    }

    player.choice = choice;
    player.specialCard = specialTitle;
    console.log(`${player.username} が ${choice} を選択しました`);

    // 両プレイヤーの選択が揃ったら勝敗を判定
    if (room.players.every((p) => p.choice)) {
      console.log("勝利判定をします");
      //ここでroundCountを足すぞ
      roundCount++;
      console.log(`roundCount: ${roundCount}`);
      const [player1, player2] = room.players;
      let { result, getPoint } = determineWinner(
        player1.choice,
        player2.choice
      );
      // リバースと封印の効果みる
      if (isBanSpecialCard) console.log("封印中なのに特殊カードが使用された");
      if (isReverse) {
        if (result === "player1") result = "player2";
        else if (result === "player2") result = "player1";
      }

      if (result === "player1") {
        player1.points += getPoint;
        console.log(`player1が${getPoint}獲得しました`);
      } else if (result === "player2") {
        player2.points += getPoint;
        console.log(`player2が${getPoint}獲得しました`);
      }

      io.to(roomName).emit("round_result", {
        result,
        getPoint,
        mySocketId: player1.id,
        enemySocketId: player2.id,
        myTitle: player1.choice,
        enemyTitle2: player2.choice,
        mySpecial: player1.specialCard,
        enemySpecial: player2.specialCard,
      });

      // 次のラウンドの準備
      room.players.forEach((p) => (p.choice = null));

      // 試合終了条件をチェック
      if (player1.points >= 3 || player2.points >= 3 || roundCount >= 6) {
        io.to(roomName).emit("game_end", {
          myPoint: player1.points,
          enemyPoint: player2.points,
          mySocketId: player1.id,
          enemySocketId: player2.id,
        });

        // ルームを削除
        delete gameRooms[roomName];
      }
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

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`サーバーに接続しました PORT = ${PORT}`));
