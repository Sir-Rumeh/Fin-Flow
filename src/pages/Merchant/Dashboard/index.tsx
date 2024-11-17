import DashboardCard from 'components/common/DashboardCards/DashboardCard';
import { useQuery } from '@tanstack/react-query';
import {
  getMandateRequests,
  getMandateRequestsByMerchantId,
  getMandateRequestsStatistics,
} from 'config/actions/dashboard-actions';
import { Skeleton } from '@mui/material';
import appRoutes from 'utils/constants/routes';
import { useEffect, useState } from 'react';
import { MerchantAuthData, QueryParams } from 'utils/interfaces';
import { Link } from 'react-router-dom';
import { MandateRequestStatus, RequestType } from 'utils/enums';
import {
  CreationRequestIcon,
  DeleteRequestIcon,
  DisableRequestIcon,
  UpdateRequestIcon,
} from 'assets/icons';
import { GridColDef } from '@mui/x-data-grid';
import CustomTable from 'components/CustomTable';
import { getUserFromLocalStorage } from 'utils/helpers';

const Dashboard = () => {
  const [paginationData, setPaginationData] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  const [queryParams, setQueryParams] = useState<QueryParams>({
    mandateCode: '',
    status: '',
    pageNo: paginationData.pageNumber,
    pageSize: paginationData.pageSize,
    sortBy: 'asc',
    sortOrder: 'desc',
  });

  const MandateTableColumn: GridColDef[] = [
    {
      field: 'accountId',
      headerName: 'Account ID',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
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

  const user = getUserFromLocalStorage() as MerchantAuthData;
  const loggedInMerchantId = user?.profileData?.merchantID;

  const { data, refetch } = useQuery({
    queryKey: ['mandateRequests', queryParams],
    queryFn: ({ queryKey }) =>
      getMandateRequestsByMerchantId(loggedInMerchantId, queryKey[1] as QueryParams),
  });

  const { isLoading: isStatisticsDataLoading, data: statistics } = useQuery({
    queryKey: ['mandateStatistics'],
    queryFn: () => getMandateRequestsStatistics(),
  });

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      pageNo: paginationData.pageNumber,
      pageSize: paginationData.pageSize,
    }));
  }, [paginationData]);

  return (
    <>
      <div className="px-5 py-5">
        <h2 className="text-2xl font-semibold">Welcome Back, Anita!</h2>
        <div className="mt-5 rounded-lg bg-white px-5 py-5">
          <p className="my-3 text-lg font-semibold">Onboarded Merchants</p>
          <div className="h-[2px] w-full bg-grayPrimary"></div>
          <div className="my-4 flex flex-col items-center justify-between gap-4 md:flex-row md:gap-8">
            {isStatisticsDataLoading ? (
              <>
                <Skeleton
                  variant="rectangular"
                  width={'100%'}
                  height={160}
                  sx={{ borderRadius: '8px' }}
                />
                <Skeleton
                  variant="rectangular"
                  width={'100%'}
                  height={160}
                  sx={{ borderRadius: '8px' }}
                />
                <Skeleton
                  variant="rectangular"
                  width={'100%'}
                  height={160}
                  sx={{ borderRadius: '8px' }}
                />
              </>
            ) : (
              <>
                <DashboardCard
                  title="Approved Mandate"
                  numberOfRequest={statistics?.responseData?.totalApproved ?? 0}
                  route={`/${appRoutes.merchantDashboard.requests.index}?status=${MandateRequestStatus.Approved}`}
                />
                <DashboardCard
                  title="Pending Requests"
                  numberOfRequest={statistics?.responseData?.totalPending ?? 0}
                  route={`/${appRoutes.merchantDashboard.requests.index}?status=${MandateRequestStatus.Pending}`}
                />
                <DashboardCard
                  title="Declined Requests"
                  numberOfRequest={statistics?.responseData?.totalRejected ?? 0}
                  route={`/${appRoutes.merchantDashboard.requests.index}?status=${MandateRequestStatus.Declined}`}
                />
              </>
            )}
          </div>
        </div>
        <div className="mt-5 rounded-lg bg-white px-5 py-5">
          <p className="my-3 text-lg font-bold">Recent Mandate Requests</p>
          <div className="h-[2px] w-full bg-grayPrimary"></div>
          <div className="mt-5">
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

export default Dashboard;
