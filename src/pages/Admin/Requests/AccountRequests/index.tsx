import { useState } from 'react';
import MerchantRequestsListTable from './MerchantRequestsListTable';
import TableFilter from 'components/TableFilter';
import { TabsProps } from 'utils/interfaces';
import CustomTabs from 'hoc/CustomTabs';
import { TabsListTabNames } from 'utils/enums';
import AccountRequestsListTable from './AccountRequestsListTable';
import { accountRequestsList } from 'utils/constants';

const AccountRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const total = 20;
  const [activeTab, setActiveTab] = useState(TabsListTabNames.Pending);
  const tabsList: TabsProps[] = [
    {
      tabIndex: 1,
      tabName: TabsListTabNames.Pending,
      tabTotal: total,
    },
    {
      tabIndex: 2,
      tabName: TabsListTabNames.Approved,
      tabTotal: total,
    },
    {
      tabIndex: 3,
      tabName: TabsListTabNames.Rejected,
      tabTotal: total,
    },
  ];
  return (
    <>
      <section className="p-2 md:p-4">
        <div className="fade-in-down my-2 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">Account Requests</h1>
          </div>
        </div>
        <div className="">
          <div className="slide-down relative mt-5 flex flex-col items-center justify-center rounded-md bg-white p-2 md:p-4">
            <div className="flex w-full flex-col items-center justify-between gap-y-4 border-b pb-3 lg:flex-row">
              <div className="flex w-full items-center justify-start gap-8 lg:w-[50%]">
                <CustomTabs tabs={tabsList} activeTab={activeTab} setActiveTab={setActiveTab} />
              </div>
              <div className="slide-down flex w-full items-center lg:w-[50%] lg:justify-end">
                <div className="">
                  <TableFilter
                    name={'searchAccount'}
                    placeholder={'Search Account '}
                    label={'Search Account'}
                    value={searchTerm}
                    handleFilter={() => setSearchTerm('')}
                    setSearch={setSearchTerm}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 w-full">
              <AccountRequestsListTable rowData={accountRequestsList} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AccountRequests;
