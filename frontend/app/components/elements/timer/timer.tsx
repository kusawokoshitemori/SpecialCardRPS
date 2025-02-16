import React, { useState, useEffect } from "react";
import { Dispatch, SetStateAction } from "react";

interface TimerProps {
  isTimerStop: boolean;
  setIsTimerStop: Dispatch<SetStateAction<boolean>>;
}

const Timer = ({ isTimerStop, setIsTimerStop }: TimerProps) => {
  const [seconds, setSeconds] = useState(60); // カウントダウンの秒数
  useEffect(() => {
    if (seconds === 0 || isTimerStop === true) return;

    const intervalId = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds, isTimerStop]);

  const handleClick = () => {
    setIsTimerStop(true);
  };

  return (
    <div>
      <p>{seconds} 秒</p>
      <button onClick={handleClick}>タイマーストップ</button>
    </div>
  );
};

export default Timer;
