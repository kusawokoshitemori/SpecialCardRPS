"use client";

import SpecialCardModal from "../features/Header/Modal";
import { useState } from "react";

const Header = () => {
  const [isSpecialCardModalOpen, setIsSpecialCardModalOpen] = useState(false);
  const descriptionClick = () => {
    setIsSpecialCardModalOpen(true);
  };
  return (
    <header className="bg-green-400 border-b border-gray-300 p-4 transition-none flex">
      <button
        onClick={descriptionClick}
        className="bg-green-300 p-1 rounded-md border-2 border-black ml-auto"
      >
        特殊カード一覧
      </button>
      <SpecialCardModal
        isOpen={isSpecialCardModalOpen}
        onClose={() => setIsSpecialCardModalOpen(false)}
      />
    </header>
  );
};

export default Header;
