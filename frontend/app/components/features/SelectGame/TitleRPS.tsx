import Image from "next/image";

const TitleRPS = () => {
  return (
    <div className="text-center mt-10 mb-6 flex items-center">
      <Image src="/images/rock.png" alt="Rock_shape" width={60} height={60} />
      <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-green-500 to-green-500 drop-shadow-lg animate-pulse">
        特殊カードジャンケン
      </h1>
      <Image src="/images/paper.png" alt="Paper_shape" width={50} height={50} />
    </div>
  );
};

export default TitleRPS;
