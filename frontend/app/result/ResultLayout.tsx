"use client";

const ResultLayout = ({
  gameData,
}: {
  gameData: { myPoint: number; enemyPoint: number } | null;
}) => {
  return (
    <div>
      <h1>Result</h1>
      {gameData ? (
        <div>
          <p>My Point: {gameData.myPoint}</p>
          <p>Enemy Point: {gameData.enemyPoint}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ResultLayout;
