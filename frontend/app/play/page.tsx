"use client";

import { useState } from "react";
import Timer from "../components/elements/timer/timer";
import Card from "../components/elements/card/card";
import HaveCard from "../components/elements/card/haveCard";
import MiniButton from "../components/elements/button/miniButton";
import FlipCard from "../components/elements/card/flipCard";
import ReverseSide from "../components/elements/reverseSide/reverseSide";

const Play = () => {
  const [myHandSrc, setMyHandSrc] = useState("");
  const [myTitle, setMyTitle] = useState("");
  const [isDecision, setIsDecision] = useState(false);
  const enemyHand = "/images/paper.png";
  const enemyTitle = "パー";

  const decisionClick = () => {
    console.log(myHandSrc);
    if (myHandSrc === "") {
      alert("カードを選択してください");
      setIsDecision(false);
      return;
    }
    setIsDecision(true);
  };
  const rockCardClick = () => {
    if (isDecision) return;
    setMyHandSrc("/images/rock.png");
    setMyTitle("グー");
  };
  const scissorsCardClick = () => {
    if (isDecision) return;
    setMyHandSrc("/images/scissors.png");
    setMyTitle("チョキ");
  };
  const paperCardClick = () => {
    if (isDecision) return;
    setMyHandSrc("/images/paper.png");
    setMyTitle("パー");
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <Timer />
      <div className="flex flex-row">
        {/* 自分のカード */}
        {myHandSrc ? (
          <Card imageSrc={myHandSrc} title={myTitle} />
        ) : (
          <ReverseSide imageSrc="/images/reverseCard.png" />
        )}
        {/* 相手のカード */}
        <FlipCard imageSrc={enemyHand} title={enemyTitle} />
      </div>
      <div className="flex flex-row">
        <HaveCard
          imageSrc="/images/rock.png"
          title="グー"
          haveItem={2}
          onClick={rockCardClick}
        />
        <HaveCard
          imageSrc="/images/scissors.png"
          title="チョキ"
          haveItem={2}
          onClick={scissorsCardClick}
        />
        <HaveCard
          imageSrc="/images/paper.png"
          title="パー"
          haveItem={2}
          onClick={paperCardClick}
        />
        <div>持っているカード4</div>
      </div>
      <MiniButton text="決定" handleClick={decisionClick} />
    </div>
  );
};
export default Play;
