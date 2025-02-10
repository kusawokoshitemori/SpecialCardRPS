// app/layout.tsx
import "../app/globals.css";
import { RoomProvider } from "./components/contexts/roomContext";
import { SocketProvider } from "./components/contexts/socketContext";
import { AuthProvider } from "./components/contexts/AuthContext";

export const metadata = {
  title: "特殊カードジャンケン",
  description: "心理戦2人用対戦ゲーム",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <AuthProvider>
          <SocketProvider>
            <RoomProvider>{children}</RoomProvider>
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
