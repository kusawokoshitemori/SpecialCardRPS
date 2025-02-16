import React, { useState, useEffect } from "react";

interface TimerProps {
  isTimerStop: boolean;
}

const Timer = ({ isTimerStop }: TimerProps) => {
  const [seconds, setSeconds] = useState(60); // カウントダウンの秒数
  useEffect(() => {
    if (seconds === 0 || isTimerStop === true) return;

    const intervalId = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds, isTimerStop]);

  return (
    <div>
      <p>{seconds} 秒</p>
    </div>
  );
};

export default Timer;
