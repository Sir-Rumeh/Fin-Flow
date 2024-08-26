import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
  CreationRequestIcon,
  DeleteRequestIcon,
  DisableRequestIcon,
  SuccessModalIcon,
  UpdateRequestIcon,
} from 'assets/icons';
import { BiChevronDown, BiSearch } from 'react-icons/bi';
import { mandateList, transactionHistory } from 'utils/constants';
import appRoutes from 'utils/constants/routes';
import TableLogo from 'assets/images/table_logo.png';
import { RequestType } from 'utils/enums';
import ButtonComponent from 'components/FormElements/Button';
import { IoFilter } from 'react-icons/io5';
import CustomPopover from 'hoc/PopOverWrapper';
import PopoverTitle from 'components/common/PopoverTitle';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { LiaTimesSolid } from 'react-icons/lia';
import Tab from 'components/Tabs';
import { FiDownload } from 'react-icons/fi';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  fontFamily: 'sans-serif',
};

const MandatetManagement = () => {
  const [tab, setTab] = useState(1);

  const [modals, setModals] = useState({
    openTransactionHistory: false,
    openModifyMandate: false,
    confirmModifyMandate: false,
    saveModifyMandate: false,
    openEnableMandate: false,
    openDisableMandate: false,
    confirmDisableMandate: false,
    confirmEnableMandate: false,
    openDeleteProfile: false,
    confirmDeleteProfile: false,
  });

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

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
            <span className={`mb-0 ${colorClass}`}>{params.value}</span>
          </div>
        );

        const getIconAndColor = (requestType: RequestType) => {
          switch (requestType) {
            case RequestType.Creation:
            case RequestType.Enabled:
              return { IconComponent: CreationRequestIcon, colorClass: 'text-greenPrimary' };
            case RequestType.Update:
              return { IconComponent: UpdateRequestIcon, colorClass: 'text-lightPurple' };
            case RequestType.Disable:
              return { IconComponent: DisableRequestIcon, colorClass: 'text-yellowNeutral' };
            case RequestType.Deletion:
            case RequestType.Disabled:
              return { IconComponent: DeleteRequestIcon, colorClass: 'text-redSecondary' };
            default:
              return null;
          }
        };

        const iconAndColor = getIconAndColor(params.value);

        if (iconAndColor) {
          return renderIcon(iconAndColor.IconComponent, iconAndColor.colorClass);
        }

        return <span>{params.value}</span>;
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
        const requestType = params.row.requestType;

        const isEnabled = requestType === RequestType.Enabled;

        const buttonTitle = isEnabled ? 'Disable' : 'Enable';
        const buttonColorClass = isEnabled ? 'text-red-400' : 'text-greenPrimary';

        const selectModal = () => {
          if (buttonTitle === 'Enable') {
            return openModal('openEnableMandate');
          } else {
            return openModal('openDisableMandate');
          }
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
                  to={`/${appRoutes.merchantDashboard.mandateManagement.mandateDetails}`}
                  className="w-full px-3 py-2 text-start font-semibold opacity-75 hover:bg-purpleSecondary"
                >
                  View Details
                </Link>
                <button
                  type="button"
                  onClick={() => openModal('openTransactionHistory')}
                  className="w-full px-3 py-2 text-start font-semibold opacity-75 hover:bg-purpleSecondary"
                >
                  View Transactions
                </button>
                <button
                  type="button"
                  onClick={() => openModal('openModifyMandate')}
                  className="w-full px-3 py-2 text-start font-semibold opacity-75 hover:bg-purpleSecondary"
                >
                  Update Amount
                </button>
                <button
                  type="button"
                  onClick={() => selectModal()}
                  className={`w-full px-3 py-2 text-start font-semibold opacity-75 hover:bg-purpleSecondary ${buttonColorClass}`}
                >
                  {buttonTitle}
                </button>
                <button
                  type="button"
                  className="w-full px-3 py-2 text-start font-[600] text-red-400 hover:bg-purpleSecondary"
                  onClick={() => openModal('openDeleteProfile')}
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

  const TransactionsTableColumn: GridColDef[] = [
    {
      field: 'accountId',
      headerName: 'Account ID',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'date',
      headerName: 'Date',
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
      width: 180,
      renderCell: (params) => {
        return (
          <button className="flex cursor-pointer items-center gap-3 font-medium text-lightPurple">
            <FiDownload />
            Download Receipt
          </button>
        );
      },
    },
  ];

  return (
    <>
      <div className="px-5 py-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Mandate Management</h2>
          <ButtonComponent
            onClick={() => {}}
            title="Create Mandate"
            backgroundColor="#5C068C"
            color="white"
            width="200px"
            height="50px"
          />
        </div>
        <div className="mt-5 rounded-lg bg-white px-5 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ButtonComponent
                onClick={() => {}}
                title="Filter by"
                children={<IoFilter className="mb-[1px] ml-3 h-5 w-5" />}
                color="#5C068C"
                border={1}
                width="150px"
                height="45px"
              />
              <div className="flex h-[45px] w-[309px] cursor-pointer items-center gap-2 rounded-lg border border-lightPurple px-4 py-2">
                <BiSearch className="h-6 w-6" />
                <input
                  type="text"
                  className="w-full border-none focus:border-none focus:outline-none"
                  placeholder="Search"
                />
              </div>
            </div>
            <ButtonComponent
              onClick={() => {}}
              title="Export"
              children={<BiChevronDown className="mb-[1px] ml-2 h-8 w-8" />}
              color="#5C068C"
              border={1}
              width="150px"
              height="45px"
            />
          </div>
          <div className="mt-4 h-[2px] w-full bg-grayPrimary"></div>
          <div className="mt-6 w-full">
            {mandateList.length > 0 ? (
              <DataGrid
                rows={mandateList}
                columns={MandateTableColumn}
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
                  <h3 className="text-2xl font-bold">Oops! No Active Mandates</h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {modals.openTransactionHistory && (
        <Modal
          open={modals.openTransactionHistory}
          onClose={() => closeModal('openTransactionHistory')}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <div className="flex items-center justify-between">
                <h1>Transaction History Details</h1>
                <button onClick={() => closeModal('openTransactionHistory')}>
                  <LiaTimesSolid />
                </button>
              </div>
              <div className="mt-3 h-[2px] w-full bg-grayPrimary"></div>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className="">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-between gap-4">
                    <Tab
                      label="Successful"
                      count={20}
                      isActive={tab === 1}
                      onClick={() => setTab(1)}
                      activeColor="blue-500"
                      inactiveColor="green-500"
                    />
                    <Tab
                      label="Failed"
                      count={20}
                      isActive={tab === 2}
                      onClick={() => setTab(2)}
                      activeColor="blue-500"
                      inactiveColor="red-500"
                    />
                  </div>
                  <div className="flex h-[45px] w-[309px] cursor-pointer items-center gap-2 rounded-lg border border-lightPurple px-4 py-2">
                    <BiSearch className="h-6 w-6" />
                    <input
                      type="text"
                      className="w-full border-none focus:border-none focus:outline-none"
                      placeholder="Search"
                    />
                  </div>
                </div>
                <div className="mt-3 h-[2px] w-full bg-grayPrimary"></div>
                <div className="mt-6">
                  {transactionHistory.length > 0 ? (
                    <DataGrid
                      rows={transactionHistory}
                      columns={TransactionsTableColumn}
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
                        <h3 className="text-2xl font-bold">Oops! No Transactions</h3>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Typography>
          </Box>
        </Modal>
      )}
      {modals.openModifyMandate && (
        <Modal
          open={modals.openModifyMandate}
          onClose={() => closeModal('openModifyMandate')}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <div className="flex items-center justify-between">
                <h1 className="font-semibold">Modify Mandate Details</h1>
                <button onClick={() => closeModal('openModifyMandate')}>
                  <LiaTimesSolid />
                </button>
              </div>
              <div className="mt-3 h-[2px] w-full bg-grayPrimary"></div>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className="flex flex-col gap-2">
                <label htmlFor="modifiedAmount">Modify Amount</label>
                <input type="text" className="b h-[50px] w-full rounded-lg border px-2" />
              </div>
              <div className="mt-4 flex justify-end">
                <ButtonComponent
                  onClick={() => {
                    openModal('confirmModifyMandate');
                    closeModal('openModifyMandate');
                  }}
                  title="Save"
                  backgroundColor="#5C068C"
                  color="white"
                  width="200px"
                  height="50px"
                />
              </div>
            </Typography>
          </Box>
        </Modal>
      )}
      {modals.confirmModifyMandate && (
        <ModalWrapper
          isOpen={modals.confirmModifyMandate}
          setIsOpen={() => closeModal('confirmModifyMandate')}
          title={'Save Changes?'}
          info={
            'You are about to save changes made to this mandate, would you want to proceed with this?'
          }
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            openModal('saveModifyMandate');
            closeModal('confirmModifyMandate');
          }}
        />
      )}
      {modals.saveModifyMandate && (
        <ModalWrapper
          isOpen={modals.saveModifyMandate}
          setIsOpen={() => closeModal('saveModifyMandate')}
          title={'Success!!'}
          info={'You have successfully saved new changes'}
          icon={<SuccessModalIcon />}
          type={'completed'}
          proceedAction={() => closeModal('saveModifyMandate')}
        />
      )}
      {modals.openEnableMandate && (
        <ModalWrapper
          isOpen={modals.openEnableMandate}
          setIsOpen={() => closeModal('openEnableMandate')}
          title={'Enable Mandate?'}
          info={'You are about to enable this mandate, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            openModal('confirmEnableMandate');
            closeModal('openEnableMandate');
          }}
        />
      )}
      {modals.confirmEnableMandate && (
        <ModalWrapper
          isOpen={modals.confirmEnableMandate}
          setIsOpen={() => closeModal('confirmEnableMandate')}
          title={'Success!!'}
          info={'You have successfully enabled this mandate'}
          icon={<SuccessModalIcon />}
          type={'completed'}
          proceedAction={() => closeModal('confirmEnableMandate')}
        />
      )}
      {modals.openDisableMandate && (
        <ModalWrapper
          isOpen={modals.openDisableMandate}
          setIsOpen={() => closeModal('openDisableMandate')}
          title={'Disable Mandate?'}
          info={'You are about to disable this mandate, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'reject'}
          proceedAction={() => {
            openModal('confirmDisableMandate');
            closeModal('openDisableMandate');
          }}
        />
      )}
      {modals.confirmDisableMandate && (
        <ModalWrapper
          isOpen={modals.confirmDisableMandate}
          setIsOpen={() => closeModal('confirmDisableMandate')}
          title={'Success!!'}
          info={'You have successfully disabled this mandate'}
          icon={<SuccessModalIcon />}
          type={'completed'}
          proceedAction={() => closeModal('confirmDisableMandate')}
        />
      )}
      {modals.openDeleteProfile && (
        <ModalWrapper
          isOpen={modals.openDeleteProfile}
          setIsOpen={() => closeModal('openDeleteProfile')}
          title={'Delete Profile?'}
          info={'You are about to delete this mandate, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            openModal('confirmDeleteProfile');
            closeModal('openDeleteProfile');
          }}
        />
      )}
      {modals.confirmDeleteProfile && (
        <ModalWrapper
          isOpen={modals.confirmDeleteProfile}
          setIsOpen={() => closeModal('confirmDeleteProfile')}
          title={'Success!!'}
          info={'You have successfully deleted this mandate'}
          icon={<SuccessModalIcon />}
          type={'completed'}
          proceedAction={() => closeModal('confirmDeleteProfile')}
        />
      )}
    </>
  );
};

export default MandatetManagement;
