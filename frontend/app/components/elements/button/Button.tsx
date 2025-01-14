"use client";
interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  const handleClick = () => {
    console.log("ボタンが押されました");
  };
  return (
    <div
      onClick={handleClick}
      role="button"
      className="w-2/3 h-36 bg-sky-300 text-white flex items-start justify-center rounded-lg cursor-pointer border-2 blue-text-outline border-blue-900 focus:outline-none focus:ring-2 relative"
    >
      <span className="text-4xl mt-4 font-bold">{text}</span>
      {/* ⤴レスポンシブ対応させる */}
      <div className="absolute bottom-1/4 w-[98%] h-1/4 bg-blue-500 text-white flex items-center justify-end pr-4 cursor-pointer">
        一人の方はこちら
      </div>
      <div className="absolute bottom-0 w-[98%] h-1/4 bg-sky-300 text-white flex items-center justify-center rounded-lg cursor-pointer text-2xl font-bold ">
        ネットを使って世界中の人と対戦
      </div>
    </div>
  );
};

export default Button;
