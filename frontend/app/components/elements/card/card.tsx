import Image from "next/image";
import classNames from "classnames";

interface CardProps {
  imageSrc: string;
  title: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ imageSrc, title, className }) => {
  return (
    <div
      className={classNames(
        "flex items-center justify-center flex-col max-w-xs w-32 bg-white rounded-lg shadow-md overflow-hidden",
        className // ここで追加クラスを結合
      )}
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
