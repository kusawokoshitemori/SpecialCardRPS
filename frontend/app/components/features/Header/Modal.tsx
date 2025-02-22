import React from "react";

type SpecialCardModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SpecialCardModal: React.FC<SpecialCardModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose} // 背景クリックで閉じる
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96"
        onClick={(e) => e.stopPropagation()} // モーダル内部クリックは閉じない
      >
        <h2 className="text-lg font-bold mb-4">モーダルタイトル</h2>
        <p>モーダルの内容です。</p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default SpecialCardModal;
