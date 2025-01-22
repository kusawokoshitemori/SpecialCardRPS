"use client";

import { useState, useEffect, useCallback } from "react";
import Timer from "../components/elements/timer/timer";
import Card from "../components/elements/card/card";
import HaveCard from "../components/elements/card/haveCard";
import MiniButton from "../components/elements/button/miniButton";
import FlipCard from "../components/elements/card/flipCard";
import ReverseSide from "../components/elements/reverseSide/reverseSide";
import SearchSrc from "../components/features/Play/SearchSrc";
import randomSpecialTitle from "../components/features/Play/specialTitle";
import ScoreCount from "../components/features/Play/scoreCount";
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
  const [showBattleText, setShowBattleText] = useState(false); // 「勝負」というテキスト
  const [isFlipped, setIsFlipped] = useState(true); // trueなら裏面、falseなら表面
  const { roomId } = useRoomContext(); // ContextからroomIdを取り出す
  const { socketId } = useSocketContext();
  const [specialTitle, setSpecialTitle] = useState("ミラー");
  const [items, setItems] = useState({
    グー: 2,
    チョキ: 2,
    パー: 2,
    special: 1,
  });
  const [myScore, setMyScore] = useState<number>(0);
  const [enemyScore, setEnemyScore] = useState<number>(0);

  useEffect(() => {
    setSpecialTitle(randomSpecialTitle());
  }, []);

  useEffect(() => {
    if (roomId) {
      socket.emit("reEnter", { roomId });
      console.log(`再参加リクエスト送信: roomId = ${roomId}`);
    }
  }, [roomId]);

  const handleDisplayResult = useCallback(() => {
    setShowBattleText(true); // 勝負表示開始
    setTimeout(() => {
      setShowBattleText(false); // 2秒後に非表示
      setIsFlipped(false); // その後にフリップアクション
      ScoreCount({ myTitle, enemyTitle, setMyScore, setEnemyScore });
      console.log(`ScoreCount通った ${myScore},${enemyScore}`);
      // 5秒後に全リセット
      setTimeout(() => {
        setMyHandSrc("");
        setMyTitle("");
        setGameResult("");
        setEnemyHandSrc("");
        setEnemyTitle("");
        setIsDecision(false);
        setIsFlipped(true);
      }, 5000);
    }, 2000); // 2秒後に処理
  }, [
    myTitle,
    enemyTitle,
    setMyScore,
    setEnemyScore,
    setShowBattleText,
    setIsFlipped,
    setMyHandSrc,
    setMyTitle,
    setGameResult,
    setEnemyHandSrc,
    setEnemyTitle,
    setIsDecision,
    myScore,
    enemyScore,
  ]);

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
      handleDisplayResult();

      console.log("round_result通った");
      console.log(`myTitle: ${myTitle}, data.enemyTitle1: ${data.enemyTitle1}`);
    });

    // クリーンアップ
    return () => {
      socket.off("round_result");
    };
  }, [myTitle, handleDisplayResult]);

  const decisionClick = () => {
    console.log(myHandSrc);
    if (isDecision) {
      alert("カードは既に選択されています");
      return;
    }
    if (myHandSrc === "") {
      alert("カードを選択してください");
      setIsDecision(false);
      return;
    }
    setIsDecision(true);

    // グー、チョキ、パー以外はspecialとして扱う配列
    const adjustTitle = (title: string) => {
      if (title === "グー") return "グー";
      else if (title === "チョキ") return "チョキ";
      else if (title === "パー") return "パー";
      else return "special";
    };

    // myTitleが「グー」や「チョキ」や「パー」の場合、そのまま、それ以外は「special」として扱う
    setItems((prevItems) => ({
      ...prevItems, // 他のキーを維持
      [adjustTitle(myTitle)]: Math.max(0, prevItems[adjustTitle(myTitle)] - 1), // 動的にキーを決めて値を減らす
    }));

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
  const specialCardClick = () => {
    if (isDecision) return;
    setMyHandSrc(SearchSrc(specialTitle));
    setMyTitle(specialTitle);
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
        <FlipCard
          imageSrc={enemyHandSrc}
          title={enemyTitle}
          isFlipped={isFlipped}
        />
      </div>
      <div className="flex flex-row">
        <HaveCard
          imageSrc="/images/rock.png"
          title="グー"
          haveItem={items["グー"]}
          onClick={rockCardClick}
        />
        <HaveCard
          imageSrc="/images/scissors.png"
          title="チョキ"
          haveItem={items["チョキ"]}
          onClick={scissorsCardClick}
        />
        <HaveCard
          imageSrc="/images/paper.png"
          title="パー"
          haveItem={items["パー"]}
          onClick={paperCardClick}
        />
        <HaveCard
          imageSrc={SearchSrc(specialTitle)}
          title={specialTitle}
          haveItem={items["special"]}
          onClick={specialCardClick}
        />
      </div>
      <MiniButton text="決定" handleClick={decisionClick} />
      <div>結果 : {gameResult}</div>
      <div>相手の手 : {enemyTitle}</div>
      <div>
        今の点数: あなた: {myScore}, 相手: {enemyScore}
      </div>
      {showBattleText && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent z-50">
          <p className="text-9xl font-bold text-red-500 animate-pulse">勝負</p>
        </div>
      )}
    </div>
  );
};
export default Play;
