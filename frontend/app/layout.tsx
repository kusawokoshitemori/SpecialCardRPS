// app/layout.tsx
import "../app/globals.css";
import { SocketProvider } from "./components/contexts/socketContext";

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
        <SocketProvider>{children}</SocketProvider>
      </body>
    </html>
  );
}
