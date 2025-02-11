import { Dispatch, SetStateAction } from "react";

interface ScoreCountProps {
  gameResult: "win" | "draw" | "lose" | "";
  gameGetPoint: number;
  setMyScore: Dispatch<SetStateAction<number>>;
  setEnemyScore: Dispatch<SetStateAction<number>>;
}

const ScoreCount = ({
  gameResult,
  gameGetPoint,
  setMyScore,
  setEnemyScore,
}: ScoreCountProps) => {
  console.log("今から処理を開始します");
  if (gameResult === "win") {
    setMyScore((prev) => prev + gameGetPoint);
  } else if (gameResult === "lose") {
    setEnemyScore((prev) => prev + gameGetPoint);
  } else if (gameResult === "draw") {
    console.log(`引き分けです${gameResult}`);
  } else {
    console.log(`処理できませんでした${gameResult}`);
  }
};
export default ScoreCount;
