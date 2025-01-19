"use client";

import { useState } from "react";
import MiniButton from "../button/miniButton";
import Card from "./card";
import ReverseSide from "../reverseSide/reverseSide";
interface FlipProps {
  imageSrc: string;
  title: string;
}

const FlipCard = ({ imageSrc, title }: FlipProps) => {
  // isFlippedがtrueなら裏面、falseなら表面
  const [isFlipped, setIsFlipped] = useState(true);

  // カードの裏返し処理
  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
    console.log("裏返しました");
  };

  if (imageSrc === "")
    return <ReverseSide imageSrc="/images/reverseCard.png" />;
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
          imageSrc={imageSrc}
          title={title}
          className="absolute overflow-hidden backface-hidden"
        />
        {/* 裏面 */}
        <ReverseSide imageSrc="/images/reverseCard.png" />
      </div>

      {/* ボタンで裏返す */}
      <MiniButton text="裏返す" handleClick={toggleFlip} />
    </div>
  );
};

export default FlipCard;
