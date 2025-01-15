import Image from "next/image";

interface CardProps {
  imageSrc: string; // 画像のパス
  imageAlt: string; // 画像のaltテキスト
  title: string; // カードのタイトル
  haveItem: number;
}

const Card: React.FC<CardProps> = ({ imageSrc, imageAlt, title, haveItem }) => {
  return (
    <div>
      <p className="flex justify-center text-3xl">x{haveItem}</p>
      <div className="flex items-center justify-center flex-col max-w-xs w-32 bg-white rounded-lg shadow-md overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          className="w-24 h-32 object-cover"
          width={96} // 固定の幅
          height={96} // 固定の高さ
        />
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default Card;
