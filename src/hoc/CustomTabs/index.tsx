import ButtonComponent from 'components/FormElements/Button';
import { Dispatch } from 'react';
import { TabsListTabNames } from 'utils/enums';
import { TabsProps } from 'utils/interfaces';

interface CustomTabProps {
  tabs: TabsProps[];
  activeTab: string;
  setActiveTab: Dispatch<React.SetStateAction<TabsListTabNames>>;
}

const CustomTabs = ({ tabs, activeTab, setActiveTab }: CustomTabProps) => {
  return (
    <>
      {tabs?.map((tab) => {
        return (
          <div
            className={`relative flex w-full items-center ${activeTab === tab.tabName ? 'border-b-2 border-purplePrimary' : ''}`}
            key={tab.tabIndex}
          >
            <ButtonComponent
              width="9rem"
              height="3rem"
              onClick={() => {
                if (!(activeTab === tab.tabName)) {
                  setActiveTab(tab.tabName);
                }
              }}
              textSize={40}
            >
              <span className={`flex w-full items-center justify-start gap-2 py-3 text-base`}>
                <span
                  className={`flex items-center font-semibold ${activeTab === tab.tabName ? '' : 'text-blackInput'}`}
                >
                  {tab.tabName}
                </span>

                <span className="rounded-2xl border border-purpleSecondary bg-purple-100 px-2">
                  {tab.tabTotal}
                </span>
              </span>
            </ButtonComponent>
          </div>
        );
      })}
    </>
  );
};

export default CustomTabs;
