import { useEffect, useState } from 'react';
import AdminDashboard from './AdminDashboard';
import { AdminDashboardPageType } from 'utils/enums';
import MerchantDetails from '../MerchantManagement/MerchantDetails';
import EditMerchant from '../MerchantManagement/EditMerchant';

const Dashboard = () => {
  const [selectedItem, setSelectedItem] = useState<any>();
  const [pageAction, setPageAction] = useState<AdminDashboardPageType>(
    AdminDashboardPageType.DashboardIndex,
  );

  useEffect(() => {
    setPageAction(AdminDashboardPageType.DashboardIndex);
  }, []);

  const pageDisplay = () => {
    switch (pageAction) {
      case AdminDashboardPageType.DashboardIndex:
        return <AdminDashboard setPageAction={setPageAction} setSelectedItem={setSelectedItem} />;
      case AdminDashboardPageType.ViewMerchantDetails:
        return <MerchantDetails setPageAction={setPageAction} selectedItem={selectedItem} />;
      case AdminDashboardPageType.EditMerchantDetails:
        return <EditMerchant setPageAction={setPageAction} selectedItem={selectedItem} />;
      default:
        return null;
    }
  };

  return (
    <>
      <section className="">{pageDisplay()}</section>;{}
    </>
  );
};

export default Dashboard;
