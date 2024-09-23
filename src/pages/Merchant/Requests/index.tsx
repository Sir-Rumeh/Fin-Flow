import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GridColDef } from '@mui/x-data-grid';
import {
  CreationRequestIcon,
  DeleteRequestIcon,
  DisableRequestIcon,
  UpdateRequestIcon,
} from 'assets/icons';
import appRoutes from 'utils/constants/routes';
import TableLogo from 'assets/images/table_logo.png';
import { useTabContext } from '../../../context/TabContext';
import { MandateRequestStatus, RequestType } from 'utils/enums';
import Tab from 'components/Tabs';
import CustomTable from 'components/CustomTable';
import TableFilter from 'components/TableFilter';
import { useFormik } from 'formik';
import { useQuery } from '@tanstack/react-query';
import { getMandateRequests } from 'config/actions/dashboard-actions';
import { QueryParams } from 'utils/interfaces';
import { Box, CircularProgress } from '@mui/material';

const MandateRequests = () => {
  const { tab, setTab } = useTabContext();
  const [searchTerm, setSearchTerm] = useState('');

  const [queryParams, setQueryParams] = useState<QueryParams>({
    mandateCode: '',
    status: MandateRequestStatus.Pending,
    pageNo: 1,
    pageSize: 10,
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
        console.log(params.id);

        const route =
          params.row.requestType === RequestType.Creation
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

  const formik = useFormik({
    initialValues: {
      searchMerchantName: '',
      fromDateFilter: '',
      toDateFilter: '',
      statusFilter: '',
    },
    onSubmit: (values) => {
      setSearchTerm('');
    },
  });

  const { isLoading, data } = useQuery({
    queryKey: ['mandateRequests', queryParams],
    queryFn: ({ queryKey }) => getMandateRequests(queryKey[1] as QueryParams),
    enabled: !!queryParams.status,
  });

  const handleTabClick = (tabIndex: number) => {
    setTab(tabIndex);
    const status =
      tabIndex === 1
        ? MandateRequestStatus.Pending
        : tabIndex === 2
          ? MandateRequestStatus.Approved
          : tabIndex === 3
            ? MandateRequestStatus.Declined
            : '';

    setQueryParams((prev) => ({ ...prev, status }));
  };

  useEffect(() => {
    setTab(1);
  }, []);

  return (
    <>
      <div className="px-5 py-5">
        <h2 className="text-2xl font-semibold">Requests</h2>
        <div className="mt-5 w-full rounded-lg bg-white px-5 py-5">
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row lg:gap-0">
            <div className="flex items-center gap-4 md:gap-5 lg:gap-10">
              <Tab
                label="Pending"
                count={20}
                isActive={tab === 1}
                onClick={() => {
                  setTab(1);
                  handleTabClick(1);
                }}
                inactiveColor="text-yellow-500"
              />
              <Tab
                label="Approved"
                count={20}
                isActive={tab === 2}
                onClick={() => {
                  setTab(2);
                  handleTabClick(2);
                }}
                inactiveColor="text-green-500"
              />
              <Tab
                label="Rejected"
                count={20}
                isActive={tab === 3}
                onClick={() => {
                  setTab(3);
                  handleTabClick(3);
                }}
                inactiveColor="text-red-500"
              />
            </div>
            <div className="">
              <TableFilter
                name={'searchMerchantName'}
                placeholder={'Search Merchant Name'}
                label={'Search Merchant'}
                value={searchTerm}
                setSearch={setSearchTerm}
                handleOptionsFilter={() => {}}
                formik={formik}
                fromDateName={'fromDateFilter'}
                toDateName={'toDateFilter'}
                selectName={'statusFilter'}
              />
            </div>
          </div>
          <div className="mt-4 h-[2px] w-full bg-grayPrimary"></div>
          <div className="mt-6 w-full">
            {isLoading ? (
              <div className="flex h-[30vh] flex-col items-center justify-center">
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
              </div>
            ) : data?.responseData?.items?.length > 0 ? (
              <CustomTable
                tableData={data?.responseData?.items}
                columns={MandateTableColumn}
                rowCount={20}
              />
            ) : (
              <div className="mt-8 flex h-[30vh] flex-col items-center justify-center p-4 pb-8">
                <div>
                  <img src={TableLogo} alt="group_logo" />
                </div>
                <div className="mt-8 text-center">
                  <h3 className="text-2xl font-bold">
                    {tab === 1 && `Oops! No Pending Mandates`}
                    {tab === 2 && `Oops! No Approved Mandates`}
                    {tab === 3 && `Oops! No Rejected Mandates`}
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MandateRequests;
