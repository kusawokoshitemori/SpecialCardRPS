"use client";

import { useState } from "react";
import MiniButton from "../button/miniButton";
import Card from "./card";

const FlipCard = () => {
  // isFlippedがtrueなら裏面、falseなら表面
  const [isFlipped, setIsFlipped] = useState(false);

  // カードの裏返し処理
  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
    console.log("裏返しました");
  };

  return (
    <div className="relative w-32 h-48 perspective-1000">
      {/* 3D回転を持つカード */}
      <div
        className={`w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* 表面 */}
        <Card
          imageSrc="/images/rock.png"
          title="グー"
          className="absolute overflow-hidden backface-hidden"
        />
        {/* 裏面 */}
        <Card
          imageSrc="/images/paper.png"
          title="パー"
          className="absolute overflow-hidden backface-hidden rotate-y-180"
        />
      </div>

      {/* ボタンで裏返す */}
      <MiniButton text="裏返す" handleClick={toggleFlip} />
    </div>
  );
};

export default FlipCard;
