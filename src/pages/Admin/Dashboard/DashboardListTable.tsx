import { DataGrid, gridClasses, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import ButtonComponent from 'components/FormElements/Button';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import { muiDashboardMerchantsList } from 'utils/constants';
import appRoutes from 'utils/constants/routes';
import TableLogo from 'assets/images/table_logo.png';
import CustomPopover from 'hoc/PopOverWrapper';
import PopoverTitle from 'components/common/PopoverTitle';
import { useState } from 'react';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';

const DashboardListTable = () => {
  const [confirmDisableModal, setConfirmDisableModal] = useState(false);
  const [actionSuccessfulModal, setActionSuccessfulModal] = useState(false);
  const [tableData, setTableData] = useState({
    pageNumber: 0,
    pageSize: 10,
  });

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
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
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
        return (
          <div className="-ml-1 h-full border-none">
            <CustomPopover
              popoverId={params?.row.id}
              buttonIcon={<PopoverTitle title="Actions" />}
              translationX={-40}
              translationY={50}
            >
              <div className="flex w-[8rem] flex-col rounded-md p-1 text-sm">
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
                  onClick={() => setConfirmDisableModal(true)}
                  type="button"
                  className="w-full px-3 py-2 text-start font-[600] text-red-400 hover:bg-purpleSecondary"
                >
                  Disable
                </button>
                <button
                  type="button"
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
          <DataGrid
            rows={muiDashboardMerchantsList}
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
        ) : (
          <div className="slide-down mt-8 flex h-[30vh] flex-col items-center justify-center p-4 pb-8">
            <div>
              <img src={TableLogo} alt="group_logo" />
            </div>
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-bold">Oops! No Active Merchants</h3>
            </div>
          </div>
        )}
      </div>
      {confirmDisableModal && (
        <ModalWrapper
          isOpen={confirmDisableModal}
          setIsOpen={setConfirmDisableModal}
          title={'Disable Merchant?'}
          info={'You are about to disable this merchant, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            setConfirmDisableModal(false);
            setActionSuccessfulModal(true);
          }}
        />
      )}
      {actionSuccessfulModal && (
        <ModalWrapper
          isOpen={actionSuccessfulModal}
          setIsOpen={setActionSuccessfulModal}
          title={'Success!!'}
          info={'You have successfully disabled this merchant'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            setActionSuccessfulModal(false);
          }}
        />
      )}
    </>
  );
};

export default DashboardListTable;
