"use client";

import Card from "../components/elements/card/card";
import HaveCard from "../components/elements/card/haveCard";
import MiniButton from "../components/elements/button/miniButton";
import FlipCard from "../components/elements/card/flipCard";

const Play = () => {
  const myHandSrc = "/images/rock.png";
  const myTitle = "グー";
  const enemyHand = "/images/paper.png";
  const enemyTitle = "パー";

  const handleClick = () => {
    console.log("ボタンがクリックされました！");
  };
  return (
    <div className="flex items-center justify-center flex-col">
      <div>タイマー</div>
      <div className="flex flex-row">
        {/* 自分のカード */}
        <Card imageSrc={myHandSrc} title={myTitle} />
        {/* 相手のカード */}
        <FlipCard imageSrc={enemyHand} title={enemyTitle} />
      </div>
      <div className="flex flex-row">
        <HaveCard imageSrc="/images/rock.png" title="グー" haveItem={2} />
        <HaveCard imageSrc="/images/scissors.png" title="チョキ" haveItem={2} />
        <HaveCard imageSrc="/images/paper.png" title="パー" haveItem={2} />
        <div>持っているカード4</div>
      </div>
      <MiniButton text="決定" handleClick={handleClick} />
    </div>
  );
};
export default Play;
