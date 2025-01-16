import Card from "./card";

interface CardProps {
  imageSrc: string;
  title: string;
  haveItem: number;
}

const HaveCard: React.FC<CardProps> = ({ imageSrc, title, haveItem }) => {
  return (
    <div>
      <p className="flex justify-center text-3xl">x{haveItem}</p>
      <Card imageSrc={imageSrc} title={title} />
    </div>
  );
};

export default HaveCard;
