import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
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

const DashboardListTable = () => {
  const [confirmDisableModal, setConfirmDisableModal] = useState(false);

  const navigate = useNavigate();
  const id = '1';
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
            search: `?${createSearchParams({ id })}`,
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
                <Link
                  to={`/${appRoutes.adminDashboard.merchantManagement.merchantDetails}`}
                  className="w-full px-3 py-2 text-start font-bold opacity-75 hover:bg-purpleSecondary"
                >
                  View Details
                </Link>
                <Link
                  to={`/${appRoutes.adminDashboard.merchantManagement.merchantDetails}`}
                  className="w-full px-3 py-2 text-start font-bold opacity-75 hover:bg-purpleSecondary"
                >
                  Edit Details
                </Link>
                <button
                  onClick={() => setConfirmDisableModal(true)}
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
      <div className="w-full">
        {muiDashboardMerchantsList?.length > 0 ? (
          <DataGrid
            rows={muiDashboardMerchantsList}
            columns={columns}
            sx={{
              border: 0,
            }}
            rowHeight={70}
            columnHeaderHeight={70}
            disableRowSelectionOnClick
            disableColumnMenu
            pagination
          />
        ) : (
          <div className="mt-8 flex h-[30vh] flex-col items-center justify-center p-4 pb-8">
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
          proceedAction={() => {}}
        />
      )}
    </>
  );
};

export default DashboardListTable;
