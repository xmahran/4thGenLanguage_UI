import React, { useState } from "react";

interface HomeBarItem {
  title: string;
  path: string;
}

interface HomeBarProps {
  items: HomeBarItem[];
  onItemClick: (path: string) => void;
}

const HomeBar: React.FC<HomeBarProps> = ({ items, onItemClick }) => {
  let tabName = window.location.href;
  const [activeTab, setActiveTab] = useState<number>(
    tabName.includes(items[1].title.toLowerCase())
      ? 1
      : tabName.includes(items[2].title.toLowerCase())
      ? 2
      : 0
  );

  return (
    <div>
      <div className="flex justify-around bg-[#F7F7F7] h-[90px] rounded-2xl items-center">
        {items.map((item, index) => (
          <label
            className={`text-xl font-bold  cursor-pointer transition-all ease-in-out duration-300 ${
              index === activeTab ? "text-[#2196F3]" : "hover:scale-150"
            }`}
            key={index}
            onClick={() => {
              setActiveTab(index);
              onItemClick(item.path);
            }}
          >
            {item.title}
          </label>
        ))}
      </div>
    </div>
  );
};

export default HomeBar;
