import Image from "next/image";
import classNames from "classnames";
import ReverseSide from "../reverseSide/reverseSide";

interface CardProps {
  imageSrc: string;
  title: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Card: React.FC<CardProps> = ({ imageSrc, title, className, onClick }) => {
  if (imageSrc === "")
    return <ReverseSide imageSrc="/images/reverseCard.png" />;
  return (
    <div
      className={classNames(
        "flex items-center justify-center flex-col max-w-xs w-32 h-48 bg-white rounded-lg shadow-md overflow-hidden border-2 border-black",
        className
      )}
      onClick={onClick ? (event) => onClick(event) : undefined}
    >
      <Image
        src={imageSrc}
        alt={title}
        className="w-24 h-32 object-cover"
        width={96}
        height={96}
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
    </div>
  );
};

export default Card;
