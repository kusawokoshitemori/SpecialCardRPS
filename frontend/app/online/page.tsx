"use client";

import TitleRPS from "../components/features/SelectGame/TitleRPS";
import Button from "../components/elements/button/Button";
import { io, Socket } from "socket.io-client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRoomContext } from "../components/context/roomContext";

let socket: Socket;

const Online = () => {
  const [isMatched, setIsMatched] = useState(false);
  const { roomId, setRoomId } = useRoomContext();
  const router = useRouter();

  const handleMatchStart = () => {
    if (!socket) {
      socket = io("http://localhost:4000");
      socket.on("match_found", (data) => {
        setIsMatched(true);
        console.log("マッチング成功");

        console.log(`メッセージ: ${data.message}`);
        console.log(`対戦相手は: ${data.players}です`); // 配列が表示される
        console.log(`ルーム名: ${data.roomName}`);
        setRoomId(data.roomName);
        console.log(roomId);
      });
    }
    socket.emit("start_matching", { username: "プレイヤー１" });
  };

  // 3秒後に対戦画面に遷移 ここにsetIsMatched(false)いれてもいいかも？
  useEffect(() => {
    if (isMatched) {
      const timer = setTimeout(() => {
        router.push("/play");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isMatched, router]);

  return (
    <div className="flex flex-col justify-center items-center">
      <TitleRPS />
      <p>{isMatched ? "マッチング成功！対戦を開始します" : "待機中..."}</p>
      <Button
        text="マッチング"
        subText1="マッチングには時間がかかる場合があります"
        subText2="今すぐ試合開始"
        bgColor="bg-emerald-300"
        subTextColor="bg-green-500"
        onClick={handleMatchStart}
      />
    </div>
  );
};

export default Online;
