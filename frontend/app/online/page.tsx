"use client";

import TitleRPS from "../components/features/SelectGame/TitleRPS";
import Button from "../components/elements/button/Button";

const Online = () => {
  const handleClick = () => {
    console.log("クリックしました");
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <TitleRPS />
      <Button
        text="マッチング"
        subText1="マッチングには時間がかかる場合があります"
        subText2="今すぐ試合開始"
        bgColor="bg-emerald-300"
        subTextColor="bg-green-500"
        onClick={handleClick}
      />
    </div>
  );
};

export default Online;
