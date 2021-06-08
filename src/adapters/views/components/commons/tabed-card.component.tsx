import { useState } from "react";

interface TabProps {
  title: string;
  content: any;
  onClick?: any;
}

interface Props {
  defaultTab?: number;
  tabs: TabProps[];
}

export const TabedCard = ({ defaultTab, tabs }: Props) => {
  const [activeTab, setTab] = useState(defaultTab || 0);

  return (
    <div className="w-full h-full">
      <div className="w-full flex bold flex-nowrap justify-evenly cursor-pointer border-b border-t-0 border-l-0 border-r-0 border-solid border-gray-100">
        {tabs.map((tab, i) => (
          <div
            className={ (activeTab === i  ? "bg-black-primary text-white" : "bg-white text-primary") +  " w-full h-full p-2 text-center text-base" }
            key={i}
            onClick={() => { setTab(i); if (tab.onClick) tab.onClick(); }}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div className="w-full">
        {tabs.map((tab, i) => (
          <div className={ (activeTab === i ? "block" : "hidden") + " w-full h-full" } key={i}> {tab.content} </div>
        ))}
      </div>
    </div>
  );
};