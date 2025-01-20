import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import CustomPopover from 'hoc/PopOverWrapper';
import PopoverTitle from 'components/common/PopoverTitle';
import appRoutes from 'utils/constants/routes';
import DashboardCard from 'components/common/DashboardCards/DashboardCard';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import CustomTable from 'components/CustomTable';
import { chartsGridClasses } from '@mui/x-charts/ChartsGrid';
import { QueryParams } from 'utils/interfaces';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteMerchant,
  disableMerchant,
  enableMerchant,
  getMerchantOnboardingAnalytics,
  getMerchants,
} from 'config/actions/merchant-actions';
import { useFormik } from 'formik';
import { getUserFromLocalStorage, isAdminAuthData, isMerchantAuthData } from 'utils/helpers';
import dayjs from 'dayjs';
import LocalizedTime from 'dayjs/plugin/localizedFormat';
import { CreationRequestIcon, DeleteRequestIcon } from 'assets/icons';

const Dashboard = () => {
  dayjs.extend(LocalizedTime);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [paginationData, setPaginationData] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  const [selectedMerchantId, setSelectedMerchantId] = useState('');
  const [chartData, setChartData] = useState<number[] | undefined>([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const user = getUserFromLocalStorage();

  const [username, setUsername] = useState('');
  useEffect(() => {
    if (isAdminAuthData(user)) {
      const { userData } = user;
      setUsername(`${userData.firstName}`);
    } else if (isMerchantAuthData(user)) {
      const { profileData } = user;
      setUsername(`${profileData.firstName}`);
    }
  }, []);

  const [modals, setModals] = useState({
    confirmDisable: false,
    disableSuccessful: false,
    confirmEnable: false,
    enableSuccessful: false,
    confirmDelete: false,
    deleteSuccessful: false,
  });

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const formik = useFormik({
    initialValues: {
      status: '',
    },
    onSubmit: (values) => {
      setSearchTerm('');
    },
  });

  const [queryParams, setQueryParams] = useState<QueryParams>({
    status: formik.values.status,
    pageNo: paginationData.pageNumber,
    pageSize: paginationData.pageSize,
    sortBy: 'asc',
    sortOrder: 'desc',
  });

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      status: formik.values.status,
      pageNo: paginationData.pageNumber,
      pageSize: paginationData.pageSize,
    }));
  }, [formik.values.status, paginationData]);

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

  const columns: GridColDef[] = [
    {
      field: 'name',
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
      field: 'isActive',
      headerName: 'Status',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      renderCell: (params: GridRenderCellParams) => {
        const renderIcon = (
          IconComponent: React.ComponentType,
          colorClass: string,
          title: string,
        ) => (
          <div className="flex w-full items-center gap-2 font-semibold">
            <IconComponent />
            <span className={`mb-[1px] ${colorClass}`}>{title}</span>
          </div>
        );
        switch (params?.row.isActive) {
          case true:
            return renderIcon(CreationRequestIcon, 'text-greenPrimary', 'Enabled');
          case false:
            return renderIcon(DeleteRequestIcon, 'text-redSecondary', 'Disabled');
          default:
            return <span>{params?.row.isActive ? 'Enabled' : 'Disabled'}</span>;
        }
      },
    },

    {
      field: 'dateCreated',
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
      width: screen.width < 1000 ? 200 : 110,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div className="-ml-1 h-full border-none">
            <CustomPopover
              popoverId={params?.row.id}
              buttonIcon={<PopoverTitle title="Actions" />}
              translationX={-6}
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
                {params?.row.isActive ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMerchantId(params?.row.id);
                      openModal('confirmDisable');
                    }}
                    className="w-full px-3 py-2 text-start font-[600] text-red-400 hover:bg-purpleSecondary"
                  >
                    Disable
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMerchantId(params?.row.id);
                      openModal('confirmEnable');
                    }}
                    className="w-full px-3 py-2 text-start font-[600] text-green-400 hover:bg-purpleSecondary"
                  >
                    Enable
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMerchantId(params?.row.id);
                    openModal('confirmDelete');
                  }}
                  className="w-full px-3 py-2 text-start font-[600] text-red-400 hover:bg-purpleSecondary"
                >
                  Delete
                </button>
              </div>
            </CustomPopover>
          </div>
        );
      },
    },
  ];

  const { data, refetch } = useQuery({
    queryKey: ['merchants', queryParams],
    queryFn: ({ queryKey }) => getMerchants(queryKey[1] as QueryParams),
  });

  const { data: merchantAnalytics } = useQuery({
    queryKey: ['merchants-analytics'],
    queryFn: ({ queryKey }) => getMerchantOnboardingAnalytics(),
  });

  useEffect(() => {
    if (merchantAnalytics?.responseData) {
      const monthlyValues = Object.keys(merchantAnalytics?.responseData)
        .filter((key) => key !== 'total')
        .map((key) => merchantAnalytics?.responseData[key]);
      setChartData(monthlyValues);
    }
  }, [merchantAnalytics]);

  const enableMerchantMutation = useMutation({
    mutationFn: (requestId: string | undefined) => enableMerchant(requestId),
    onSuccess: () => {
      closeModal('confirmEnable');
      openModal('enableSuccessful');
    },
    onError: (error) => {
      closeModal('confirmEnable');
    },
  });

  const disableMerchantMutation = useMutation({
    mutationFn: (requestId: string | undefined) => disableMerchant(requestId),
    onSuccess: () => {
      closeModal('confirmDisable');
      openModal('disableSuccessful');
    },
    onError: (error) => {
      closeModal('confirmDisable');
    },
  });

  const deleteMerchantMutation = useMutation({
    mutationFn: (requestId: string | undefined) => deleteMerchant(requestId),
    onSuccess: () => {
      closeModal('confirmDelete');
      openModal('deleteSuccessful');
    },
    onError: (error) => {
      closeModal('confirmDelete');
    },
  });

  const merchantStatusFilters = [
    {
      id: 1,
      name: 'All',
      value: '',
    },
    {
      id: 2,
      name: 'Enabled',
      value: 'Enabled',
    },
    {
      id: 2,
      name: 'Disabled',
      value: 'Disabled',
    },
  ];

  return (
    <>
      <section className="p-2 md:p-4">
        <div className="fade-in-down my-2 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">{`Welcome Back, ${username}!`}</h1>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr] 2xl:grid-cols-[320px_1fr]">
          <div className="slide-down w-full rounded-md border bg-white p-4 sm:w-[300px] 2xl:w-[320px]">
            <div className="border-b pb-2">
              <h3 className="text-md font-semibold md:text-lg">Onboarded Merchant</h3>
              <h3 className="text-md font-semibold md:text-lg">
                ( Jan {dayjs().format('YYYY')} - Dec {dayjs().format('YYYY')} )
              </h3>
            </div>
            <div className="mt-6 flex items-center justify-start gap-x-4 border-b pb-2">
              <p className="text-md font-semibold md:text-lg">Filter:</p>
              <div className="text-md font-semibold md:text-lg">
                <CustomPopover
                  popoverId={1}
                  buttonIcon={
                    <PopoverTitle title={formik.values.status ? formik.values.status : 'All'} />
                  }
                  translationX={0}
                  translationY={45}
                >
                  <div className="slide-downward flex w-[7rem] flex-col rounded-md bg-white py-1 text-sm">
                    {merchantStatusFilters.map((status) => {
                      return (
                        <span
                          key={status.name}
                          onClick={() => {
                            formik.setFieldValue('status', status.value);
                            setPaginationData((prev) => {
                              return {
                                ...prev,
                                pageNumber: 1,
                              };
                            });
                          }}
                          className="cursor-pointer border-b px-3 py-1 text-start hover:bg-lilacPurple"
                        >
                          {status.name}
                        </span>
                      );
                    })}

                    {/* <span
                      onClick={() => {
                        formik.setFieldValue('status', 'Enabled');
                      }}
                      className="cursor-pointer border-b px-3 py-1 text-start hover:bg-lilacPurple"
                    >
                      Enabled
                    </span>
                    <span
                      onClick={() => {
                        formik.setFieldValue('status', 'Disabled');
                      }}
                      className="cursor-pointer px-3 py-1 text-start hover:bg-lilacPurple"
                    >
                      Disabled
                    </span> */}
                  </div>
                </CustomPopover>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-start gap-x-4">
              <DashboardCard
                title="Total Onboarded Merchants"
                numberOfRequest={merchantAnalytics?.responseData?.total}
                backgroundColor="bg-extraLightPurple"
                textColor="text-purplePrimary"
                route={`/${appRoutes.adminDashboard.merchantManagement.index}`}
              />
            </div>
          </div>
          <div className="slide-down relative overflow-x-scroll rounded-md border bg-white p-4 lg:overflow-hidden">
            <div className="mb-2 border-b pb-1">
              <h3 className="text-md font-semibold md:text-lg">
                Merchant Onboarding Analytics ( Jan {dayjs().format('YYYY')} - Dec{' '}
                {dayjs().format('YYYY')} )
              </h3>
            </div>
            <BarChart
              grid={{ horizontal: true }}
              series={[{ data: chartData, type: 'bar' }]}
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
            <CustomTable
              tableData={data?.responseData?.items}
              columns={columns}
              rowCount={data?.responseData?.totalCount}
              paginationData={paginationData}
              setPaginationData={setPaginationData}
            />
          </div>
        </div>
      </section>
      {modals.confirmDisable && (
        <ModalWrapper
          isOpen={modals.confirmDisable}
          setIsOpen={() => closeModal('confirmDisable')}
          title={'Disable Merchant?'}
          info={'You are about to disable this merchant, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          loading={disableMerchantMutation.isPending}
          proceedAction={() => {
            closeModal('confirmDisable');
            disableMerchantMutation.mutate(selectedMerchantId);
          }}
        />
      )}
      {modals.disableSuccessful && (
        <ModalWrapper
          isOpen={modals.disableSuccessful}
          setIsOpen={() => closeModal('disableSuccessful')}
          title={'Success!!'}
          info={'You have successfully disabled this merchant and your request is pending approval'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            refetch();
            closeModal('disableSuccessful');
          }}
        />
      )}
      {modals.confirmEnable && (
        <ModalWrapper
          isOpen={modals.confirmEnable}
          setIsOpen={() => closeModal('confirmEnable')}
          title={'Enable Merchant?'}
          info={'You are about to enable this merchant, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          loading={enableMerchantMutation.isPending}
          proceedAction={() => {
            closeModal('confirmEnable');
            enableMerchantMutation.mutate(selectedMerchantId);
          }}
        />
      )}
      {modals.enableSuccessful && (
        <ModalWrapper
          isOpen={modals.enableSuccessful}
          setIsOpen={() => closeModal('enableSuccessful')}
          title={'Success!!'}
          info={'You have successfully enabled this merchant and your request is pending approval'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            refetch();
            closeModal('enableSuccessful');
          }}
        />
      )}
      {modals.confirmDelete && (
        <ModalWrapper
          isOpen={modals.confirmDelete}
          setIsOpen={() => closeModal('confirmDelete')}
          title={'Delete Merchant?'}
          info={'You are about to delete this merchant, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          loading={deleteMerchantMutation.isPending}
          proceedAction={() => {
            closeModal('confirmDelete');
            deleteMerchantMutation.mutate(selectedMerchantId);
          }}
        />
      )}
      {modals.deleteSuccessful && (
        <ModalWrapper
          isOpen={modals.deleteSuccessful}
          setIsOpen={() => closeModal('deleteSuccessful')}
          title={'Success!!'}
          info={'You have successfully deleted this merchant and your request is pending approval'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            refetch();
            closeModal('deleteSuccessful');
          }}
        />
      )}
    </>
  );
};

export default Dashboard;
