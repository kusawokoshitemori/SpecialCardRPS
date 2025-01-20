"use client";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import TitleRPS from "../components/features/SelectGame/TitleRPS";
import Button from "../components/elements/button/Button";

const socket = io("http://localhost:4000");

const Online = () => {
  const [isMatching, setIsMatching] = useState(false);
  const [opponent, setOpponent] = useState<string | null>(null);

  useEffect(() => {
    // 対戦相手が見つかった場合の処理
    socket.on("startGame", (data: { enemy: string }) => {
      setOpponent(data.enemy);
      setIsMatching(false);
      alert(`対戦相手が見つかりました！相手ID: ${data.enemy}`);
    });

    // クリーンアップ
    return () => {
      socket.off("startGame");
    };
  }, []);

  const handleClick = () => {
    setIsMatching(true);
    socket.emit("joinGame");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <TitleRPS />
      {opponent ? (
        <p>対戦相手が見つかりました！ 相手ID: {opponent}</p>
      ) : isMatching ? (
        <p>マッチング中...</p>
      ) : (
        <Button
          text="マッチング"
          subText1="マッチングには時間がかかる場合があります"
          subText2="今すぐ試合開始"
          bgColor="bg-emerald-300"
          subTextColor="bg-green-500"
          onClick={handleClick}
        />
      )}
    </div>
  );
};

export default Online;
