import React from "react";
import Button from "../components/elements/button/Button";
import TitleRPS from "@/features/SelectGame/TitleRPS";

const SelectGame = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <TitleRPS />
      <Button
        text="オンライン"
        subText1="一人の方はこちら"
        subText2="ネットを使って世界中の人と対戦"
        bgColor="bg-sky-300"
        subTextColor="bg-blue-500"
      />
      <Button
        text="ローカル"
        subText1="二人の方はこちら"
        subText2="合言葉を使って友達と対戦"
        bgColor="bg-emerald-300"
        subTextColor="bg-green-500"
      />
      <Button
        text="ルール"
        subText1="初めての方はこちら"
        subText2="30秒でルールを確認"
        bgColor="bg-stone-300"
        subTextColor="bg-customGray"
      />
    </div>
  );
};

export default SelectGame;
