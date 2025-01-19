import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "http://localhost:3000", // フロントエンドのURL
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// Socket.IOのイベントリスナー
io.on("connection", (socket) => {
  console.log("接続済み:", socket.id);

  // プレイヤーの選択を受け取る
  socket.on("playerChoice", (data) => {
    console.log(`${data.player} が ${data.myTitle} を選びました`);

    // ゲームロジック（ここで勝敗を決める）
    const gameResult = determineWinner(data.myTitle); // ゲームの結果を計算する関数

    // 結果を全ての接続クライアントに送信
    io.emit("gameResult", gameResult);
  });

  socket.on("disconnect", () => {
    console.log("接続解除:", socket.id);
  });
});

interface GameResult {
  gameResult: string;
  myTitle: string;
  enemyTitle: string;
}

// 勝敗を決定する関数（簡単な例としてランダムな勝敗）
function determineWinner(myTitle: string): GameResult {
  const choices = ["グー", "パー", "チョキ"];
  const enemyTitle = choices[Math.floor(Math.random() * 3)];

  if (myTitle === enemyTitle) {
    return {
      gameResult: `引き分け`,
      myTitle,
      enemyTitle,
    };
  }

  if (
    (myTitle === "グー" && enemyTitle === "チョキ") ||
    (myTitle === "パー" && enemyTitle === "グー") ||
    (myTitle === "チョキ" && enemyTitle === "パー")
  ) {
    return {
      gameResult: `勝ち`,
      myTitle,
      enemyTitle,
    };
  }

  return {
    gameResult: `負け`,
    myTitle,
    enemyTitle,
  };
}

// サーバーを起動
const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
