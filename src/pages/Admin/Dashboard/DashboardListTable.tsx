import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import { muiDashboardMerchantsList } from 'utils/constants';
import appRoutes from 'utils/constants/routes';
import CustomPopover from 'hoc/PopOverWrapper';
import PopoverTitle from 'components/common/PopoverTitle';
import { useState } from 'react';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import CustomTable from 'components/CustomTable';

const DashboardListTable = () => {
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
      <div className="w-full">
        <CustomTable tableData={muiDashboardMerchantsList} columns={columns} rowCount={20} />
      </div>
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

export default DashboardListTable;
