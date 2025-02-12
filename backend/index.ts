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
const gameRooms = {}; // ルームごとの情報を管理

// 勝敗判定関数
const WIN_TABLE = {
  グー: {
    グー: ["draw", 0],
    チョキ: ["player1", 1],
    パー: ["player2", 1],
    無限パー: ["player2", 2],
    封印: ["draw", 0],
    全知全能: ["draw", 0],
    リバース: ["draw", 0],
    ミラー: ["player2", 1],
  },
  チョキ: {
    グー: ["player2", 1],
    チョキ: ["draw", 0],
    パー: ["player1", 1],
    無限パー: ["player1", 1],
    封印: ["draw", 0],
    全知全能: ["draw", 0],
    リバース: ["draw", 0],
    ミラー: ["player2", 1],
  },
  パー: {
    グー: ["player1", 1],
    チョキ: ["player2", 1],
    パー: ["draw", 0],
    無限パー: ["draw", 0],
    封印: ["draw", 0],
    全知全能: ["draw", 0],
    リバース: ["draw", 0],
    ミラー: ["player2", 1],
  },
  無限パー: {
    グー: ["player1", 2],
    チョキ: ["player2", 1],
    パー: ["draw", 0],
    無限パー: ["draw", 0],
    封印: ["draw", 0],
    全知全能: ["draw", 0],
    リバース: ["draw", 0],
    ミラー: ["player1", 3],
  },
  封印: {
    グー: ["draw", 0],
    チョキ: ["draw", 0],
    パー: ["draw", 0],
    無限パー: ["draw", 0],
    封印: ["draw", 0],
    全知全能: ["draw", 0],
    リバース: ["draw", 0],
    ミラー: ["draw", 0],
  },
  全知全能: {
    グー: ["draw", 0],
    チョキ: ["draw", 0],
    パー: ["draw", 0],
    無限パー: ["draw", 0],
    封印: ["draw", 0],
    全知全能: ["draw", 0],
    リバース: ["draw", 0],
    ミラー: ["draw", 0],
  },
  リバース: {
    グー: ["draw", 0],
    チョキ: ["draw", 0],
    パー: ["draw", 0],
    無限パー: ["draw", 0],
    封印: ["draw", 0],
    全知全能: ["draw", 0],
    リバース: ["draw", 0],
    ミラー: ["draw", 0],
  },
  ミラー: {
    グー: ["player2", 1],
    チョキ: ["player2", 1],
    パー: ["player2", 1],
    無限パー: ["player1", 3],
    封印: ["draw", 0],
    全知全能: ["draw", 0],
    リバース: ["draw", 0],
    ミラー: ["draw", 0],
  },
};

const determineWinner = (choice1, choice2) => {
  return WIN_TABLE[choice1]?.[choice2]
    ? {
        result: WIN_TABLE[choice1][choice2][0],
        getPoint: WIN_TABLE[choice1][choice2][1],
      }
    : { result: "draw", getPoint: 0 };
};

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

      // ルーム情報を登録
      gameRooms[roomName] = {
        players: [
          {
            id: player1.socket.id,
            username: player1.username,
            choice: null,
            points: 0,
          },
          {
            id: player2.socket.id,
            username: player2.username,
            choice: null,
            points: 0,
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
    }
  });

  // プレイヤーの選択を受け取る
  socket.on("player_choice", (data) => {
    const { roomName, socketId, choice } = data;
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
    console.log(`${player.username} が ${choice} を選択しました`);

    // 両プレイヤーの選択が揃ったら勝敗を判定
    if (room.players.every((p) => p.choice)) {
      console.log("勝利判定をします");
      const [player1, player2] = room.players;
      const { result, getPoint } = determineWinner(
        player1.choice,
        player2.choice
      );

      if (result === "player1") {
        player1.points += getPoint;
        console.log(`player1が${getPoint}獲得しました`);
      } else if (result === "player2") {
        player2.points += getPoint;
        console.log(`player2が${getPoint}獲得しました`);
      }

      // round_resultにgetPointを付け加えて

      io.to(roomName).emit("round_result", {
        result,
        getPoint,
        mySocketId: player1.id,
        enemySocketId: player2.id,
        myTitle: player1.choice,
        enemyTitle2: player2.choice,
      });

      // 次のラウンドの準備
      room.players.forEach((p) => (p.choice = null));

      // 試合終了条件をチェック
      if (player1.points >= 3 || player2.points >= 3) {
        const winner = player1.points >= 3 ? player1 : player2;
        io.to(roomName).emit("game_end", {
          message: `試合終了！${winner.username} の勝利！`,
          players: room.players,
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

server.listen(PORT, () => console.log(`サーバーに接続しました PORT = ${PORT}`));
