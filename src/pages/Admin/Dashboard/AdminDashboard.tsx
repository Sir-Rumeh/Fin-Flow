import { Dispatch, useState } from 'react';
import { AdminDashboardPageType } from 'utils/enums';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import DashboardListTable from './DashboardListTable';
import CustomPopover from 'hoc/PopOverWrapper';
import PopoverTitle from 'components/common/PopoverTitle';
import { Link } from 'react-router-dom';
import appRoutes from 'utils/constants/routes';
import ArrowRightIcon from 'assets/icons/ArrowRight';

// import CustomModal from 'hoc/ModalWrapper';

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

  const merchantFilterId = 1;

  return (
    <>
      <div className="p-2 md:p-4">
        <div className="fade-in-down flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">Welcome Back, Anita!</h1>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr]">
          {/* <div className="mt-5 flex flex-col  gap-4 "> */}
          <div className="slide-down w-full rounded-md border bg-white p-4 sm:w-[300px]">
            <div className="border-b pb-2">
              <h3 className="text-md font-semibold md:text-lg">Onboarded Merchant</h3>
            </div>
            <div className="mt-6 flex items-center justify-start gap-x-4 border-b pb-2">
              <p className="text-md font-semibold md:text-lg">Filter:</p>
              <h3 className="text-md font-semibold md:text-lg">
                <CustomPopover
                  popoverId={merchantFilterId}
                  buttonIcon={<PopoverTitle title="All" />}
                  translationX={10}
                  translationY={50}
                >
                  <div className="flex w-[8rem] flex-col rounded-md p-1 text-sm">
                    <div>Merchant</div>
                    <div>Merchant</div>
                  </div>
                </CustomPopover>
              </h3>
            </div>
            <div className="mt-6 flex items-center justify-start gap-x-4">
              <div className="bg-extraLightPurple h-[160px] w-[340px] rounded-[8px] px-4 py-3">
                <p className="my-1 text-lg font-semibold">Total Onboarded Merchants</p>
                <p className="text-[35px] font-bold">1200</p>
                <div className="mt-4 h-[2px] w-full bg-gray-200"></div>
                <Link
                  to={`/${appRoutes.adminDashboard.merchantManagement.index}`}
                  className="mt-2 flex items-center gap-3"
                >
                  <span className="text-lightPurple">View all</span>
                  <ArrowRightIcon />
                </Link>
              </div>
            </div>
          </div>
          <div className="slide-down relative overflow-x-scroll rounded-md border bg-white p-4 lg:overflow-hidden">
            <div className="mb-2 border-b pb-1">
              <h3 className="text-md font-semibold md:text-lg">Merchant Onboarding Analytics</h3>
            </div>
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
              margin={{ top: 40, bottom: 40, left: 40, right: 10 }}
              borderRadius={5}
              {...chartSetting}
            />
          </div>
        </div>
        <div className="slide-down relative mt-5 flex items-center justify-center rounded-md bg-white p-2 md:p-4">
          <DashboardListTable />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
