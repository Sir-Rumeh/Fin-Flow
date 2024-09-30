import { useEffect, useState } from 'react';
import { mandateRequestsList } from 'utils/constants';
import TableFilter from 'components/TableFilter';
import { QueryParams, TabsProps } from 'utils/interfaces';
import CustomTabs from 'hoc/CustomTabs';
import { TabsListTabNames } from 'utils/enums';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { createSearchParams, Link } from 'react-router-dom';
import appRoutes from 'utils/constants/routes';
import {
  CreationRequestIcon,
  DeleteRequestIcon,
  DisableRequestIcon,
  UpdateRequestIcon,
} from 'assets/icons';
import { RequestTypes } from 'utils/enums';
import CustomTable from 'components/CustomTable';
import { useFormik } from 'formik';
import { Box, CircularProgress, useMediaQuery } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getMandateRequests } from 'config/actions/dashboard-actions';

const MandateRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const total = 20;
  const [activeTab, setActiveTab] = useState(TabsListTabNames.Pending);
  const [paginationData, setPaginationData] = useState({
    pageNumber: 1,
    pageSize: 10,
  });
  const tabsList: TabsProps[] = [
    {
      tabIndex: 1,
      tabName: TabsListTabNames.Pending,
      tabTotal: total,
    },
    {
      tabIndex: 2,
      tabName: TabsListTabNames.Approved,
      tabTotal: total,
    },
    {
      tabIndex: 3,
      tabName: TabsListTabNames.Declined,
      tabTotal: total,
    },
  ];

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
    status: activeTab,
    pageNo: paginationData.pageNumber,
    pageSize: paginationData.pageSize,
    sortBy: 'asc',
    sortOrder: 'desc',
  });

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      status: activeTab,
      pageNo: paginationData.pageNumber,
      pageSize: paginationData.pageSize,
    }));
  }, [activeTab, paginationData]);

  const columns: GridColDef[] = [
    {
      field: 'merchantId',
      headerName: 'Merchant ID',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      sortable: false,
    },
    {
      field: 'mandateCode',
      headerName: 'Mandate Code',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      sortable: false,
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
      renderCell: (params: GridRenderCellParams) => {
        const renderIcon = (IconComponent: React.ComponentType, colorClass: string) => (
          <div className="flex w-full items-center gap-2 font-semibold">
            <IconComponent />
            <span className={`mb-[1px] ${colorClass}`}>{params?.row.requestType}</span>
          </div>
        );
        switch (params?.row.requestType) {
          case RequestTypes.Creation:
            return renderIcon(CreationRequestIcon, 'text-greenPrimary');
          case RequestTypes.Update:
            return renderIcon(UpdateRequestIcon, 'text-lightPurple');
          case RequestTypes.Disable:
            return renderIcon(DisableRequestIcon, 'text-yellowNeutral');
          case RequestTypes.Enable:
            return renderIcon(CreationRequestIcon, 'text-greenPrimary');
          case RequestTypes.Deletion:
            return renderIcon(DeleteRequestIcon, 'text-redSecondary');
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
      field: 'actions',
      headerName: 'Action',
      headerClassName: 'ag-thead ',
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const route =
          params?.row.requestType === RequestTypes.Creation
            ? `/${appRoutes.adminDashboard.requests.mandateRequests.mandateCreationRequest}`
            : params?.row.requestType === RequestTypes.Deletion
              ? `/${appRoutes.adminDashboard.requests.mandateRequests.mandateDeletionRequest}`
              : params?.row.requestType === RequestTypes.Update
                ? `/${appRoutes.adminDashboard.requests.mandateRequests.mandateUpdateRequest}`
                : params?.row.requestType === RequestTypes.Disable
                  ? `/${appRoutes.adminDashboard.requests.mandateRequests.mandateDisableRequest}`
                  : params?.row.requestType === RequestTypes.Enable
                    ? `/${appRoutes.adminDashboard.requests.mandateRequests.mandateEnableRequest}`
                    : undefined;
        return (
          <div className="">
            <Link
              className="w-full text-start font-semibold text-lightPurple"
              to={{
                pathname: route,
                search: `?${createSearchParams({ id: params?.row.id })}`,
              }}
            >
              View Details
            </Link>
          </div>
        );
      },
    },
  ];

  const { isLoading, data, refetch, isFetching } = useQuery({
    queryKey: ['mandateRequests', queryParams],
    queryFn: ({ queryKey }) => getMandateRequests(queryKey[1] as QueryParams),
    enabled: !!queryParams.status,
  });

  const isLargeWidth = useMediaQuery('(min-width:1320px)');
  return (
    <>
      <section className="p-2 md:p-4">
        <div className="fade-in-down my-2 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">Mandate Requests</h1>
          </div>
        </div>
        {isLoading || isFetching ? (
          <div className="flex h-[30vh] flex-col items-center justify-center">
            <Box sx={{ display: 'flex' }}>
              <CircularProgress sx={{ color: '#5C068C' }} />
            </Box>
          </div>
        ) : (
          <div className="">
            <div className="slide-down relative mt-5 flex flex-col items-center justify-center rounded-md bg-white p-2 md:p-4">
              <div className="flex w-full flex-col justify-between gap-y-4 border-b pb-3 2xl:flex-row 2xl:items-center">
                <div className="flex w-full flex-row items-center justify-start gap-6 md:gap-10 lg:w-[50%]">
                  <CustomTabs tabs={tabsList} activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
                <div className="slide-down flex w-full items-center lg:w-[50%] lg:justify-end">
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
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 w-full">
                <CustomTable
                  tableData={data?.responseData?.items}
                  columns={columns}
                  rowCount={data?.responseData?.totalCount}
                  paginationData={paginationData}
                  setPaginationData={setPaginationData}
                />
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default MandateRequests;
