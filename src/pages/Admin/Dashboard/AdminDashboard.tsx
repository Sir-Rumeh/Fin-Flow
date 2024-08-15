import { Dispatch } from 'react';
import { AdminDashboardPageType } from 'utils/enums';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import DashboardListTable from './DashboardListTable';

interface AdminDashboardProps {
  setPageAction: React.Dispatch<React.SetStateAction<AdminDashboardPageType>>;
  setSelectedItem: Dispatch<React.SetStateAction<number | string>>;
}

const AdminDashboard = ({ setPageAction, setSelectedItem }: AdminDashboardProps) => {
  const barAxisX = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];

  const barData = [35, 44, 24, 34, 35, 44, 24, 34, 35, 44, 24, 34];

  const chartSetting = {
    yAxis: [
      {
        label: 'Number of Merchants',
      },
    ],
    height: 290,
    marginBottom: 20,
    sx: {
      [`.${axisClasses.bottom} .${axisClasses.label}`]: {
        transform: 'translate(0, 2px)',
      },
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-4px, 0)',
      },
    },
  };

  return (
    <div className="mt-4 p-2 md:p-4">
      <div className="fade-in-down flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Welcome Back, Anita!</h1>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr]">
        <div className="slide-down rounded-md border bg-white p-4">Fixed Width Content</div>
        <div className="slide-down relative overflow-x-scroll rounded-md border bg-white p-4 lg:overflow-hidden">
          <BarChart
            series={[{ data: barData }]}
            xAxis={[
              {
                data: barAxisX,
                scaleType: 'band',
                label: 'Month',
                colorMap: {
                  type: 'piecewise',
                  thresholds: [new Date(2021, 1, 1), new Date(2023, 1, 1)],
                  colors: ['#FFE3A4'],
                },
              },
            ]}
            margin={{ top: 15, bottom: 40, left: 40, right: 10 }}
            borderRadius={5}
            {...chartSetting}
          />
        </div>
      </div>
      <div className="slide-down relative mt-5 flex items-center justify-center rounded-md bg-white p-2 md:p-4">
        <DashboardListTable />
      </div>
    </div>
  );
};

export default AdminDashboard;
