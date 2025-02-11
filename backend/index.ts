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
const determineWinner = (choice1, choice2) => {
  if (choice1 === choice2) return "draw";
  if (choice1 === "封印" || choice2 === "封印") return "draw";
  if (choice1 === "ミラー") {
    if (choice2 === "グー" || choice2 === "チョキ" || choice2 === "パー") {
      return "player2";
    } else {
      return "player1win";
    }
  }
  if (choice2 === "ミラー") {
    if (choice1 === "グー" || choice1 === "チョキ" || choice1 === "パー") {
      return "player1";
    } else {
      return "player2win";
    }
  }
  if (choice1 === "全知全能") return "draw";
  if (choice1 === "リバース" || choice2 === "リバース") return "draw";
  if (choice1 === "無限パー") {
    if (choice2 === "グー") return "player1player1"; // 2ポイント
    else if (choice2 === "チョキ") return "player2";
    else return "draw";
  }

  if (choice2 === "全知全能") return "draw";
  if (choice2 === "無限パー") {
    if (choice1 === "グー") {
      return "player2player2"; // 2ポイント
    } else if (choice1 === "チョキ") {
      return "player1";
    } else {
      return "draw";
    }
  }

  if (
    (choice1 === "グー" && choice2 === "チョキ") ||
    (choice1 === "チョキ" && choice2 === "パー") ||
    (choice1 === "パー" && choice2 === "グー")
  ) {
    return "player1";
  }
  return "player2";
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
      const result = determineWinner(player1.choice, player2.choice);

      if (result === "player1") {
        player1.points += 1;
        console.log("player1が1ポイントを獲得しました");
      } else if (result === "player2") {
        player2.points += 1;
        console.log("player2が1ポイントを獲得しました");
      } else if (result === "draw") {
        console.log("引き分けです");
      } else if (result === "player1player1") {
        player1.points += 2;
        console.log("player1が2ポイント獲得しました");
      } else if (result === "player2player2") {
        player2.points += 2;
        console.log("player2が2ポイントを獲得しました");
      } else if (result === "player1win") {
        player1.points += 3;
        console.log("player1が3ポイントを獲得しました");
      } else if (result === "player2win") {
        player2.points += 3;
        console.log("player2が3ポイントを獲得しました");
      }

      io.to(roomName).emit("round_result", {
        result,
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
