import { Dispatch, SetStateAction } from "react";
import determineWinner from "./determineWinner";

interface ScoreCountProps {
  myTitle: string;
  enemyTitle: string;
  setMyScore: Dispatch<SetStateAction<number>>;
  setEnemyScore: Dispatch<SetStateAction<number>>;
}

const ScoreCount = ({
  myTitle,
  enemyTitle,
  setMyScore,
  setEnemyScore,
}: ScoreCountProps) => {
  const gameResult = determineWinner(myTitle, enemyTitle);
  if (gameResult === "player1") {
    setMyScore((prevScore) => prevScore + 1);
    console.log("player1が1ポイントを獲得しました");
  } else if (gameResult === "player2") {
    setEnemyScore((prevScore) => prevScore + 1);
    console.log("player2が1ポイントを獲得しました");
  } else if (gameResult === "draw") {
    console.log("引き分けです");
  } else if (gameResult === "player1player1") {
    setMyScore((prevScore) => prevScore + 2);
    console.log("player1が2ポイント獲得しました");
  } else if (gameResult === "player2player2") {
    setEnemyScore((prevScore) => prevScore + 2);
    console.log("player2が2ポイントを獲得しました");
  } else if (gameResult === "player1win") {
    setMyScore((prevScore) => prevScore + 3);
    console.log("player1が3ポイントを獲得しました");
  } else if (gameResult === "player2win") {
    setEnemyScore((prevScore) => prevScore + 3);
    console.log("player2が3ポイントを獲得しました");
  } else {
    console.log(`誰もポイントを獲得しませんでした ${gameResult}`);
  }
};
export default ScoreCount;
