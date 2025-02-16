"use client";
import { useEffect, useState } from "react";
import { useSocket } from "../components/contexts/socketContext";
import ResultLayout from "./ResultLayout";

const Result = () => {
  const { socketId } = useSocket(); // useSocketを使用
  const [gameData, setGameData] = useState<{
    myPoint: number;
    enemyPoint: number;
  } | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem(`gameData_${socketId}`);

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setGameData(parsedData);
    }
  }, [socketId]);

  return (
    <div>
      <ResultLayout gameData={gameData} />;
      {gameData ? (
        <div>
          <p>My Point: {gameData.myPoint}</p>
          <p>Enemy Point: {gameData.enemyPoint}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Result;
