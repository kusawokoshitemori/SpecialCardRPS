// app/layout.tsx
import "../app/globals.css";
import { RoomProvider } from "./components/context/roomContext";
import { SocketProvider } from "./components/context/socketContext";

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
        <SocketProvider>
          <RoomProvider>{children}</RoomProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
