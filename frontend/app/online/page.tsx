"use client";

import TitleRPS from "../components/features/SelectGame/TitleRPS";
import Button from "../components/elements/button/Button";
import { io, Socket } from "socket.io-client";
import { useState } from "react";

let socket: Socket;

const Online = () => {
  const [isMatched, setIsMatched] = useState(false);

  const handleMatchStart = () => {
    if (!socket) {
      socket = io("http://localhost:4000");
      socket.on("match_found", () => {
        setIsMatched(true);
        console.log("マッチング成功");
      });
    }
    socket.emit("start_matching", { username: "プレイヤー１" });
  };

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
