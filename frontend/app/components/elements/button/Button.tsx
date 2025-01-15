"use client";

interface ButtonProps {
  text: string;
  subText1: string;
  subText2: string;
  bgColor: string;
  subTextColor: string;
  onClick?: () => void;
}

const Button = ({
  text,
  subText1,
  subText2,
  bgColor,
  subTextColor,
  onClick,
}: ButtonProps) => {
  const handleClick = () => {
    console.log(`${text}ボタンが押されました`);
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      className={`w-2/3 h-36 ${bgColor} text-white flex items-start justify-center rounded-lg cursor-pointer border-2 blue-text-outline border-blue-900 focus:outline-none focus:ring-2 relative`}
    >
      <span className="text-4xl mt-4 font-bold">{text}</span>
      <div
        className={`absolute bottom-1/4 w-[98%] h-1/4 ${subTextColor} text-white flex items-center justify-end pr-4 cursor-pointer`}
      >
        {subText1}
      </div>
      <div
        className={`absolute bottom-0 w-[98%] h-1/4 ${bgColor} text-white flex items-center justify-center rounded-lg cursor-pointer text-2xl font-bold`}
      >
        {subText2}
      </div>
    </div>
  );
};

export default Button;
