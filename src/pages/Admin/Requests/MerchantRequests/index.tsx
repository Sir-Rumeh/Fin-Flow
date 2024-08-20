import { useState } from 'react';
import MerchantRequestsListTable from './MerchantRequestsListTable';
import { pendingDashboardMerchantsList } from 'utils/constants';
import ButtonComponent from 'components/FormElements/Button';
import TableFilter from 'components/TableFilter';

interface TabsProps {
  tabIndex: number;
  tabName: string;
  tabTotal: number;
}

const MerchantRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const total = 20;
  const [activeTab, setActiveTab] = useState('Pending');
  const tabs: TabsProps[] = [
    {
      tabIndex: 1,
      tabName: 'Pending',
      tabTotal: total,
    },
    {
      tabIndex: 2,
      tabName: 'Approved',
      tabTotal: total,
    },
    {
      tabIndex: 3,
      tabName: 'Rejected',
      tabTotal: total,
    },
  ];
  return (
    <>
      <section className="p-2 md:p-4">
        <div className="fade-in-down my-2 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">Merchant Requests</h1>
          </div>
        </div>
        <div className="">
          <div className="slide-down relative mt-5 flex flex-col items-center justify-center rounded-md bg-white p-2 md:p-4">
            <div className="flex w-full flex-col items-center justify-between border-b pb-3 md:flex-row">
              <div className="flex w-[50%] items-center justify-start gap-8">
                {tabs?.map((tab) => {
                  return (
                    <div className={`relative flex items-center`} key={tab.tabIndex}>
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
                        <span
                          className={`flex w-full items-center justify-start gap-2 py-3 text-base ${activeTab === tab.tabName ? 'border-b-2 border-purplePrimary' : ''}`}
                        >
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
              </div>
              <div className="flex w-[50%] items-center justify-start">
                <TableFilter
                  name={'searchMerchantName'}
                  placeholder={'Search Merchant Name'}
                  label={'Search Merchant'}
                  value={searchTerm}
                  handleFilter={() => setSearchTerm('')}
                  setSearch={setSearchTerm}
                />
              </div>
            </div>

            <div className="mt-6 w-full">
              <MerchantRequestsListTable rowData={pendingDashboardMerchantsList} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MerchantRequests;
