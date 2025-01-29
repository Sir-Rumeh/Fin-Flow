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
import { RequestType, SearchTypes, TabsListTabNames } from 'utils/enums';
import CustomTable from 'components/CustomTable';
import TableFilter from 'components/TableFilter';
import { useFormik } from 'formik';
import { useQuery } from '@tanstack/react-query';
import {
  getMandateRequests,
  getMandateRequestsByMerchantId,
  getMandateRequestsStatistics,
  getMandateRequestsStatisticsByMerchantId,
} from 'config/actions/dashboard-actions';
import { MerchantAuthData, QueryParams, TabsProps } from 'utils/interfaces';
import { useMediaQuery } from '@mui/material';
import CustomTabs from 'hoc/CustomTabs';
import { getUserFromLocalStorage } from 'utils/helpers';
import { requestTypeDropdownOptions } from 'utils/constants';

const MandateRequests = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const status = urlParams.get('status');

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(status !== null ? status : TabsListTabNames.Pending);
  // const [activeTab, setActiveTab] = useState(TabsListTabNames.Pending);
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
      setQueryParams((prev) => ({
        ...prev,
        searchFilter: formik.values.searchMandate,
        pageNo:
          formik.values.searchMandate?.length > 0 || formik.values.statusFilter?.length > 0
            ? undefined
            : paginationData.pageNumber,
        pageSize:
          formik.values.searchMandate?.length > 0 || formik.values.statusFilter?.length > 0
            ? 100
            : paginationData.pageSize,
      }));
      refetch();
    },
  });

  const [queryParams, setQueryParams] = useState<QueryParams>({
    status: activeTab,
    requestType: '',
    pageNo: paginationData.pageNumber,
    pageSize: paginationData.pageSize,
    sortBy: 'asc',
    sortOrder: 'desc',
    searchFilter: formik.values.searchMandate,
    searchType: SearchTypes.SearchMandateRequests,
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
      field: 'accountNumber',
      headerName: 'Account Number',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      sortable: false,
    },
    // {
    //   field: 'mandateCode',
    //   headerName: 'Mandate Code',
    //   width: screen.width < 1000 ? 200 : undefined,
    //   flex: screen.width >= 1000 ? 1 : undefined,
    //   headerClassName: 'ag-thead',
    // },
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
        const renderIcon = (IconComponent: any, colorClass: string) => (
          <div className="flex items-center gap-2">
            <IconComponent />
            <span className={`mb-[1px] ${colorClass}`}>{params?.row.requestType}</span>
          </div>
        );
        switch (params.value) {
          case RequestType.Creation:
          case RequestType.Enable:
            return renderIcon(CreationRequestIcon, 'text-greenPrimary font-semibold');
          case RequestType.Update:
            return renderIcon(UpdateRequestIcon, 'text-lightPurple font-semibold');
          case RequestType.Disable:
            return renderIcon(DisableRequestIcon, 'text-yellowNeutral font-semibold');
          case RequestType.Deletion:
            return renderIcon(DeleteRequestIcon, 'text-redSecondary font-semibold');
          default:
            return <span>{params?.row.requestType}</span>;
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
              ? appRoutes.merchantDashboard.requests.enableRequestDetails
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
            to={`/${route}/${params.id}`}
            className="cursor-pointer font-semibold text-lightPurple"
          >
            View Details
          </Link>
        );
      },
    },
  ];

  const user = getUserFromLocalStorage() as MerchantAuthData;
  const loggedInMerchantId = user?.profileData?.merchantID;

  const { data, refetch } = useQuery({
    queryKey: ['mandateRequests', queryParams],
    queryFn: ({ queryKey }) =>
      getMandateRequestsByMerchantId(loggedInMerchantId, queryKey[1] as QueryParams),
    enabled: !!loggedInMerchantId,
  });

  const { data: statistics } = useQuery({
    queryKey: ['mandateStatistics', queryParams],
    queryFn: () => getMandateRequestsStatisticsByMerchantId(loggedInMerchantId),
  });

  const tabsList: TabsProps[] = [
    {
      tabIndex: 1,
      tabName: TabsListTabNames.Pending,
      tabTotal: statistics ? statistics?.responseData?.totalPending : 0,
    },
    {
      tabIndex: 2,
      tabName: TabsListTabNames.Approved,
      tabTotal: statistics ? statistics?.responseData?.totalApproved : 0,
    },
    {
      tabIndex: 3,
      tabName: TabsListTabNames.Declined,
      tabTotal: statistics ? statistics?.responseData?.totalRejected : 0,
    },
  ];

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      status: activeTab,
      requestType: formik.values.statusFilter,
      pageNo:
        formik.values.searchMandate?.length > 0 || formik.values.statusFilter?.length > 0
          ? undefined
          : paginationData.pageNumber,
      pageSize:
        formik.values.searchMandate?.length > 0 || formik.values.statusFilter?.length > 0
          ? 100
          : paginationData.pageSize,
      searchFilter: formik.values.searchMandate,
      startDate: formik.values.fromDateFilter,
      endDate: formik.values.toDateFilter,
    }));
  }, [activeTab, paginationData]);

  const handleOptionsFilter = () => {
    setQueryParams((prev) => ({
      ...prev,
      requestType: formik.values.statusFilter,
      startDate: formik.values.fromDateFilter,
      endDate: formik.values.toDateFilter,
    }));
  };

  console.log(queryParams.status);

  return (
    <>
      <div className="px-5 py-5">
        <h2 className="text-2xl font-semibold">Requests</h2>

        <div className="mt-5 w-full rounded-lg bg-white px-5 py-5">
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row lg:gap-0">
            <div className="flex w-full flex-row items-center justify-center gap-6 md:gap-10 lg:w-[50%] lg:justify-start">
              {/* <CustomTabs tabs={tabsList} activeTab={activeTab} setActiveTab={setActiveTab} /> */}
              <CustomTabs
                tabs={tabsList}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                performExtraAction={() =>
                  setPaginationData((prev) => {
                    return {
                      ...prev,
                      pageNumber: 1,
                    };
                  })
                }
              />
            </div>
            <div className="">
              <TableFilter
                name={'searchMandate'}
                placeholder={'Search By Account Number'}
                label={'Search Mandate'}
                value={searchTerm}
                setSearch={setSearchTerm}
                handleOptionsFilter={handleOptionsFilter}
                formik={formik}
                fromDateName={'fromDateFilter'}
                toDateName={'toDateFilter'}
                selectName={'statusFilter'}
                translationX={isLargeWidth ? 350 : undefined}
                isRequestsFilter
                dropdownOptions={requestTypeDropdownOptions}
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
