import { useLocation } from 'react-router';
import BasicTabs from 'hoc/Tab';
import MerchantsListTable from './MerchantsListTable';

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
            <MerchantsListTable key="all" merchantStatus="all" />,
          </div>
        </div>
      </section>
    </>
  );
};

export default MerchantManagement;
