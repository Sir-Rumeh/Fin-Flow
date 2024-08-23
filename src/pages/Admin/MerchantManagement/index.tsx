import { useLocation } from 'react-router';
import MerchantsListTable from './MerchantsListTable';

const MerchantManagement = () => {
  const { state } = useLocation();
  const listInViewTotal = 20;
  return (
    <>
      <section className="p-2 md:p-4">
        <div className="fade-in-down my-2 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">Merchant Management</h1>
          </div>
        </div>
        <div className="">
          <div className="mt-5 bg-white px-5 py-3">
            <MerchantsListTable key="all" />,
          </div>
        </div>
      </section>
    </>
  );
};

export default MerchantManagement;
