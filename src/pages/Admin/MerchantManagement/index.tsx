import ButtonComponent from 'components/FormElements/Button';
import ArrowDownIcon from 'assets/icons/ArrowDownIcon';
import { useState } from 'react';
import TableFilter from 'components/TableFilter';
import CustomTable from 'components/CustomTable';
import { RequestTypes } from 'utils/enums';
import appRoutes from 'utils/constants/routes';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
  CreationRequestIcon,
  DeleteRequestIcon,
  DisableRequestIcon,
  UpdateRequestIcon,
} from 'assets/icons';
import { muiDashboardMerchantsList } from 'utils/constants';
import CustomPopover from 'hoc/PopOverWrapper';
import PopoverTitle from 'components/common/PopoverTitle';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';

const MerchantManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [modals, setModals] = useState({
    confirmDisableMerchant: false,
    disableSuccessfulModal: false,
  });

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

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
      sortable: false,
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
          case RequestTypes.Deletion:
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

  return (
    <>
      <section className="p-2 md:p-4">
        <div className="fade-in-down my-2 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">Merchant Requests</h1>
          </div>
        </div>
        <div className="">
          <div className="slide-down relative mt-5 flex flex-col items-center justify-center rounded-md bg-white p-2 md:p-4">
            <div className="flex w-full flex-col items-center justify-between gap-y-4 border-b pb-3 lg:flex-row">
              <div className="slide-down flex w-full items-center lg:w-[50%] lg:justify-start">
                <div className="">
                  <TableFilter
                    name={'searchMerchantName'}
                    placeholder={'Search Merchant Name'}
                    label={'Search Merchant'}
                    value={searchTerm}
                    handleFilter={() => setSearchTerm('')}
                    setSearch={setSearchTerm}
                  />
                </div>
              </div>
              <div className="flex w-full items-center justify-end gap-8 lg:w-[50%]">
                <ButtonComponent
                  color="purplePrimary"
                  width="7rem"
                  variant="outlined"
                  height="3rem"
                  type="button"
                  title="Export"
                  endIcon={<ArrowDownIcon />}
                />
              </div>
            </div>

            <div className="mt-6 w-full">
              <div className="w-full">
                <CustomTable
                  tableData={muiDashboardMerchantsList}
                  columns={columns}
                  rowCount={20}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
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
            openModal('disableSuccessfulModal');
          }}
        />
      )}
      {modals.disableSuccessfulModal && (
        <ModalWrapper
          isOpen={modals.disableSuccessfulModal}
          setIsOpen={() => closeModal('disableSuccessfulModal')}
          title={'Success!!'}
          info={'You have successfully disabled this merchant'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('disableSuccessfulModal');
          }}
        />
      )}
    </>
  );
};

export default MerchantManagement;
