"use client";

import { useState, useEffect } from "react";
import Timer from "../components/elements/timer/timer";
import Card from "../components/elements/card/card";
import HaveCard from "../components/elements/card/haveCard";
import MiniButton from "../components/elements/button/miniButton";
import FlipCard from "../components/elements/card/flipCard";
import ReverseSide from "../components/elements/reverseSide/reverseSide";
import SearchSrc from "../components/features/Play/SearchSrc";
import { useRoomContext } from "../components/context/roomContext";
import { useSocketContext } from "../components/context/socketContext";
import io from "socket.io-client";

const socket = io("http://localhost:4000"); //ここにはサーバーのURLが入る

const Play = () => {
  const [myHandSrc, setMyHandSrc] = useState("");
  const [myTitle, setMyTitle] = useState("");
  const [gameResult, setGameResult] = useState(""); // 結果を使ったら空の文字列にする
  const [enemyHandSrc, setEnemyHandSrc] = useState(""); // 結果を使ったら空の文字列にする
  const [enemyTitle, setEnemyTitle] = useState(""); // 結果を使ったら空の文字列にする
  const [isDecision, setIsDecision] = useState(false);
  const { roomId } = useRoomContext(); // ContextからroomIdを取り出す
  const { socketId } = useSocketContext();

  useEffect(() => {
    if (roomId) {
      socket.emit("reEnter", { roomId });
      console.log(`再参加リクエスト送信: roomId = ${roomId}`);
    }
  }, [roomId]);

  useEffect(() => {
    // サーバーからの "round_result" イベントをリッスン
    socket.on("round_result", (data) => {
      if (myTitle === data.enemyTitle1) {
        setEnemyTitle(data.enemyTitle2);
        setEnemyHandSrc(SearchSrc(data.enemyTitle2));
      } else {
        setEnemyTitle(data.enemyTitle1);
        setEnemyHandSrc(SearchSrc(data.enemyTitle1));
      }
      setGameResult(data.result);

      console.log("round_result通った");
      console.log(`myTitle: ${myTitle}, data.enemyTitle1: ${data.enemyTitle1}`);
    });

    // クリーンアップ
    return () => {
      socket.off("round_result");
    };
  }, [myTitle]);

  const decisionClick = () => {
    console.log(myHandSrc);
    if (myHandSrc === "") {
      alert("カードを選択してください");
      setIsDecision(false);
      return;
    }
    setIsDecision(true);

    // バックエンドに出した手のデータを送る
    socket.emit("player_choice", {
      roomName: roomId, // サーバーから受け取ったルーム名
      playerId: socketId, // 自分のソケットID
      choice: myTitle, // 選択した手
    });
    console.log(
      `roomId: ${roomId}, socket.id: ${socketId}, choice: ${myTitle}`
    );
  };
  const handleTest = () => {
    console.log(`今のsocket.id : ${socketId}`);
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
      <div>結果 : {gameResult}</div>
      <div>相手の手 : {enemyTitle}</div>
      <MiniButton text="text用" handleClick={handleTest} />
    </div>
  );
};
export default Play;
