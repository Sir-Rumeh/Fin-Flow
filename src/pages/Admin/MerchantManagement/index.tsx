import { useLocation } from 'react-router';
import BasicTabs from 'hoc/Tab';
import MerchantsList from './MerchantsList';

const MerchantManagement = () => {
  const { state } = useLocation();
  const listInViewTotal = 20;
  return (
    <>
      <section className="mt-4 p-2 md:p-4">
        <div className="fade-in-down flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Merchant Management</h1>
          </div>
        </div>
        <div className="">
          <div className="mt-5 bg-white px-5 py-3">
            {/* <BasicTabs
              initialIndex={state?.tabIndex}
              tabList={[`Pending`, 'Approved', 'Rejected']}
              tabPanel={[
                <MerchantsList key="pending" merchantStatus="pending" />,
                <MerchantsList key="approved" merchantStatus="approved" />,
                <MerchantsList key="rejected" merchantStatus="rejected" />,
              ]}
            /> */}
            <MerchantsList key="pending" merchantStatus="all" />,
          </div>
        </div>
      </section>
    </>
  );
};

export default MerchantManagement;
