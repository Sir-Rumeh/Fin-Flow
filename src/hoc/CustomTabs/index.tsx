import ButtonComponent from 'components/FormElements/Button';
import { Dispatch } from 'react';
import { TabsListTabNames } from 'utils/enums';
import { TabsProps } from 'utils/interfaces';

interface CustomTabProps {
  tabs: TabsProps[];
  activeTab: string;
  width?: string;
  setActiveTab: Dispatch<React.SetStateAction<TabsListTabNames | any>>;
}

const CustomTabs = ({ tabs, activeTab, setActiveTab, width }: CustomTabProps) => {
  return (
    <>
      {tabs?.map((tab) => {
        return (
          <div
            className={`relative flex ${width ? width : 'w-[6rem] sm:w-[9rem]'} flex-col items-start justify-between`}
            key={tab.tabIndex}
          >
            <ButtonComponent
              onClick={() => {
                if (!(activeTab === tab.tabName)) {
                  setActiveTab(tab.tabName);
                }
              }}
              textSize={40}
            >
              <span className={`flex w-full items-center justify-start gap-2 py-3 text-base`}>
                <span
                  className={`flex items-center font-semibold ${activeTab === tab.tabName ? '' : 'text-blackInput'} `}
                >
                  {tab.tabName}
                </span>
                {tab.tabTotal && (
                  <span className="rounded-2xl border border-purpleSecondary bg-purple-100 px-2">
                    {tab.tabTotal}
                  </span>
                )}
              </span>
            </ButtonComponent>
            <div
              className={`mt-[0px] w-full ${activeTab === tab.tabName ? 'border-b-2 border-purplePrimary' : ''}`}
            ></div>
          </div>
        );
      })}
    </>
  );
};

export default CustomTabs;
