import React from "react";
import Button from "../components/elements/button/Button";
import TitleRPS from "@/app/components/features/SelectGame/TitleRPS";
import Link from "next/link";

const SelectGame = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <TitleRPS />
      <Link href="online" className="w-full flex justify-center">
        <Button
          text="オンライン"
          subText1="一人の方はこちら"
          subText2="ネットを使って世界中の人と対戦"
          bgColor="bg-sky-300"
          subTextColor="bg-blue-500"
          addClass="mt-12 mb-4"
        />
      </Link>
      <Link href="local" className="w-full flex justify-center">
        <Button
          text="ローカル"
          subText1="二人の方はこちら"
          subText2="合言葉を使って友達と対戦"
          bgColor="bg-emerald-300"
          subTextColor="bg-green-500"
          addClass="my-4"
        />
      </Link>
      <Link href="rule" className="w-full flex justify-center">
        <Button
          text="ルール"
          subText1="初めての方はこちら"
          subText2="30秒でルールを確認"
          bgColor="bg-stone-300"
          subTextColor="bg-customGray"
          addClass="my-4"
        />
      </Link>
    </div>
  );
};

export default SelectGame;
