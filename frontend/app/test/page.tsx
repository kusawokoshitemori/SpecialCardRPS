"use client";

import { io } from "socket.io-client";
import { useState } from "react";

const socket = io("http://localhost:4000");

const Test = () => {
  const [message, setMessage] = useState("メッセージだよ");
  const handleClick = () => {
    socket.emit("send_message", { message: message });
  };
  const ChengeClick = () => {
    setMessage("二度目のメッセージ");
  };
  return (
    <div>
      <p>ここにテキスト</p>
      <button onClick={handleClick}>クリック</button>
      <button onClick={ChengeClick}>文字変更</button>
    </div>
  );
};
export default Test;
