// 勝敗判定関数
const determineWinner = (myTitle: string, enemyTitle: string) => {
  if (myTitle === enemyTitle) return "draw";
  if (myTitle === "封印" || enemyTitle === "封印") return "draw";
  if (myTitle === "ミラー") {
    if (
      enemyTitle === "グー" ||
      enemyTitle === "チョキ" ||
      enemyTitle === "パー"
    ) {
      return "player2";
    } else {
      return "player1win";
    }
  }
  if (enemyTitle === "ミラー") {
    if (myTitle === "グー" || myTitle === "チョキ" || myTitle === "パー") {
      return "player1";
    } else {
      return "player2win";
    }
  }
  if (myTitle === "全知全能") return "draw";
  if (myTitle === "リバース" || enemyTitle === "リバース") return "draw";
  if (myTitle === "無限パー") {
    if (enemyTitle === "グー") return "player1player1"; // 2ポイント
    else if (enemyTitle === "チョキ") return "player2";
    else return "draw";
  }

  if (enemyTitle === "全知全能") return "draw";
  if (enemyTitle === "無限パー") {
    if (myTitle === "グー") {
      return "player2player2"; // 2ポイント
    } else if (myTitle === "チョキ") {
      return "player1";
    } else {
      return "draw";
    }
  }

  if (
    (myTitle === "グー" && enemyTitle === "チョキ") ||
    (myTitle === "チョキ" && enemyTitle === "パー") ||
    (myTitle === "パー" && enemyTitle === "グー")
  ) {
    return "player1";
  }
  return "player2";
};
export default determineWinner;
