import React, { useCallback, useMemo, useRef, useState } from 'react';
import ClassEdit from './Edit/ClassEdit';
import ClassView from './View/ClassView';
import ClassAccess from './Accesses/ClassAccess';
import iconGenerator from '../../../utilities/iconGenerator';
import './index.scss';

const tabs = [
  {
    id: 1,
    icon: 'AiOutlineDashboard',
    name: 'Tableau de bord',
    tab: <ClassView />,
  },
  {
    id: 2,
    icon: 'AiFillLock',
    name: 'Accès',
    tab: <ClassAccess />,
  },
  {
    id: 3,
    icon: 'BsFillGearFill',
    name: 'Paramètres',
    tab: <ClassEdit />,
  },
] as const;

type TabIDs = (typeof tabs)[number]['id'];

const ClassPanel: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabIDs>(1);
  const selectedButton = useRef<HTMLButtonElement | null>(null);

  const barPosition = useMemo(() => {
    if (!selectedTab) return 0;
    const index = tabs.findIndex((tab) => tab.id === selectedTab);
    return index * 100;
  }, [selectedTab]);

  const handleTabChange = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setSelectedTab(parseInt((e.target as HTMLButtonElement).id) as TabIDs);
      selectedButton.current = e.target as HTMLButtonElement;
    },
    []
  );

  return (
    <section id="class_panel">
      <ul id="tab_list">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              id={tab.id.toString()}
              onClick={handleTabChange}
              ref={(el) => {
                if (selectedTab === tab.id) selectedButton.current = el;
              }}
            >
              {iconGenerator(tab.icon)} {tab.name}
            </button>
          </li>
        ))}
        <hr
          style={{
            transform: `translateX(${selectedButton.current?.offsetLeft}px)`,
            width: `${selectedButton.current?.offsetWidth || 0 + 1}px`,
          }}
        />
      </ul>
      <section id="tab">
        {selectedTab && tabs.find((tab) => selectedTab === tab.id)?.tab}
      </section>
    </section>
  );
};

export default ClassPanel;
