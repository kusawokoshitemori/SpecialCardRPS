import React, { useState, useEffect } from "react";

interface TimerProps {
  isTimerStop: boolean;
  setRandomSelectCard: React.Dispatch<React.SetStateAction<boolean>>;
}

const Timer = ({ isTimerStop, setRandomSelectCard }: TimerProps) => {
  const [seconds, setSeconds] = useState(60); // カウントダウンの秒数
  useEffect(() => {
    if (isTimerStop === true) return;

    if (seconds === 0) {
      setRandomSelectCard(true);
      return;
    }
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds, isTimerStop, setRandomSelectCard]);

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="font-bold text-2xl">残り</p>
      <div className="bg-indigo-800 text-white text-4xl font-bold rounded-lg h-16 flex items-center justify-center p-4 my-4">
        {String(seconds).padStart(3, "0")}
      </div>
    </div>
  );
};

export default Timer;
