"use client";

import { useState } from "react";
import Button from "../components/elements/button/Button";
import Card from "../components/elements/card/card";
import SearchSrc from "../components/features/Play/SearchSrc";
import { useRouter } from "next/navigation";

const Rule = () => {
  const [activeTab, setActiveTab] = useState(1);
  const router = useRouter();
  const handleBackTitle = () => {
    router.push("selectGame");
  };

  return (
    <div className="h-screen w-full flex justify-center items-center flex-col">
      <div className="w-2/3 bg-white rounded-lg shadow-md dark:bg-neutral-800 mt-24">
        <div className="border-b border-gray-200 px-4 dark:border-neutral-700">
          <nav className="flex gap-x-2" aria-label="Tabs" role="tablist">
            {[1, 2, 3].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 inline-flex items-center gap-x-2 border-b-2 text-sm whitespace-nowrap focus:outline-none ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600 font-semibold"
                    : "border-transparent text-gray-500 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-500"
                }`}
                role="tab"
                aria-selected={activeTab === tab}
              >
                Step {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* タブの内容 */}
        <div className="mt-3 p-4">
          {activeTab === 1 && (
            <div role="tabpanel">
              <p className="text-gray-500 dark:text-neutral-400">
                <div className="flex flex-col">
                  <div className="flex justify-center">
                    <Card
                      imageSrc={SearchSrc("グー")}
                      title="グー"
                      className="mx-2"
                    />
                    <Card
                      imageSrc={SearchSrc("チョキ")}
                      title="チョキ"
                      className="mx-2"
                    />
                    <Card
                      imageSrc={SearchSrc("パー")}
                      title="パー"
                      className="mx-2"
                    />
                  </div>
                  <p className="flex justify-center my-4 text-xl font-bold">
                    カードを使用してジャンケンをするよ
                  </p>
                </div>
              </p>
            </div>
          )}
          {activeTab === 2 && (
            <div role="tabpanel">
              <p className="text-gray-500 dark:text-neutral-400">
                <div className="flex flex-col">
                  <div className="flex justify-center">
                    <Card
                      imageSrc={SearchSrc("グー")}
                      title="グー"
                      className="mx-2"
                    />
                    <p className="flex justify-center items-center text-4xl mx-6">
                      VS
                    </p>
                    <Card
                      imageSrc={SearchSrc("パー")}
                      title="パー"
                      className="mx-2"
                    />
                  </div>
                  <p className="flex justify-center my-4 text-xl font-bold">
                    3ポイント先に獲得したほうが勝ちだよ
                  </p>
                </div>
              </p>
            </div>
          )}
          {activeTab === 3 && (
            <div role="tabpanel">
              <p className="text-gray-500 dark:text-neutral-400">
                <div className="flex flex-col">
                  <div className="flex justify-center">
                    <Card
                      imageSrc={SearchSrc("ミラー")}
                      title="ミラー"
                      className="mx-2"
                    />
                    <Card
                      imageSrc={SearchSrc("無限の手")}
                      title="無限の手"
                      className="mx-2"
                    />
                    <Card
                      imageSrc={SearchSrc("リバース")}
                      title="リバース"
                      className="mx-2"
                    />
                  </div>
                  <p className="flex justify-center my-4 text-xl font-bold">
                    特殊カードも使用して勝利をつかもう
                  </p>
                </div>
              </p>
            </div>
          )}
        </div>
      </div>
      <Button
        text="タイトルへ"
        subText1="試合選択画面に戻ります"
        subText2="ゲーム選択画面へ"
        bgColor="bg-emerald-200"
        subTextColor="bg-green-400"
        addClass="my-12"
        onClick={handleBackTitle}
      />
    </div>
  );
};

export default Rule;
