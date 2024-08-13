import { DashboardCardArrowIcon } from 'assets/icons';
import DashboardCard from 'components/common/DashboardCards/DashboardCard';
import { Link } from 'react-router-dom';
import MandateList from '../MandatetManagement/MandateList';

const Dashboard = () => {
  return (
    <div className="px-5 py-5">
      <h2 className="text-2xl font-semibold">Welcome Back, Anita!</h2>
      <div className="mt-5 rounded-lg bg-white px-5 py-5">
        <p className="my-3 text-lg font-semibold">Onboarded Merchants</p>
        <div className="bg-grayPrimary h-[2px] w-full"></div>
        <div className="my-4 flex flex-col items-center justify-between gap-4 md:flex-row md:gap-2">
          <DashboardCard
            title="Approved Mandate"
            numberOfRequest={1200}
            route="/merchant/dashboard"
          />
          <DashboardCard
            title="Pending Requests"
            numberOfRequest={1200}
            route="/merchant/dashboard"
          />
          <DashboardCard
            title="Declined Requests"
            numberOfRequest={1200}
            route="/merchant/dashboard"
          />
        </div>
      </div>
      <div className="mt-5 rounded-lg bg-white px-5 py-5">
        <p className="my-3 text-lg font-bold">Recent Mandate Requests</p>
        <div className="bg-grayPrimary h-[2px] w-full"></div>
        <div className="mt-5">
          <MandateList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
