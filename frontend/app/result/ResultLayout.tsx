"use client";
import Button from "../components/elements/button/Button";
import { useRouter } from "next/navigation";
import DisplayPoint from "../components/elements/point/DisplayPoint";

const ResultLayout = ({
  gameData,
}: {
  gameData: { myPoint: number; enemyPoint: number } | null;
}) => {
  // タイトル画面に戻る
  const router = useRouter();
  const handleBackTitle = () => {
    router.push("selectGame");
  };
  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-6xl py-8">Result</h1>
      {gameData ? (
        <DisplayPoint
          myPoint={gameData.myPoint}
          enemyPoint={gameData.enemyPoint}
          textSizeClass="text-[200px]"
        />
      ) : (
        <p className="flex items-center justify-center">Loading...</p>
      )}
      <Button
        text="タイトルへ"
        subText1="試合選択画面に戻ります"
        subText2="ゲーム選択画面へ"
        bgColor="bg-emerald-300"
        subTextColor="bg-green-500"
        addClass="my-16"
        onClick={handleBackTitle}
      />
    </div>
  );
};

export default ResultLayout;
