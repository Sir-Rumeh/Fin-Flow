import { useEffect, useRef, useState } from 'react';
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
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { GridColDef } from '@mui/x-data-grid';
import { statusDropdownOptions, transactionHistory } from 'utils/constants';
import { Popover } from '@mui/material';
import WhiteArrowDown from 'assets/icons/WhiteArrowDown';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteMandate,
  disableMandate,
  enableMandate,
  getMandateById,
  getTransactionsByMerchantId,
  updateMandate,
} from 'config/actions/dashboard-actions';
import { updateMandateSchema } from 'utils/formValidators';
import { useFormik } from 'formik';
import CustomInput from 'components/FormElements/CustomInput';
import { formatNumberDisplay, getUserFromLocalStorage, notifyError } from 'utils/helpers';
import CustomModal from 'hoc/ModalWrapper/CustomModal';
import CustomTabs from 'hoc/CustomTabs';
import TableFilter from 'components/TableFilter';
import CustomTable from 'components/CustomTable';
import { MerchantAuthData, QueryParams, TabsProps } from 'utils/interfaces';
import { SearchTypes, TransactionsTabsListTabNames } from 'utils/enums';
import { useReactToPrint } from 'react-to-print';
import TransactionReceipt from 'components/TransactionReceipt';

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
  const queryClient = useQueryClient();
  const { id: mandateId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTransactionTab, setActiveTransactionTab] = useState('Successful');
  const [transactionDetails, setTransactionDetails] = useState<any>();
  const receiptRef = useRef<HTMLDivElement>(null);
  const user = getUserFromLocalStorage() as MerchantAuthData;
  const loggedInMerchantId = user?.profileData?.merchantID;
  const [transactionPaginationData, setTransactionPaginationData] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  const tabsList: TabsProps[] = [
    {
      tabIndex: 1,
      tabName: TransactionsTabsListTabNames.Successful,
      // tabTotal: total,
    },
    {
      tabIndex: 2,
      tabName: TransactionsTabsListTabNames.Pending,
      // tabTotal: total,
    },
    {
      tabIndex: 3,
      tabName: TransactionsTabsListTabNames.Failed,
      // tabTotal: total,
    },
  ];

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

  const handlePrintReceipt = useReactToPrint({
    content: () => receiptRef.current,
  });

  const handleDownloadReceipt = (row: any) => {
    setTransactionDetails(row);
    setTimeout(() => {
      handlePrintReceipt();
    }, 0);
  };

  const transactionsTableColumn: GridColDef[] = [
    // {
    //   field: 'accountId',
    //   headerName: 'Account ID',
    //   width: screen.width < 1000 ? 200 : undefined,
    //   flex: screen.width >= 1000 ? 1 : undefined,
    //   headerClassName: 'ag-thead',
    // },
    {
      field: 'mandateCode',
      headerName: 'Mandate Code',
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
      field: 'effectiveDate',
      headerName: 'Date',
      width: screen.width < 1000 ? 50 : 50,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      valueGetter: (params: any) => new Date(params).toLocaleDateString(),
    },
    {
      field: 'billingStatus',
      headerName: 'Billing Status',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'actions',
      headerName: 'Action',
      headerClassName: 'ag-thead ',
      sortable: false,
      width: 180,
      renderCell: (params) => {
        return (
          <button
            onClick={() => {
              handleDownloadReceipt(params?.row);
            }}
            className="flex cursor-pointer items-center gap-3 font-medium text-lightPurple"
          >
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
      amount: 0,
    },
    validationSchema: updateMandateSchema,
    onSubmit: (values) => {
      openModal('confirmModifyMandate');
      closeModal('openModifyMandate');
    },
  });

  const formik = useFormik({
    initialValues: {
      searchMerchantName: '',
      searchTransactionHistory: '',
      fromDateFilter: '',
      toDateFilter: '',
      statusFilter: '',
    },
    onSubmit: (values) => {
      setTransactionsQueryParams((prev) => ({
        ...prev,
        searchFilter: formik.values.searchTransactionHistory,
      }));
      refetchTransactions();
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ['mandate-details', mandateId],
    queryFn: ({ queryKey }) => getMandateById(queryKey[1]),
  });

  const [transactionsQueryParams, setTransactionsQueryParams] = useState<QueryParams>({
    mandateCode: data?.responseData?.mandateCode,
    status: activeTransactionTab,
    pageNo: transactionPaginationData.pageNumber,
    pageSize: transactionPaginationData.pageSize,
    searchFilter: formik.values.searchTransactionHistory,
    searchType: SearchTypes.SearchTransactions,
    sortBy: 'asc',
    sortOrder: 'desc',
  });

  useEffect(() => {
    setTransactionsQueryParams((prev) => ({
      ...prev,
      status: activeTransactionTab,
      pageNo: transactionPaginationData.pageNumber,
      pageSize: transactionPaginationData.pageSize,
    }));
  }, [transactionPaginationData]);

  const handleOptionsFilter = () => {
    setTransactionsQueryParams((prev) => ({
      ...prev,
      status: formik.values.statusFilter,
      startDate: formik.values.fromDateFilter,
      endDate: formik.values.toDateFilter,
    }));
  };

  const {
    isLoading: isTransactionsLoading,
    data: transactionsData,
    refetch: refetchTransactions,
  } = useQuery({
    queryKey: ['transactions', transactionsQueryParams],
    queryFn: ({ queryKey }) =>
      getTransactionsByMerchantId(loggedInMerchantId, queryKey[1] as QueryParams),
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
    mutationFn: ({
      requestId,
      payload,
    }: {
      requestId: string | undefined;
      payload: { amount: number };
    }) => updateMandate(requestId, payload),
    onSuccess: () => {
      openModal('saveModifyMandate');
      closeModal('confirmModifyMandate');
      queryClient.invalidateQueries({ queryKey: ['mandates'] });
    },
    onError: (error) => {
      closeModal('confirmModifyMandate');
    },
  });

  const enableMandateMutation = useMutation({
    mutationFn: (requestId: string | undefined) => enableMandate(requestId),
    onSuccess: () => {
      openModal('confirmEnableMandate');
      closeModal('openEnableMandate');
      queryClient.invalidateQueries({ queryKey: ['mandates'] });
    },
    onError: (error) => {
      closeModal('openEnableMandate');
    },
  });

  const disableMandateMutation = useMutation({
    mutationFn: (requestId: string | undefined) => disableMandate(requestId),
    onSuccess: () => {
      openModal('confirmDisableMandate');
      closeModal('openDisableMandate');
      queryClient.invalidateQueries({ queryKey: ['mandates'] });
    },
    onError: (error) => {
      closeModal('openDisableMandate');
    },
  });

  const deleteMandateMutation = useMutation({
    mutationFn: (requestId: string | undefined) => deleteMandate(requestId),
    onSuccess: () => {
      openModal('confirmDeleteProfile');
      closeModal('openDeleteProfile');
      queryClient.invalidateQueries({ queryKey: ['mandates'] });
    },
    onError: (error) => {
      closeModal('openDeleteProfile');
    },
  });

  return (
    <>
      <div style={{ display: 'none' }}>
        <TransactionReceipt ref={receiptRef} data={transactionDetails} />
      </div>
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
              <DetailsCard title="Mandate Code" content={data?.responseData?.mandateCode} />
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
                content={`\u20A6${formatNumberDisplay(data?.responseData?.amount)}`}
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
              <DetailsCard title="Email Address" content={data?.responseData?.payerEmailAddress} />
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
              <DetailsCard title="Email Address" content={data?.responseData?.payeeEmailAddress} />
              <DetailsCard title="Phone Number" content={data?.responseData?.payeePhoneNumber} />
            </div>
          </div>
          <div className="mt-8 hidden rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
            <div className="flex items-center justify-between">
              <p className="my-3 text-lg font-semibold">Biller Details</p>
              <div className="flex items-center gap-2">
                <p>Biller Code :</p>
                <p>{data?.responseData?.billerCode}</p>
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
      </div>
      {modals.openTransactionHistory && (
        <CustomModal
          isOpen={modals.openTransactionHistory}
          setIsOpen={() => closeModal('openTransactionHistory')}
          width={'900px'}
          paddingX={0}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Transaction History Details</h1>
              <button className="scale-[110%]" onClick={() => closeModal('openTransactionHistory')}>
                <CloseIcon />
              </button>
            </div>
            <div className="mt-3 h-[2px] w-full bg-grayPrimary"></div>
          </Typography>
          <div className="mt-2">
            <div className="">
              <div className="slide-down flex items-center justify-between">
                <div className="flex w-full flex-row items-center justify-start gap-6 md:gap-10">
                  <CustomTabs
                    tabs={tabsList}
                    activeTab={activeTransactionTab}
                    setActiveTab={setActiveTransactionTab}
                    showTabTotal={false}
                  />
                </div>
                <div className="flex items-center justify-end">
                  <TableFilter
                    name={'searchTransactionHistory'}
                    placeholder={'Search By Account Number'}
                    label={'Search Transactions'}
                    value={searchTerm}
                    setSearch={setSearchTerm}
                    handleOptionsFilter={() => handleOptionsFilter()}
                    formik={formik}
                    fromDateName={'fromDateFilter'}
                    toDateName={'toDateFilter'}
                    selectName={'statusFilter'}
                    showOptionsFilter={false}
                    dropdownOptions={statusDropdownOptions}
                  />
                </div>
              </div>
              <div className="mt-3 h-[2px] w-full bg-grayPrimary"></div>
              <div className="slide-down mt-6">
                <CustomTable
                  columns={transactionsTableColumn}
                  tableData={transactionsData?.responseData?.items}
                  rowCount={transactionsData?.responseData?.totalCount}
                  paginationData={transactionPaginationData}
                  setPaginationData={setTransactionPaginationData}
                  isDataLoading={isTransactionsLoading}
                />
              </div>
            </div>
          </div>
        </CustomModal>
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
            updateMandateMutation.mutate({
              requestId: mandateId,
              payload: modifyMandateValidation.values,
            });
            closeModal('confirmModifyMandate');
          }}
        />
      )}
      {modals.saveModifyMandate && (
        <ModalWrapper
          isOpen={modals.saveModifyMandate}
          setIsOpen={() => closeModal('saveModifyMandate')}
          title={'Success!!'}
          info={'You have successfully saved new changes and your request is pending approval'}
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
            closeModal('openEnableMandate');
          }}
        />
      )}
      {modals.confirmEnableMandate && (
        <ModalWrapper
          isOpen={modals.confirmEnableMandate}
          setIsOpen={() => closeModal('confirmEnableMandate')}
          title={'Success!!'}
          info={'You have successfully enabled this mandate and your request is pending approval'}
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
            closeModal('openDisableMandate');
          }}
        />
      )}
      {modals.confirmDisableMandate && (
        <ModalWrapper
          isOpen={modals.confirmDisableMandate}
          setIsOpen={() => closeModal('confirmDisableMandate')}
          title={'Success!!'}
          info={'You have successfully disabled this mandate and your request is pending approval'}
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
            closeModal('openDeleteProfile');
          }}
        />
      )}
      {modals.confirmDeleteProfile && (
        <ModalWrapper
          isOpen={modals.confirmDeleteProfile}
          setIsOpen={() => closeModal('confirmDeleteProfile')}
          title={'Success!!'}
          info={'You have successfully deleted this mandate and your request is pending approval'}
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
