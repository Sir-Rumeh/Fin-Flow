import { useLocation } from 'react-router';
import BasicTabs from 'hoc/Tab';
import MerchantsList from './MerchantsList';

const MerchantsTab = () => {
  const { state } = useLocation();
  return (
    <>
      <section className="mt-4 p-2 md:p-4">
        <section className="flex items-center justify-between pb-4">
          <div>
            <h2 className="text-2xl font-semibold">Merchant Management</h2>
          </div>
        </section>
        <section>
          <div className="mt-4 bg-white px-5 py-3">
            <BasicTabs
              initialIndex={state?.tabIndex}
              tabList={['Pending', 'Approved Portfolio', 'Rejected']}
              tabPanel={[
                <MerchantsList key="pending" merchantStatus="pending" />,
                <MerchantsList key="approved" merchantStatus="approved" />,
                <MerchantsList key="rejected" merchantStatus="rejected" />,
              ]}
            />
          </div>
        </section>
      </section>
    </>
  );
};

export default MerchantsTab;
