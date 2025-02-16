"use client";
import { useEffect, useState } from "react";
import { useSocket } from "../components/contexts/socketContext2";

const Result = () => {
  const { socketId } = useSocket(); // useSocketを使用
  const [gameData, setGameData] = useState<{
    myPoint: number;
    enemyPoint: number;
  } | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem(`gameData_${socketId}`);
    console.log("Stored Data:", storedData); // localStorageから取得したデータを確認

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log("Parsed Data:", parsedData); // パース後のデータを確認
      setGameData(parsedData); // localStorage からデータを取得してセット
    }
  }, [socketId]);

  return (
    <div>
      <h1>Result</h1>
      {gameData ? (
        <>
          <p>My Point: {gameData.myPoint}</p>
          <p>Enemy Point: {gameData.enemyPoint}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Result;
