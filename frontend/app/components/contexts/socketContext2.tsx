"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  roomId: string;
  socketId: string;
  isMatched: boolean;
  handleMatchStart: () => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider2 = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomId, setRoomId] = useState("");
  const [socketId, setSocketId] = useState("");
  const [isMatched, setIsMatched] = useState(false);

  useEffect(() => {
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

  // テスト
  useEffect(() => {
    if (socket) {
      console.log("Socket インスタンス:", socket);
    }
  }, [socket]);

  const handleMatchStart = () => {
    if (socket) {
      socket.emit("start_matching", { username: "プレイヤー１" });
    }
  };

  return (
    <SocketContext.Provider
      value={{ socket, roomId, socketId, isMatched, handleMatchStart }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket は SocketProvider2 内で使用してください");
  }
  return context;
};
