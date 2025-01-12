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

// サンプルルート
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// Socket.IOのイベントリスナー
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
