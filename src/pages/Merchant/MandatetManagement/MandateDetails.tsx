import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowRightIcon,
  CloseIcon,
  CreationRequestIcon,
  DownloadIcon,
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
import { CircularProgress, Popover } from '@mui/material';
import WhiteArrowDown from 'assets/icons/WhiteArrowDown';
import SearchIcon from 'assets/icons/SearchIcon';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteMandate,
  disableMandate,
  enableMandate,
  getMandateById,
  updateMandate,
} from 'config/actions/dashboard-actions';
import { updateMandateSchema } from 'utils/formValidators';
import { useFormik } from 'formik';
import CustomInput from 'components/FormElements/CustomInput';
import { notifyError } from 'utils/helpers';
import { MandateRequestStatus, RequestType } from 'utils/enums';

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
};

const MandateDetails = () => {
  const { tab, setTab } = useTabContext();
  const { id: mandateId } = useParams();

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

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const modifyMandateValidation = useFormik({
    initialValues: {
      amount: null,
    },
    validationSchema: updateMandateSchema,
    onSubmit: (values) => {
      console.log(values);
      openModal('confirmModifyMandate');
      closeModal('openModifyMandate');
    },
  });

  const { isLoading, data } = useQuery({
    queryKey: ['mandates', mandateId],
    queryFn: ({ queryKey }) => getMandateById(queryKey[1]),
  });

  let buttonTitle = data?.responseData?.isActive ? 'Disable' : 'Enable';

  const selectModal = () => {
    if (buttonTitle === 'Enable') {
      return openModal('openEnableMandate');
    } else if (buttonTitle === 'Disable') {
      return openModal('openDisableMandate');
    }
  };

  const updateMandateMutation = useMutation({
    mutationFn: (requestId: string | undefined) => updateMandate(requestId),
    onSuccess: () => {
      openModal('saveModifyMandate');
      closeModal('confirmModifyMandate');
    },
    onError: (error) => {
      closeModal('confirmModifyMandate');
      notifyError(error?.message);
    },
  });

  const enableMandateMutation = useMutation({
    mutationFn: (requestId: string | undefined) => enableMandate(requestId),
    onSuccess: () => {
      openModal('confirmEnableMandate');
      closeModal('openEnableMandate');
    },
    onError: (error) => {
      closeModal('openEnableMandate');
      notifyError(error?.message);
    },
  });

  const disableMandateMutation = useMutation({
    mutationFn: (requestId: string | undefined) => disableMandate(requestId),
    onSuccess: () => {
      openModal('confirmDisableMandate');
      closeModal('openDisableMandate');
    },
    onError: (error) => {
      closeModal('openDisableMandate');
      notifyError(error?.message);
    },
  });

  const deleteMandateMutation = useMutation({
    mutationFn: (requestId: string | undefined) => deleteMandate(requestId),
    onSuccess: () => {
      openModal('confirmDeleteProfile');
      closeModal('openDeleteProfile');
    },
    onError: (error) => {
      closeModal('openDeleteProfile');
      notifyError(error?.message);
    },
  });

  return (
    <>
      <div className="px-5 py-5">
        <div className="flex items-center gap-4">
          <Link
            to={`/${appRoutes.merchantDashboard.mandateManagement.index}`}
            className="cursor-pointer text-sm text-darkgray"
          >
            Mandate Management
          </Link>{' '}
          <ArrowRightIcon style="" />
          <span className="text-sm font-semibold text-lightPurple">Request Details</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <h2 className="mt-3 text-xl font-semibold">Request ID : Req123456</h2>
          <div className="">
            <ButtonComponent
              onClick={(e) => handleClick(e)}
              title="Actions"
              children={<WhiteArrowDown styles="ml-2" />}
              backgroundColor="#5C068C"
              hoverBackgroundColor="#5C067C"
              color="white"
              width="141px"
              height="50px"
              fontSize="16px"
            />
          </div>
        </div>
        {isLoading ? (
          <div className="flex h-[50vh] flex-col items-center justify-center">
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          </div>
        ) : (
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
                <DetailsCard title="Account ID" content={data?.responseData?.accountId} />
                <DetailsCard title="Merchant ID" content={data?.responseData?.merchantId} />
                <DetailsCard title="Merchant Code" content={data?.responseData?.mandateCode} />
                <DetailsCard
                  title="Date Created"
                  content={
                    data?.responseData?.dateCreated &&
                    new Date(data.responseData.dateCreated).toLocaleDateString()
                  }
                />
                <DetailsCard title="Product ID" content={data?.responseData?.productId} />
                <DetailsCard
                  title="Amount"
                  content={data?.responseData?.amount}
                  contentClassName="text-lightPurple"
                />
                <DetailsCard
                  title="Effective Date"
                  content={
                    data?.responseData?.startDate &&
                    new Date(data.responseData.startDate).toLocaleDateString()
                  }
                />
                <DetailsCard
                  title="End Date"
                  content={
                    data?.responseData?.endDate &&
                    new Date(data.responseData.endDate).toLocaleDateString()
                  }
                />
                <DetailsCard title="Day to apply" content={data?.responseData?.dayToApply} />
                <DetailsCard title="Frequency" content={data?.responseData?.frequency} />
                <DetailsCard title="Service" content={data?.responseData?.service} />
                <DetailsCard title="Narration" content={data?.responseData?.narration} />
                <DetailsCard title="Account Number" content={data?.responseData?.accountNumber} />
                <DetailsCard title="Account Name" content={data?.responseData?.accountName} />
                <DetailsCard title="Bank Code" content="787878" />
              </div>
            </div>
            <div className="mt-8 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
              <div className="">
                <p className="my-3 text-lg font-semibold">Payer Details</p>
              </div>
              <div className="h-[2px] w-full bg-grayPrimary"></div>
              <div className="mt-4 grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[50px]">
                <DetailsCard title="Payer Name" content={data?.responseData?.payerName} />
                <DetailsCard title="Address" content={data?.responseData?.payerAddress} />
                <DetailsCard
                  title="Email Address"
                  content={data?.responseData?.payerEmailAddress}
                />
                <DetailsCard title="Phone Number" content={data?.responseData?.payerPhoneNumber} />
              </div>
            </div>
            <div className="mt-8 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
              <div className="">
                <p className="my-3 text-lg font-semibold">Payee Details</p>
              </div>
              <div className="h-[2px] w-full bg-grayPrimary"></div>
              <div className="mt-4 grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[50px]">
                <DetailsCard title="Payee Name" content={data?.responseData?.payeeName} />
                <DetailsCard title="Address" content={data?.responseData?.payeeAddress} />
                <DetailsCard
                  title="Email Address"
                  content={data?.responseData?.payeeEmailAddress}
                />
                <DetailsCard title="Phone Number" content={data?.responseData?.payeePhoneNumber} />
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
                <DetailsCard
                  title="Biller Account Number"
                  content={data?.responseData?.billerAccountNumber}
                />
                <DetailsCard title="Bank Name" content="Access Bank" />
                <DetailsCard title="Account Name" content="Vekee James Ventures" />
                <DetailsCard title="Bank Code" content={data?.responseData?.bankCode} />
              </div>
            </div>
            <div className="mt-8 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
              <div className="flex items-center justify-between">
                <p className="my-3 text-lg font-semibold">Creator Details</p>
              </div>
              <div className="h-[2px] w-full bg-grayPrimary"></div>
              <div className="mt-4 grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[50px]">
                <DetailsCard title="ID" content="12345678" />
                <DetailsCard title="Created By" content={data?.responseData?.createdBy} />
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
                <DetailsCard title="Approved By" content={data?.responseData?.approvedBy} />
                <DetailsCard
                  title="Date Approved"
                  content={
                    data?.responseData?.dateApproved &&
                    new Date(data.responseData.dateApproved).toLocaleDateString()
                  }
                />
              </div>
            </div>
          </div>
        )}
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
              <div className="flex items-center justify-between font-gotham">
                <h1 className="font-semibold">Modify Mandate Details</h1>
                <button onClick={() => closeModal('openModifyMandate')}>
                  <CloseIcon />
                </button>
              </div>
              <div className="mt-3 h-[2px] w-full bg-grayPrimary"></div>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form onSubmit={modifyMandateValidation.handleSubmit}>
                <div className="flex flex-col gap-2 font-gotham">
                  <CustomInput
                    labelFor="amount"
                    label="Modify Amount"
                    containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 w-full mt-[4px]"
                    inputStyles="h-[40px] w-full px-2 focus:outline-none focus:ring-0"
                    inputType="number"
                    placeholder="Enter here"
                    formik={modifyMandateValidation}
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <div className="">
                    <ButtonComponent
                      type="submit"
                      title="Save"
                      backgroundColor="#5C068C"
                      hoverBackgroundColor="#5C067C"
                      color="white"
                      width="155px"
                      height="42px"
                      fontWeight={600}
                      fontSize="14px"
                    />
                  </div>
                </div>
              </form>
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
            updateMandateMutation.mutate(mandateId);
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
            enableMandateMutation.mutate(mandateId);
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
            disableMandateMutation.mutate(mandateId);
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
            deleteMandateMutation.mutate(mandateId);
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
        <Typography sx={{ p: 2, fontFamily: " 'Gotham', sans-serif " }}>
          <div className="flex w-[8rem] flex-col rounded-md p-1 text-[12px]">
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
