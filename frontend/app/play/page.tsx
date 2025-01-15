import Card from "../components/elements/card/card";

const Play = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div>タイマー</div>
      <div className="flex flex-row">
        <div>自分の手が出るとこ</div>
        <div>相手の手が出るとこ</div>
      </div>
      <div className="flex flex-row">
        <Card
          imageSrc="/images/rock.png"
          imageAlt="グー"
          title="グー"
          haveItem={2}
        />
        <Card
          imageSrc="/images/scissors.png"
          imageAlt="チョキ"
          title="チョキ"
          haveItem={2}
        />
        <Card
          imageSrc="/images/paper.png"
          imageAlt="パー"
          title="パー"
          haveItem={2}
        />
        <div>持っているカード4</div>
      </div>
    </div>
  );
};
export default Play;
