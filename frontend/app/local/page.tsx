"use client";
import TitleRPS from "../components/features/SelectGame/TitleRPS";
import Button from "../components/elements/button/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "../components/contexts/socketContext";

const Local = () => {
  const { isMatched, handleRocalMatchStart } = useSocket();
  const [roomKey, setRoomKey] = useState("");
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
      <p>{isMatched ? "マッチング成功！対戦を開始します" : "待機中..."}</p>
      <textarea
        className="py-3 px-4 block w-2/3 border-gray-200 rounded-lg text-2xl focus:border-blue-500 focus:ring-blue-500 hover:border-blue-300 disabled:opacity-50 disabled:pointer-events-none"
        rows={2}
        placeholder="合言葉を入力してください"
        value={roomKey} // stateとバインド
        onChange={(e) => setRoomKey(e.target.value)} // 入力値をstateに反映
      ></textarea>

      <Button
        text="マッチング"
        subText1="合言葉を入力した後にボタンを押してください"
        subText2="友達と対戦"
        bgColor="bg-amber-300"
        subTextColor="bg-yellow-600"
        addClass="my-4"
        onClick={() => handleRocalMatchStart(roomKey)}
      />
    </div>
  );
};

export default Local;
