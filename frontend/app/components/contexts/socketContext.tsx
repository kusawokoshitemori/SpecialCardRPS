"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  roomId: string;
  socketId: string;
  isMatched: boolean;
  handleMatchStart: () => void;
  handleRocalMatchStart: (roomKey: string) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomId, setRoomId] = useState("");
  const [socketId, setSocketId] = useState("");
  const [isMatched, setIsMatched] = useState(false);

  useEffect(() => {
    console.log("環境変数一覧:", process.env); // 消す
    console.log("API URL:", process.env.REACT_APP_API_URL); // 消す

    const newSocket = io("http://localhost:4000", {
      autoConnect: true,
      reconnection: true,
    });

    newSocket.on("connect", () => {
      console.log("Socket 接続成功:", newSocket.id);
      setSocketId(newSocket.id || "");
    });

    newSocket.on("match_found", (data) => {
      setIsMatched(true);
      console.log("マッチング成功");

      console.log(`メッセージ: ${data.message}`);
      console.log(`対戦相手は: ${data.players}です`);
      console.log(`ルーム名: ${data.roomName}`);

      setRoomId(data.roomName);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // オンライン対戦の時これ使用
  const handleMatchStart = () => {
    if (socket) {
      socket.emit("start_matching", {
        username: "オンラインプレイヤー",
        roomKey: "defaultwwkusawwwkusaww",
      });
    }
  };
  // ローカル対戦の時これ使用
  const handleRocalMatchStart = (roomKey: string) => {
    if (socket) {
      socket.emit("start_matching", {
        username: "ローカルプレイヤー",
        roomKey: roomKey,
      });
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        roomId,
        socketId,
        isMatched,
        handleMatchStart,
        handleRocalMatchStart,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket は SocketProvider 内で使用してください");
  }
  return context;
};
