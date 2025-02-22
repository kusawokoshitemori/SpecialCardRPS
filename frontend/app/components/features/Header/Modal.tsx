import React from "react";
import Card from "../../elements/card/card";
import SearchSrc from "../Play/SearchSrc";

type SpecialCardModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SpecialCardModal: React.FC<SpecialCardModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const cardData = [
    {
      title: "ミラー",
      description: "対特殊カード即時勝利。\n通常手には敗北",
    },
    { title: "全知全能", description: "相手の特殊カードを知る\n'" },
    { title: "無限の手", description: "パーの上位互換\n'" },
    { title: "リバース", description: "次の試合の勝敗を逆転\n'" },
    { title: "封印", description: "今回,次回のターンでの\n特殊カードの無効化" },
  ];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose} // 背景クリックで閉じる
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()} // モーダル内部クリックは閉じない
      >
        <div className="flex gap-x-3">
          {cardData.map(({ title, description }) => (
            <div
              key={title}
              className="flex flex-col justify-center items-center"
            >
              {/* 画像枠 */}
              <div className="w-32 h-48 bg-gray-200 flex justify-center items-center">
                <Card
                  imageSrc={SearchSrc(title)}
                  title={title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* 説明欄 */}
              <div className="mt-2 text-center">
                {description.split("\n").map((line, index) => (
                  <div key={index} className="text-sm text-gray-500 mb-1">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center">
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-3/5 text-lg font-bold blue-text-outline"
            onClick={onClose}
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialCardModal;
