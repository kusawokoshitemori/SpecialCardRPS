import { createContext, useContext, useState, ReactNode } from "react";

// コンテキストの型を定義
type AuthContextType = {
  userId: string;
  username: string;
  isAuthenticated: boolean;
  login: (id: string, name: string) => void;
};

// 初期値の定義
const defaultAuthContext: AuthContextType = {
  userId: "",
  username: "",
  isAuthenticated: false,
  login: () => {}, // 空の関数を用意
};

// コンテキストを作成
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (id: string, name: string) => {
    setUserId(id);
    setUsername(name);
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ userId, username, isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
};

// カスタムフック
export const useAuthContext = () => useContext(AuthContext);
