import { Dispatch } from 'react';
import { AdminDashboardPageType } from 'utils/enums';

interface AdminDashboardProps {
  setPageAction: React.Dispatch<React.SetStateAction<AdminDashboardPageType>>;
  setSelectedItem: Dispatch<React.SetStateAction<number | string>>;
}

const AdminDashboard = ({ setPageAction, setSelectedItem }: AdminDashboardProps) => {
  return (
    <div className="mt-4 p-2 md:p-4">
      <div className="fade-in-down flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Welcome Back, Anita!</h1>
        </div>
      </div>
      <div className="fade-in-down mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr]">
        <div className="rounded-md border bg-white p-4">Fixed Width Content</div>
        <div className="relative overflow-x-scroll rounded-md border bg-white p-4 lg:overflow-hidden">
          Remaining Space Content
        </div>
      </div>
      <div className="fade-in-down relative mt-5 flex items-center justify-center rounded-md bg-white p-4">
        Table
      </div>
    </div>
  );
};

export default AdminDashboard;
