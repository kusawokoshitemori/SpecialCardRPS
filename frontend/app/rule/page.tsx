"use client";

import { useState } from "react";

const Rule = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-2/3 bg-white rounded-lg shadow-md dark:bg-neutral-800">
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
                Tab {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* タブの内容 */}
        <div className="mt-3 p-4">
          {activeTab === 1 && (
            <div role="tabpanel">
              <p className="text-gray-500 dark:text-neutral-400">
                This is the{" "}
                <em className="font-semibold text-gray-800 dark:text-neutral-200">
                  first
                </em>{" "}
                items tab body.
              </p>
            </div>
          )}
          {activeTab === 2 && (
            <div role="tabpanel">
              <p className="text-gray-500 dark:text-neutral-400">
                This is the{" "}
                <em className="font-semibold text-gray-800 dark:text-neutral-200">
                  second
                </em>{" "}
                items tab body.
              </p>
            </div>
          )}
          {activeTab === 3 && (
            <div role="tabpanel">
              <p className="text-gray-500 dark:text-neutral-400">
                This is the{" "}
                <em className="font-semibold text-gray-800 dark:text-neutral-200">
                  third
                </em>{" "}
                items tab body.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rule;
