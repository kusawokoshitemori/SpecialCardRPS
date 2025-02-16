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
import { useSocket } from "../components/contexts/socketContext";
import { useRouter } from "next/navigation";
import DisplayPoint from "../components/elements/point/DisplayPoint";

const Play = () => {
  const { socket, roomId, socketId } = useSocket(); // useSocketを使用

  const [myHandSrc, setMyHandSrc] = useState("");
  const [myTitle, setMyTitle] = useState("");
  const [gameResult, setGameResult] = useState<"win" | "draw" | "lose" | "">(
    ""
  );
  const [enemyHandSrc, setEnemyHandSrc] = useState("");
  const [enemyTitle, setEnemyTitle] = useState("");
  const [isDecision, setIsDecision] = useState(false);
  const [showBattleText, setShowBattleText] = useState(false); // 「勝負」というテキスト
  const [isFlipped, setIsFlipped] = useState(true); // trueなら裏面、falseなら表面
  const [specialTitle, setSpecialTitle] = useState("ミラー");
  const [gameGetPoint, setGameGetPoint] = useState<number | null>(null);
  const [items, setItems] = useState({
    グー: 2,
    チョキ: 2,
    パー: 2,
    special: 1,
  });
  const [myScore, setMyScore] = useState<number>(0);
  const [enemyScore, setEnemyScore] = useState<number>(0);
  const [isReverse, setIsReverse] = useState(false); // リバースを選択していた場合勝敗が逆転する
  const [isBanSpecialCard, setIsBanSpecialCard] = useState(false); // 相手が封印を選択していた場合特殊カードが打てなくなる
  const [enemySpecialCard, setEnemySpecialCard] = useState("");

  useEffect(() => {
    setSpecialTitle(randomSpecialTitle());
  }, []);

  const handleDisplayResult = useCallback(() => {
    setShowBattleText(true); // 勝負表示開始
    setTimeout(() => {
      setShowBattleText(false); // 2秒後に非表示
      setIsFlipped(false); // その後にフリップアクション
      if (gameGetPoint !== null)
        ScoreCount({ gameResult, gameGetPoint, setMyScore, setEnemyScore }); // この関数で点数を管理する
      console.log(`ScoreCount通った ${gameResult},${gameGetPoint}`);
      // 5秒後に全リセット
      setTimeout(() => {
        setMyHandSrc("");
        setMyTitle("");
        setGameResult("");
        setEnemyHandSrc("");
        setEnemyTitle("");
        setIsDecision(false);
        setIsFlipped(true);
        setGameGetPoint(0);
      }, 5000);
    }, 2000); // 2秒後に処理
  }, [
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
    gameGetPoint,
    gameResult,
  ]);

  useEffect(() => {
    socket?.on("round_result", (data) => {
      // リバースと封印と全知全能の確認
      if (isReverse) setIsReverse(false);
      if (isBanSpecialCard) setIsBanSpecialCard(false);

      if (socketId === data.mySocketId) {
        setEnemyTitle(data.enemyTitle2);
        setEnemyHandSrc(SearchSrc(data.enemyTitle2));
        console.log(`相手の手:${data.enemyTitle2}`);

        // リバース、封印の確認
        if (data.myTitle === "リバース") setIsReverse((prev) => !prev);
        if (data.enemyTitle2 === "リバース") setIsReverse((prev) => !prev);
        if (data.enemyTitle2 === "封印") setIsBanSpecialCard((prev) => !prev);

        // 全知全能の効力発動するかどうか
        console.log(`全知全能: ${data.myTitle}`);
        if (data.myTitle === "全知全能") {
          setEnemySpecialCard(data.mySpecial);
          console.log("動いたやった");
        }

        if (data.result === "player1") {
          // ここでsockeIdを用いてgameResultを分かりやすくする
          setGameResult("win");
          console.log("setGameResult win!!!");
        } else if (data.result === "player2") {
          setGameResult("lose");
          console.log("setGameResult lose");
        } else {
          setGameResult("draw");
          console.log("setGameResult draw");
        }
      } else {
        setEnemyTitle(data.myTitle);
        setEnemyHandSrc(SearchSrc(data.myTitle));
        console.log(`相手の手:${data.myTitle}`);
        console.log("違うんだけどー");

        // リバース、封印の確認
        if (data.enemyTitle2 === "リバース") setIsReverse((prev) => !prev);
        if (data.myTitle === "リバース") setIsReverse((prev) => !prev);
        if (data.myTitle === "封印") setIsBanSpecialCard((prev) => !prev);

        // 全知全能の効力発動するかどうか
        console.log(`全知全能: ${data.enemyTitle}`);
        if (data.enemyTitle2 === "全知全能") {
          setEnemySpecialCard(data.enemySpecial);
          console.log("動いたやった");
        }

        // ここでsockeIdを用いてgameResultを分かりやすくする
        if (data.result === "player2") setGameResult("win");
        else if (data.result === "player1") setGameResult("lose");
        else setGameResult("draw");
      }
      setGameGetPoint(data.getPoint);
    });

    return () => {
      socket?.off("round_result");
    };
  }, [socket, socketId, isReverse, isBanSpecialCard, enemySpecialCard]);

  // ゲーム終了時動作
  const router = useRouter();
  useEffect(() => {
    socket?.on("game_end", (data) => {
      console.log("data:", data);
      console.log("mySocketId check:", data.mySocketId === socketId);

      if (data.mySocketId === socketId) {
        console.log("myの方と一致しました");
        console.log(`my:${data.myPoint},enemy:${data.enemyPoint}`);
        localStorage.setItem(
          `gameData_${socketId}`,
          JSON.stringify({
            myPoint: data.myPoint,
            enemyPoint: data.enemyPoint,
          })
        );
      } else if (data.enemySocketId === socketId) {
        console.log("enemyの方と一致しました");
        console.log(`my:${data.enemyPoint},enemy:${data.myPoint}`);
        localStorage.setItem(
          `gameData_${socketId}`,
          JSON.stringify({
            myPoint: data.enemyPoint,
            enemyPoint: data.myPoint,
          })
        );
      }
      console.log("保存されたデータ:", localStorage.getItem("gameData"));

      // 3秒後に結果ページへ遷移
      const timer = setTimeout(() => {
        router.push("/result");
      }, 3000);

      return () => clearTimeout(timer);
    });
  }, [socket, router, socketId]);

  useEffect(() => {
    console.log(`${gameResult},${gameGetPoint}`);
    if (gameResult && gameGetPoint !== null) {
      handleDisplayResult();
    }
  }, [gameResult, gameGetPoint, handleDisplayResult]);

  const decisionClick = () => {
    if (isDecision) {
      alert("カードは既に選択されています");
      return;
    }
    if (myHandSrc === "") {
      alert("カードを選択してください");
      setIsDecision(false);
      return;
    }

    // グー、チョキ、パー以外はspecialとして扱う配列
    const adjustTitle = (title: string) => {
      if (title === "グー") return "グー";
      else if (title === "チョキ") return "チョキ";
      else if (title === "パー") return "パー";
      else return "special";
    };

    // 封印で禁止されている場合にフロントエンド側で特殊カードを選択できないように
    if (isBanSpecialCard && adjustTitle(myTitle) === "special") {
      alert("封印効果発動中の為、選択できません");
      return;
    }

    setIsDecision(true);

    // myTitleが「グー」や「チョキ」や「パー」の場合、そのまま、それ以外は「special」として扱う
    setItems((prevItems) => ({
      ...prevItems, // 他のキーを維持
      [adjustTitle(myTitle)]: Math.max(0, prevItems[adjustTitle(myTitle)] - 1), // 動的にキーを決めて値を減らす
    }));

    // バックエンドに出した手のデータを送る
    socket?.emit("player_choice", {
      roomName: roomId, // サーバーから受け取ったルーム名
      socketId: socketId, // 自分のソケットID
      choice: myTitle, // 選択した手
      isReverse,
      isBanSpecialCard,
      specialTitle,
    });
    console.log(
      `roomId: ${roomId}, socket.id: ${socketId}, choice: ${myTitle}, isReverse: ${isReverse}, isBunSpecialCard: ${isBanSpecialCard}`
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
    <div
      className="flex items-center justify-center flex-col bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: `url(${
          isReverse ? "/backGround/treeRed.jpg" : "/backGround/treeGreen.jpg"
        })`,
      }}
    >
      <Timer isTimerStop={isDecision} />
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
      <DisplayPoint
        myPoint={myScore}
        enemyPoint={enemyScore}
        textSizeClass="text-[100px]"
      />
      {showBattleText && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent z-50">
          <p className="text-9xl font-bold text-red-500 animate-pulse">勝負</p>
        </div>
      )}
    </div>
  );
};
export default Play;
