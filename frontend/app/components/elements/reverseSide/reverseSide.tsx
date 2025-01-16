import Image from "next/image";
import classNames from "classnames";

interface ReverseSideProps {
  imageSrc: string;
  className?: string;
}

const ReverseSide: React.FC<ReverseSideProps> = ({ imageSrc, className }) => {
  return (
    <div
      className={classNames(
        "max-w-xs w-32 h-48 bg-white rounded-lg shadow-md overflow-hidden",
        className // ここで追加クラスを結合
      )}
    >
      <Image
        src={imageSrc}
        alt="トランプの裏面"
        className="w-full h-full object-cover"
        width={192}
        height={256}
      />
    </div>
  );
};

export default ReverseSide;
