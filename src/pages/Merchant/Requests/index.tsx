import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GridColDef } from '@mui/x-data-grid';
import {
  CreationRequestIcon,
  DeleteRequestIcon,
  DisableRequestIcon,
  UpdateRequestIcon,
} from 'assets/icons';
import appRoutes from 'utils/constants/routes';
import { RequestType, TabsListTabNames } from 'utils/enums';
import CustomTable from 'components/CustomTable';
import TableFilter from 'components/TableFilter';
import { useFormik } from 'formik';
import { useQuery } from '@tanstack/react-query';
import { getMandateRequests, getMandateStatistics } from 'config/actions/dashboard-actions';
import { QueryParams, TabsProps } from 'utils/interfaces';
import { useMediaQuery } from '@mui/material';
import CustomTabs from 'hoc/CustomTabs';

const MandateRequests = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const status = urlParams.get('status');

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(status !== null ? status : TabsListTabNames.Pending);
  const [paginationData, setPaginationData] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  const isLargeWidth = useMediaQuery('(min-width:1320px)');

  const formik = useFormik({
    initialValues: {
      searchMandate: '',
      fromDateFilter: '',
      toDateFilter: '',
      statusFilter: '',
    },
    onSubmit: (values) => {
      setSearchTerm('');
    },
  });

  const [queryParams, setQueryParams] = useState<QueryParams>({
    mandateCode: '',
    status: formik.values.statusFilter,
    pageNo: paginationData.pageNumber,
    pageSize: paginationData.pageSize,
    sortBy: 'asc',
    sortOrder: 'desc',
    searchFilter: formik.values.searchMandate,
    startDate: formik.values.fromDateFilter,
    endDate: formik.values.toDateFilter,
  });

  const MandateTableColumn: GridColDef[] = [
    // {
    //   field: 'accountId',
    //   headerName: 'Account ID',
    //   width: screen.width < 1000 ? 200 : undefined,
    //   flex: screen.width >= 1000 ? 1 : undefined,
    //   headerClassName: 'ag-thead',
    // },
    {
      field: 'merchantId',
      headerName: 'Merchant ID',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'mandateCode',
      headerName: 'Mandate Code',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'mandateType',
      headerName: 'Mandate Type',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'requestType',
      headerName: 'Request Type',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      renderCell: (params) => {
        const renderIcon = (IconComponent: any, colorClass: any) => (
          <div className="flex items-center gap-2">
            <IconComponent />
            <span className={`mb-[1px] ${colorClass}`}>{params.value}</span>
          </div>
        );

        switch (params.value) {
          case RequestType.Creation:
            return renderIcon(CreationRequestIcon, 'text-greenPrimary font-semibold');
          case RequestType.Enable:
            return renderIcon(CreationRequestIcon, 'text-greenPrimary font-semibold');
          case RequestType.Update:
            return renderIcon(UpdateRequestIcon, 'text-lightPurple font-semibold');
          case RequestType.Disable:
            return renderIcon(DisableRequestIcon, 'text-yellowNeutral font-semibold');
          case RequestType.Deletion:
            return renderIcon(DeleteRequestIcon, 'text-redSecondary font-semibold');
          default:
            return <span>{params.value}</span>;
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
      field: 'action',
      headerName: 'Action',
      width: 150,
      headerClassName: 'ag-thead',
      renderCell: (params) => {
        const route =
          params.row.requestType === RequestType.Creation
            ? appRoutes.merchantDashboard.requests.createRequestDetails
            : params.row.requestType === RequestType.Enable
              ? appRoutes.merchantDashboard.requests.createRequestDetails
              : params.row.requestType === RequestType.Update
                ? appRoutes.merchantDashboard.requests.updateRequestDetails
                : params.row.requestType === RequestType.Disable
                  ? appRoutes.merchantDashboard.requests.disableRequestDetails
                  : params.row.requestType === RequestType.Deletion
                    ? appRoutes.merchantDashboard.requests.deletionRequestDetails
                    : null;

        if (!route) return <span>View Details</span>;

        return (
          <Link
            to={`/${appRoutes.merchantDashboard.requests.createRequestDetails}/${params.id}`}
            className="cursor-pointer font-semibold text-lightPurple"
          >
            View Details
          </Link>
        );
      },
    },
  ];

  const { data, refetch } = useQuery({
    queryKey: ['mandateRequests', queryParams],
    queryFn: ({ queryKey }) => getMandateRequests(queryKey[1] as QueryParams),
  });

  const { data: statistics } = useQuery({
    queryKey: ['mandateStatistics', queryParams],
    queryFn: () => getMandateStatistics(),
  });

  const tabsList: TabsProps[] = [
    {
      tabIndex: 1,
      tabName: TabsListTabNames.Pending,
      tabTotal: statistics?.responseData?.totalPending,
    },
    {
      tabIndex: 2,
      tabName: TabsListTabNames.Approved,
      tabTotal: statistics?.responseData?.totalApproved,
    },
    {
      tabIndex: 3,
      tabName: TabsListTabNames.Declined,
      tabTotal: statistics?.responseData?.totalRejected,
    },
  ];

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      status: activeTab,
      pageNo: paginationData.pageNumber,
      pageSize: paginationData.pageSize,
      searchFilter: formik.values.searchMandate,
      startDate: formik.values.fromDateFilter,
      endDate: formik.values.toDateFilter,
    }));
  }, [
    activeTab,
    formik.values.searchMandate,
    formik.values.fromDateFilter,
    formik.values.toDateFilter,
    paginationData,
  ]);

  return (
    <>
      <div className="px-5 py-5">
        <h2 className="text-2xl font-semibold">Requests</h2>

        <div className="mt-5 w-full rounded-lg bg-white px-5 py-5">
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row lg:gap-0">
            <div className="flex w-full flex-row items-center justify-center gap-6 md:gap-10 lg:w-[50%] lg:justify-start">
              <CustomTabs tabs={tabsList} activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            <div className="">
              <TableFilter
                name={'searchMandate'}
                placeholder={'Search Mandate'}
                label={'Search Mandate'}
                value={searchTerm}
                setSearch={setSearchTerm}
                handleOptionsFilter={() => refetch()}
                formik={formik}
                fromDateName={'fromDateFilter'}
                toDateName={'toDateFilter'}
                selectName={'statusFilter'}
                translationX={isLargeWidth ? 350 : undefined}
                isRequestsFilter
              />
            </div>
          </div>
          <div className="h-[2px] w-full bg-grayPrimary"></div>
          <div className="mt-6 w-full">
            <CustomTable
              tableData={data?.responseData?.items}
              columns={MandateTableColumn}
              rowCount={data?.responseData?.totalCount}
              paginationData={paginationData}
              setPaginationData={setPaginationData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MandateRequests;
