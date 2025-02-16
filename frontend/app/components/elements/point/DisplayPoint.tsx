interface DisplayPointProps {
  myPoint: number;
  enemyPoint: number;
  textSizeClass: string;
}

const DisplayPoint = ({
  myPoint,
  enemyPoint,
  textSizeClass,
}: DisplayPointProps) => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex items-center justify-center flex-col">
        <p className={`${textSizeClass} font-bold`}>{myPoint}</p>
        <p className="text-bold text-3xl">あなた</p>
      </div>

      <p className="text-[100px] font-bold mx-12">vs</p>
      <div className="flex items-center justify-center flex-col">
        <p className={`${textSizeClass} font-bold`}>{enemyPoint}</p>
        <p className="text-bold text-3xl">相手</p>
      </div>
    </div>
  );
};

export default DisplayPoint;
