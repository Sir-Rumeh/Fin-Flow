import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRightIcon,
  CloseIcon,
  CreationRequestIcon,
  SuccessModalIcon,
  UpdateRequestIcon,
} from 'assets/icons';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import ButtonComponent from 'components/FormElements/Button';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import appRoutes from 'utils/constants/routes';
import { useTabContext } from '../../../context/TabContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Tab from 'components/Tabs';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { transactionHistory } from 'utils/constants';
import TableLogo from 'assets/images/table_logo.png';
import { Popover } from '@mui/material';
import WhiteArrowDown from 'assets/icons/WhiteArrowDown';
import DownloadIcon from 'assets/icons/DownloadIcon';
import SearchIcon from 'assets/icons/SearchIcon';

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
  // fontFamily: 'sans-serif',
};

const MandateDetails = () => {
  const { tab, setTab } = useTabContext();

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
            <DownloadIcon />
            Download Receipt
          </button>
        );
      },
    },
  ];

  let buttonTitle = 'Disable';

  const selectModal = () => {
    if (buttonTitle === 'Enable') {
      return openModal('openEnableMandate');
    } else if (buttonTitle === 'Disable') {
      return openModal('openDisableMandate');
    }
  };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <div className="px-5 py-5">
        <div className="flex items-center gap-2">
          <Link
            to={`/${appRoutes.merchantDashboard.mandateManagement.index}`}
            className="cursor-pointer text-sm text-darkgray"
          >
            Mandate Management
          </Link>{' '}
          <ArrowRightIcon style="mt-[2px]" />
          <span className="text-sm text-lightPurple">Request Details</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <h2 className="mt-3 text-xl font-semibold">Request ID : Req123456</h2>
          <ButtonComponent
            onClick={(e) => handleClick(e)}
            title="Actions"
            children={<WhiteArrowDown styles="ml-2" />}
            backgroundColor="#5C068C"
            hoverBackgroundColor="#5C067C"
            color="white"
            width="150px"
            height="50px"
          />
        </div>
        <div className="mt-5 rounded-lg bg-white px-5 py-10">
          <div className="rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
            <div className="flex items-center justify-between">
              <p className="my-3 text-lg font-semibold">Request Details</p>
              <div className="flex items-center gap-2">
                <p>Mandate Type</p>
                <div className="flex items-center gap-2">
                  <UpdateRequestIcon />
                  <p className="text-lightPurple">Variable</p>
                </div>
              </div>
            </div>
            <div className="h-[2px] w-full bg-grayPrimary"></div>
            <div className="mt-4 grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[50px]">
              <DetailsCard title="Account ID" content="12345" />
              <DetailsCard title="Merchant ID" content="12345" />
              <DetailsCard title="Merchant Code" content="12345" />
              <DetailsCard title="Date Created" content="12/12/2024 - 03:00pm" />
              <DetailsCard title="Product ID" content="12345" />
              <DetailsCard title="Amount" content="N 500,000" contentClassName="text-lightPurple" />
              <DetailsCard title="Effective Date" content="12/12/2024" />
              <DetailsCard title="End Date" content="12/12/2024" />
              <DetailsCard title="Day to apply" content="10/12/2024" />
              <DetailsCard title="Frequency" content="Monthly" />
              <DetailsCard title="Service" content="Life Insurance" />
              <DetailsCard title="Narration" content="Any narration can be here" />
              <DetailsCard title="Account Number" content="1234567" />
              <DetailsCard title="Account Name" content="Fair Money" />
              <DetailsCard title="Bank Code" content="787878" />
            </div>
          </div>
          <div className="mt-8 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
            <div className="">
              <p className="my-3 text-lg font-semibold">Payer Details</p>
            </div>
            <div className="h-[2px] w-full bg-grayPrimary"></div>
            <div className="mt-4 grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[50px]">
              <DetailsCard title="Payer Name" content="Vekee James Ventures" />
              <DetailsCard title="Address" content="Ozumba Mbadiwe Avenue, Lagos State" />
              <DetailsCard title="Email Address" content="vekee@gmail.com" />
              <DetailsCard title="Phone Number" content="09028272009" />
            </div>
          </div>
          <div className="mt-8 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
            <div className="">
              <p className="my-3 text-lg font-semibold">Payee Details</p>
            </div>
            <div className="h-[2px] w-full bg-grayPrimary"></div>
            <div className="mt-4 grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[50px]">
              <DetailsCard title="Payer Name" content="Vekee James Ventures" />
              <DetailsCard title="Address" content="Ozumba Mbadiwe Avenue, Lagos State" />
              <DetailsCard title="Email Address" content="vekee@gmail.com" />
              <DetailsCard title="Phone Number" content="09028272009" />
            </div>
          </div>
          <div className="mt-8 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
            <div className="flex items-center justify-between">
              <p className="my-3 text-lg font-semibold">Biller Details</p>
              <div className="flex items-center gap-2">
                <p>Biller Code :</p>
                <p>12344</p>
              </div>
            </div>
            <div className="h-[2px] w-full bg-grayPrimary"></div>
            <div className="mt-4 grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[50px]">
              <DetailsCard title="Biller Account Number" content="12345678" />
              <DetailsCard title="Bank Name" content="Access Bank" />
              <DetailsCard title="Account Name" content="Vekee James Ventures" />
              <DetailsCard title="Bank Code" content="09028272009" />
            </div>
          </div>
          <div className="mt-8 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
            <div className="flex items-center justify-between">
              <p className="my-3 text-lg font-semibold">Creator Details</p>
            </div>
            <div className="h-[2px] w-full bg-grayPrimary"></div>
            <div className="mt-4 grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[50px]">
              <DetailsCard title="ID" content="12345678" />
              <DetailsCard title="Created By" content="Vekee James Ventures" />
            </div>
          </div>
          <div className="mt-8 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
            <div className="flex items-center justify-between">
              <p className="my-3 text-lg font-semibold">Account Approval Details</p>
              <div className="flex items-center gap-2">
                <CreationRequestIcon />
                <p className="text-greenPrimary">Approved</p>
              </div>
            </div>
            <div className="h-[2px] w-full bg-grayPrimary"></div>
            <div className="mt-4 grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[50px]">
              <DetailsCard title="ID" content="12345678" />
              <DetailsCard title="Approved By" content="Vekee James Ventures" />
              <DetailsCard title="Date Approved" content="15/11/2023 - 12:12:12" />
            </div>
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
                  <CloseIcon />
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
                      inactiveColor="bg-green-500"
                    />
                    <Tab
                      label="Failed"
                      count={20}
                      isActive={tab === 2}
                      onClick={() => setTab(2)}
                      inactiveColor="bg-red-500"
                    />
                  </div>
                  <div className="flex h-[45px] w-[309px] cursor-pointer items-center gap-2 rounded-lg border border-lightPurple px-4 py-2">
                    <SearchIcon className="h-6 w-6" />
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
                  <CloseIcon />
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
          type={'confirmation'}
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
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
          <div className="flex w-[8rem] flex-col rounded-md p-1 text-sm">
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
              className={`w-full px-3 py-2 text-start font-semibold ${buttonTitle === 'Disable' ? 'text-redSecondary' : 'text-greenPrimary'} opacity-75 hover:bg-purpleSecondary`}
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
        </Typography>
      </Popover>
    </>
  );
};

export default MandateDetails;
