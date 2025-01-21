"use client";

// context/SocketContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface SocketContextType {
  socketId: string;
  setSocketId: (id: string) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socketId, setSocketId] = useState<string>("");

  return (
    <SocketContext.Provider value={{ socketId, setSocketId }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
};
