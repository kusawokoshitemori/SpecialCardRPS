"use client";

import { useRouter } from "next/navigation";
import Button from "./components/elements/button/Button";
import TitleRPS from "./components/features/SelectGame/TitleRPS";

const Page = () => {
  const router = useRouter();
  const moveGameSelect = () => {
    router.push("selectGame");
  };
  return (
    <div className="flex justify-center items-center flex-col">
      <TitleRPS />
      <Button
        text="ゲームスタート"
        subText1="ゲームセレクト画面に移動します"
        subText2="まずはここをクリック"
        bgColor="bg-lime-300"
        subTextColor="bg-green-400"
        addClass="my-16"
        onClick={moveGameSelect}
      />
    </div>
  );
};

export default Page;
