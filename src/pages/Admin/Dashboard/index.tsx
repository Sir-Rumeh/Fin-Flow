import { useEffect, useState } from 'react';
import AdminDashboard from './AdminDashboard';
import { AdminDashboardPageType } from 'utils/enums';

const Dashboard = () => {
  // const [selectedItem, setSelectedItem] = useState<any>();
  // const [pageAction, setPageAction] = useState<AdminDashboardPageType>(
  //   AdminDashboardPageType.DashboardIndex,
  // );

  // useEffect(() => {
  //   setPageAction(AdminDashboardPageType.DashboardIndex);
  // }, []);

  // const pageDisplay = () => {
  //   switch (pageAction) {
  //     case AdminDashboardPageType.DashboardIndex:
  //       return <AdminDashboard />;
  //     case AdminDashboardPageType.ViewMerchantDetails:
  //       return <MerchantDetails />;
  //     case AdminDashboardPageType.EditMerchantDetails:
  //       return <EditMerchant />;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <>
      {/* <section className="">{pageDisplay()}</section> */}
      <AdminDashboard />
    </>
  );
};

export default Dashboard;
