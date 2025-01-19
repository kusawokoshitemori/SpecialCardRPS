import Card from "./card";
import ReverseSide from "../reverseSide/reverseSide";

interface CardProps {
  imageSrc: string;
  title: string;
  haveItem: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const HaveCard: React.FC<CardProps> = ({
  imageSrc,
  title,
  haveItem,
  onClick,
}) => {
  if (imageSrc === "")
    return <ReverseSide imageSrc="/images/reverseCard.png" />;
  return (
    <div>
      <p className="flex justify-center text-3xl">x{haveItem}</p>
      <Card imageSrc={imageSrc} title={title} onClick={onClick} />
    </div>
  );
};

export default HaveCard;
