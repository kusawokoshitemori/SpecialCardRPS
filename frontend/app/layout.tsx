// app/layout.tsx
import "../app/globals.css";
import { RoomProvider } from "./components/contexts/roomContext"; // roomIdを保存するContext 削除予定
import { SocketProvider } from "./components/contexts/socketContext"; // socketIdを保存するContext 削除予定
import { SocketProvider2 } from "./components/contexts/socketContext2";

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
        <SocketProvider2>
          <SocketProvider>
            <RoomProvider>{children}</RoomProvider>
          </SocketProvider>
        </SocketProvider2>
      </body>
    </html>
  );
}
