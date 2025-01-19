"use client";

import { useState, useEffect } from "react";
import Timer from "../components/elements/timer/timer";
import Card from "../components/elements/card/card";
import HaveCard from "../components/elements/card/haveCard";
import MiniButton from "../components/elements/button/miniButton";
import FlipCard from "../components/elements/card/flipCard";
import ReverseSide from "../components/elements/reverseSide/reverseSide";
import SearchSrc from "../components/features/Play/SearchSrc";
import io from "socket.io-client";

const socket = io("http://localhost:4000"); //ここにはサーバーのURLが入る

interface GameResult {
  gameResult: string;
  myTitle: string;
  enemyTitle: string;
}

const Play = () => {
  const [myHandSrc, setMyHandSrc] = useState("");
  const [myTitle, setMyTitle] = useState("");
  const [gameResult, setGameResult] = useState(""); // 結果を使ったら空の文字列にする
  const [enemyHandSrc, setEnemyHandSrc] = useState(""); // 結果を使ったら空の文字列にする
  const [enemyTitle, setEnemyTitle] = useState(""); // 結果を使ったら空の文字列にする
  const [isDecision, setIsDecision] = useState(false);

  useEffect(() => {
    // サーバーからのゲーム結果を受け取る
    socket.on("gameResult", (result: GameResult) => {
      setGameResult(result.gameResult); // ゲームの結果メッセージ
      setEnemyTitle(result.enemyTitle); // （敵の手に対応するタイトルなど）
      setEnemyHandSrc(SearchSrc(result.enemyTitle)); // 対応した関数を制作し呼び出す
    });

    return () => {
      socket.off("gameResult");
    };
  }, []);

  const decisionClick = () => {
    console.log(myHandSrc);
    if (myHandSrc === "") {
      alert("カードを選択してください");
      setIsDecision(false);
      return;
    }
    setIsDecision(true);

    // バックエンドに出した手のデータを送る
    socket.emit("playerChoice", { player: "Player 1", myTitle });
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
        <FlipCard imageSrc={enemyHandSrc} title={enemyTitle} />
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
      <div>{gameResult}</div>
    </div>
  );
};
export default Play;
