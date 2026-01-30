import { useState, useRef, useEffect } from "react";

interface TabsProps {
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

const Tabs = ({ tabs, activeTab, onTabChange }: TabsProps) => {
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeTabElement = tabRefs.current[activeTab];
    if (activeTabElement) {
      setIndicatorStyle({
        width: activeTabElement.offsetWidth,
        left: activeTabElement.offsetLeft,
      });
    }
  }, [activeTab]);

  return (
    <div className="relative">
      <div className="flex gap-3 sm:gap-6 lg:gap-8 border-b border-grayBorder overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {tabs.map((tab, index) => (
          <button
            key={index}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            onClick={() => onTabChange(index)}
            className={`
              font-dm text-sm sm:text-base font-medium leading-7 text-center pb-4 px-1
              transition-colors duration-200 whitespace-nowrap flex-shrink-0
              ${
                activeTab === index
                  ? "text-textPrimary"
                  : "text-textPrimary opacity-60"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      <div
        className="absolute bottom-0 h-1 bg-primary transition-all duration-300 ease-in-out"
        style={{
          width: `${indicatorStyle.width}px`,
          transform: `translateX(${indicatorStyle.left}px)`,
        }}
      />
    </div>
  );
};

export default Tabs;