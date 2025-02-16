"use client";
import Button from "../components/elements/button/Button";

const ResultLayout = ({
  gameData,
}: {
  gameData: { myPoint: number; enemyPoint: number } | null;
}) => {
  const handleBackTitle = () => {
    console.log("後でゲーム制作画面に戻る機能つける");
  };
  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-6xl py-8">Result</h1>
      {gameData ? (
        <div className="flex justify-center items-center">
          <div className="flex items-center justify-center flex-col">
            <p className="text-[200px] font-bold">{gameData.myPoint}</p>
            <p className="text-bold text-3xl">あなた</p>
          </div>

          <p className="text-[100px] font-bold mx-12">vs</p>
          <div className="flex items-center justify-center flex-col">
            <p className="text-[200px] font-bold">{gameData.enemyPoint}</p>
            <p className="text-bold text-3xl">相手</p>
          </div>
        </div>
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
