"use client";
interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  const handleClick = () => {
    console.log("ボタンが押されました");
  };
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  );
};

export default Button;
