import DashboardCard from 'components/common/DashboardCards/DashboardCard';
import MandateList from '../MandatetManagement/MandateList';

const Dashboard = () => {
  return (
    <>
      <div className="px-5 py-5">
        <h2 className="text-2xl font-semibold">Welcome Back, Anita!</h2>
        <div className="mt-5 rounded-lg bg-white px-5 py-5">
          <p className="my-3 text-lg font-semibold">Onboarded Merchants</p>
          <div className="h-[2px] w-full bg-grayPrimary"></div>
          <div className="my-4 flex flex-col items-center justify-between gap-4 md:flex-row md:gap-8">
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
          <div className="h-[2px] w-full bg-grayPrimary"></div>
          <div className="mt-5">
            <MandateList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
