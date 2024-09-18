import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import CustomPopover from 'hoc/PopOverWrapper';
import PopoverTitle from 'components/common/PopoverTitle';
import appRoutes from 'utils/constants/routes';
import DashboardCard from 'components/common/DashboardCards/DashboardCard';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import { muiDashboardMerchantsList } from 'utils/constants';
import { useState } from 'react';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import CustomTable from 'components/CustomTable';
import { chartsGridClasses } from '@mui/x-charts/ChartsGrid';

const Dashboard = () => {
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
    marginbottom: 20,
    sx: {
      [`.${axisClasses.bottom} .${axisClasses.label}`]: {
        transform: 'translate(0, 2px)',
      },
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-4px, 0)',
      },
      [`& .${chartsGridClasses.line}`]: {
        strokeDasharray: 'none',
        strokeWidth: 1,
        stroke: '#ECECEC',
      },
    },
  };

  const merchantFilterId = 1;

  const [modals, setModals] = useState({
    confirmDisableMerchant: false,
    disableSuccessful: false,
  });

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: 'merchantName',
      headerName: 'Merchant Name',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'accountNumber',
      headerName: 'Account Number',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      sortable: false,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      sortable: false,
    },

    {
      field: 'dateRequested',
      headerName: 'Date Requested',
      width: screen.width < 1000 ? 50 : 50,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      valueGetter: (params: any) => new Date(params).toLocaleDateString(),
    },
    {
      field: 'actions',
      headerName: 'Action',
      headerClassName: 'ag-thead ',
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div className="-ml-1 h-full border-none">
            <CustomPopover
              popoverId={params?.row.id}
              buttonIcon={<PopoverTitle title="Actions" />}
              translationX={-20}
              translationY={45}
            >
              <div className="flex flex-col rounded-md p-1">
                <button
                  onClick={() =>
                    navigate({
                      pathname: `/${appRoutes.adminDashboard.dashboard.merchantDetails}`,
                      search: `?${createSearchParams({ id: params?.row.id })}`,
                    })
                  }
                  type="button"
                  className="w-full px-3 py-2 text-start font-[600] hover:bg-purpleSecondary"
                >
                  View Details
                </button>
                <button
                  onClick={() =>
                    navigate({
                      pathname: `/${appRoutes.adminDashboard.dashboard.editMerchant}`,
                      search: `?${createSearchParams({ id: params?.row.id })}`,
                    })
                  }
                  type="button"
                  className="w-full px-3 py-2 text-start font-[600] hover:bg-purpleSecondary"
                >
                  Edit Details
                </button>
                <button
                  onClick={() => openModal('confirmDisableMerchant')}
                  type="button"
                  className="w-full px-3 py-2 text-start font-[600] text-red-400 hover:bg-purpleSecondary"
                >
                  Disable
                </button>
              </div>
            </CustomPopover>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <section className="p-2 md:p-4">
        <div className="fade-in-down my-2 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">Welcome Back, Anita!</h1>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr] 2xl:grid-cols-[320px_1fr]">
          <div className="slide-down w-full rounded-md border bg-white p-4 sm:w-[300px] 2xl:w-[320px]">
            <div className="border-b pb-2">
              <h3 className="text-md font-semibold md:text-lg">Onboarded Merchant</h3>
            </div>
            <div className="mt-6 flex items-center justify-start gap-x-4 border-b pb-2">
              <p className="text-md font-semibold md:text-lg">Filter:</p>
              <div className="text-md font-semibold md:text-lg">
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
              </div>
            </div>
            <div className="mt-6 flex items-center justify-start gap-x-4">
              <DashboardCard
                title="Total Onboarded Merchants"
                numberOfRequest={1200}
                backgroundColor="bg-extraLightPurple"
                textColor="text-purplePrimary"
                route={`/${appRoutes.adminDashboard.merchantManagement.index}`}
              />
            </div>
          </div>
          <div className="slide-down relative overflow-x-scroll rounded-md border bg-white p-4 lg:overflow-hidden">
            <div className="mb-2 border-b pb-1">
              <h3 className="text-md font-semibold md:text-lg">Merchant Onboarding Analytics</h3>
            </div>
            <BarChart
              grid={{ horizontal: true }}
              series={[{ data: barData, type: 'bar' }]}
              xAxis={[
                {
                  data: barAxisX,
                  scaleType: 'band',
                  label: 'Month',
                  colorMap: {
                    type: 'piecewise',
                    thresholds: [],
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
        <div className="relative mt-5 flex items-center justify-center rounded-md bg-white p-2 md:p-4">
          <div className="w-full">
            <CustomTable tableData={muiDashboardMerchantsList} columns={columns} rowCount={73} />
          </div>
        </div>
      </section>
      {modals.confirmDisableMerchant && (
        <ModalWrapper
          isOpen={modals.confirmDisableMerchant}
          setIsOpen={() => closeModal('confirmDisableMerchant')}
          title={'Disable Merchant?'}
          info={'You are about to disable this merchant, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            closeModal('confirmDisableMerchant');
            openModal('disableSuccessful');
          }}
        />
      )}
      {modals.disableSuccessful && (
        <ModalWrapper
          isOpen={modals.disableSuccessful}
          setIsOpen={() => closeModal('disableSuccessful')}
          title={'Success!!'}
          info={'You have successfully disabled this merchant'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('disableSuccessful');
          }}
        />
      )}
    </>
  );
};

export default Dashboard;
