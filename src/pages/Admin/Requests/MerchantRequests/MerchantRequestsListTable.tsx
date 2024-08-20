import { DataGrid, gridClasses, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import { muiDashboardMerchantsList, pendingDashboardMerchantsList } from 'utils/constants';
import appRoutes from 'utils/constants/routes';
import TableLogo from 'assets/images/table_logo.png';
import CustomPopover from 'hoc/PopOverWrapper';
import PopoverTitle from 'components/common/PopoverTitle';
import { useState } from 'react';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import {
  CreationRequestIcon,
  DeleteRequestIcon,
  DisableRequestIcon,
  UpdateRequestIcon,
} from 'assets/icons';
import { DashboardMerchantDataRow } from 'utils/interfaces';

const MerchantRequestsListTable = ({ rowData }: { rowData: DashboardMerchantDataRow[] }) => {
  const [tableData, setTableData] = useState({
    pageNumber: 0,
    pageSize: 10,
  });

  const navigate = useNavigate();
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Merchant ID',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'merchantName',
      headerName: 'Merchant Name',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'cif',
      headerName: 'CIF Number',
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
          case 'Creation':
            return renderIcon(CreationRequestIcon, 'text-greenPrimary');
          case 'Update':
            return renderIcon(UpdateRequestIcon, 'text-lightPurple');
          case 'Disable':
            return renderIcon(DisableRequestIcon, 'text-yellowNeutral');
          case 'Deletion':
            return renderIcon(DeleteRequestIcon, 'text-redSecondary');
          default:
            return <span>{params?.row.requestType}</span>;
        }
      },
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
        const handleClick = () => {
          navigate({
            pathname: appRoutes.adminDashboard.merchantManagement.index,
            search: `?${createSearchParams({ id: params?.row.id })}`,
          });
        };

        const route =
          params?.row.requestType === 'Creation'
            ? `/${appRoutes.adminDashboard.requests.merchantRequests.merchantCreationRequest}`
            : params?.row.requestType === 'Deletion'
              ? `/${appRoutes.adminDashboard.requests.merchantRequests.merchantDeletionRequest}`
              : params?.row.requestType === 'Update'
                ? `/${appRoutes.adminDashboard.requests.merchantRequests.merchantUpdateRequest}`
                : params?.row.requestType === 'Disable'
                  ? `/${appRoutes.adminDashboard.requests.merchantRequests.merchantDisableRequest}`
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

  const handlePageSizeChange = (newPageSize: { page: number; pageSize: number }) => {
    if (newPageSize.pageSize !== tableData.pageSize) {
      setTableData((prev) => {
        return {
          ...prev,
          pageSize: newPageSize.pageSize,
          pageNumber: 0,
        };
      });
    } else {
      setTableData((prev) => {
        return {
          ...prev,
          pageSize: newPageSize.pageSize,
          pageNumber: newPageSize.page,
        };
      });
    }
  };

  return (
    <>
      <div className="slide-down w-full">
        {muiDashboardMerchantsList?.length > 0 ? (
          <div>
            <DataGrid
              rows={rowData}
              columns={columns}
              sx={{
                border: 0,
                [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
                  outline: 'none',
                },
                [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                  {
                    outline: 'none',
                  },
              }}
              rowHeight={70}
              columnHeaderHeight={70}
              disableRowSelectionOnClick
              disableColumnMenu
              pagination
              onPaginationModelChange={handlePageSizeChange}
              pageSizeOptions={[10, 20, 30]}
              paginationModel={{ page: tableData.pageNumber, pageSize: tableData.pageSize }}
              paginationMode="server"
              rowCount={100}
            />
          </div>
        ) : (
          <div className="slide-down mt-8 flex h-[30vh] flex-col items-center justify-center p-4 pb-8">
            <div>
              <img src={TableLogo} alt="group_logo" />
            </div>
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-bold">Oops! No Active Merchant Requests</h3>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MerchantRequestsListTable;
