"use client";

import Card from "./card";
import ReverseSide from "../reverseSide/reverseSide";
interface FlipProps {
  imageSrc: string;
  title: string;
  isFlipped: boolean;
}

const FlipCard = ({ imageSrc, title, isFlipped }: FlipProps) => {
  if (imageSrc === "")
    return <ReverseSide imageSrc="/images/reverseCard.png" />;
  return (
    <div className="relative w-32 h-48 perspective-1000">
      {/* 3D回転を持つカード */}
      <div
        className={`w-full h-full transition-transform duration-1000 transform-style-preserve-3d ${
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
    </div>
  );
};

export default FlipCard;
