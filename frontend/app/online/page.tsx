"use client";

import TitleRPS from "../components/features/SelectGame/TitleRPS";
import Button from "../components/elements/button/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "../components/contexts/socketContext"; // 新しくsocketの機能をContextで行ってくれるやつ

const Online = () => {
  const [waitMatch, setWaitMatch] = useState<boolean>(false);

  const { isMatched, handleMatchStart } = useSocket();
  const router = useRouter();

  // 3秒後に対戦画面に遷移
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
      <p>
        {isMatched
          ? "マッチング成功！対戦を開始します"
          : waitMatch
          ? "マッチング待機中..."
          : ""}
      </p>
      <Button
        text="マッチング"
        subText1="マッチングには時間がかかる場合があります"
        subText2="今すぐ試合開始"
        bgColor="bg-emerald-300"
        subTextColor="bg-green-500"
        onClick={() => {
          setWaitMatch((prev) => !prev);
          handleMatchStart();
        }}
      />
    </div>
  );
};

export default Online;
// {handleMatchStart}
