import { Link, useSearchParams, useNavigate, useParams } from 'react-router-dom';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import { UpdateRequestIcon } from 'assets/icons';
import ItemDetailsContainer from 'components/common/ItemDetailsContainer';
import appRoutes from 'utils/constants/routes';
import ApprovedIcon from 'assets/icons/ApprovedIcon';
import ButtonComponent from 'components/FormElements/Button';
import CustomPopover from 'hoc/PopOverWrapper';
import { useEffect, useRef, useState } from 'react';
import CustomModal from 'hoc/ModalWrapper/CustomModal';
import { Box, CircularProgress, Typography } from '@mui/material';
import CustomTabs from 'hoc/CustomTabs';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import { MerchantAuthData, QueryParams, TabsProps } from 'utils/interfaces';
import CustomTable from 'components/CustomTable';
import { statusDropdownOptions, transactionHistory } from 'utils/constants';
import { GridColDef } from '@mui/x-data-grid';
import DownloadIcon from 'assets/icons/DownloadIcon';
import TableFilter from 'components/TableFilter';
import { useFormik } from 'formik';
import CustomInput from 'components/FormElements/CustomInput';
import ChevronRight from 'assets/icons/ChevronRight';
import CloseIcon from 'assets/icons/CloseIcon';
import DetailsActionButton from 'components/common/DetailsActionButton';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteMandate,
  disableMandate,
  enableMandate,
  getMandateById,
  getTransactions,
  updateMandate,
} from 'config/actions/dashboard-actions';
import {
  capitalize,
  formatNumberDisplay,
  getUserFromLocalStorage,
  notifyError,
} from 'utils/helpers';
import { updateMandateSchema } from 'utils/formValidators';
import { SearchTypes, TransactionsTabsListTabNames } from 'utils/enums';
import { useReactToPrint } from 'react-to-print';
import TransactionReceipt from 'components/TransactionReceipt';
import ActionAuthorDetails, { AuthorActionType } from 'components/common/ActionAuthorDetails';

const MandateDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mandateId = searchParams?.get('id') || '';
  const [activeTransactionTab, setActiveTransactionTab] = useState('Successful');
  const [searchTerm, setSearchTerm] = useState('');
  const [transactionsSearchTerm, setTransactionsSearchTerm] = useState('');
  const [transactionDetails, setTransactionDetails] = useState<any>();
  const receiptRef = useRef<HTMLDivElement>(null);
  const [transactionPaginationData, setTransactionPaginationData] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  const [modals, setModals] = useState({
    confirmDisable: false,
    disableSuccessful: false,
    confirmEnable: false,
    enableSuccessful: false,
    confirmDelete: false,
    deleteSuccessful: false,
    openTransactionHistory: false,
    editMandate: false,
    confirmEdit: false,
    editSuccessful: false,
  });

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const formik = useFormik({
    initialValues: {
      startDate: '',
      endDate: '',
    },
    onSubmit: (values: any) => {
      setTransactionPaginationData((prev) => {
        return {
          ...prev,
          pageNumber: 1,
        };
      });
      setTransactionsQueryParams((prev) => ({
        ...prev,
        pageNo: 1,
        searchFilter: formik.values.searchTransactionHistory,
      }));
      refetchTransactions();
    },
  });

  const modifyMandateFormik = useFormik({
    initialValues: {
      amount: undefined,
    },
    validationSchema: updateMandateSchema,
    onSubmit: (values) => {
      openModal('confirmEdit');
    },
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
    {
      field: 'accountNumber',
      headerName: 'Account Number',
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

  const { data, refetch } = useQuery({
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
    queryFn: ({ queryKey }) => getTransactions(queryKey[1] as QueryParams),
  });

  const updateMandateMutation = useMutation({
    mutationFn: (requestId: string | undefined) =>
      updateMandate(requestId, modifyMandateFormik.values),
    onSuccess: () => {
      closeModal('editMandate');
      closeModal('confirmEdit');
      openModal('editSuccessful');
    },
    onError: (error) => {
      closeModal('confirmEdit');
    },
  });

  const enableMandateMutation = useMutation({
    mutationFn: (requestId: string | undefined) => enableMandate(requestId),
    onSuccess: () => {
      closeModal('confirmEnable');
      openModal('enableSuccessful');
    },
    onError: (error) => {
      closeModal('confirmEnable');
    },
  });

  const disableMandateMutation = useMutation({
    mutationFn: (requestId: string | undefined) => disableMandate(requestId),
    onSuccess: () => {
      closeModal('confirmDisable');
      openModal('disableSuccessful');
    },
    onError: (error) => {
      closeModal('confirmDisable');
    },
  });

  const deleteMandateMutation = useMutation({
    mutationFn: (requestId: string | undefined) => deleteMandate(requestId),
    onSuccess: () => {
      closeModal('confirmDelete');
      openModal('deleteSuccessful');
    },
    onError: (error) => {
      closeModal('confirmDelete');
    },
  });

  return (
    <>
      <div style={{ display: 'none' }}>
        <TransactionReceipt ref={receiptRef} data={transactionDetails} />
      </div>
      <div className="px-5 py-1">
        <div className="mt-2 flex items-center gap-2 text-lg">
          <Link
            to={`/${appRoutes.adminDashboard.mandateManagement.index}`}
            className="cursor-pointer text-darkgray"
          >
            Mandate Management
          </Link>{' '}
          <ChevronRight />
          <span className="text-lightPurple">Mandate Details</span>
        </div>

        <>
          <div className="slide-down mt-3 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold md:text-2xl">{`Mandate ID : ${data?.responseData?.id ? data?.responseData?.id : ''}`}</h2>
            </div>
            <div className="w-auto">
              <CustomPopover
                popoverId={1}
                buttonIcon={<DetailsActionButton />}
                translationX={0}
                translationY={54}
              >
                <div className="flex flex-col rounded-md p-1">
                  <button
                    onClick={() => openModal('openTransactionHistory')}
                    type="button"
                    className="w-full px-3 py-2 text-start font-[600] hover:bg-purpleSecondary"
                  >
                    View Transactions
                  </button>

                  {data?.responseData?.mandateType === 'Variable' && (
                    <button
                      onClick={() => {
                        modifyMandateFormik.setFieldValue(
                          'amount',
                          parseInt(data?.responseData.amount),
                        );
                        openModal('editMandate');
                      }}
                      type="button"
                      className="w-full px-3 py-2 text-start font-[600] hover:bg-purpleSecondary"
                    >
                      Update Amount
                    </button>
                  )}

                  {data?.responseData?.isActive ? (
                    <button
                      type="button"
                      onClick={() => openModal('confirmDisable')}
                      className="w-full px-3 py-2 text-start font-[600] text-red-400 hover:bg-purpleSecondary"
                    >
                      Disable
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openModal('confirmEnable')}
                      className="w-full px-3 py-2 text-start font-[600] text-green-400 hover:bg-purpleSecondary"
                    >
                      Enable
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => openModal('confirmDelete')}
                    className="w-full px-3 py-2 text-start font-[600] text-red-400 hover:bg-purpleSecondary"
                  >
                    Delete
                  </button>
                </div>
              </CustomPopover>
            </div>
          </div>

          <div className="slide-down mt-5 rounded-lg bg-white px-5 py-8">
            <div className="">
              <ItemDetailsContainer
                title="Mandate Details"
                titleExtension={
                  <>
                    <div className="flex items-center justify-end gap-2">
                      <p className="text-sm text-darkgray">Mandate Type:</p>
                      <UpdateRequestIcon />
                      <p className="mb-[1px] font-semibold text-lightPurple">
                        {capitalize(data?.responseData?.mandateType)}
                      </p>
                    </div>
                  </>
                }
              >
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
                <DetailsCard title="Bank Code" content={data?.responseData?.bankCode} />
              </ItemDetailsContainer>
            </div>

            <div className="mt-10">
              <ItemDetailsContainer title="Payer Details">
                <DetailsCard title="Payer Name" content={data?.responseData?.payerName} />
                <DetailsCard title="Address" content={data?.responseData?.payerAddress} />
                <DetailsCard
                  title="Email Address"
                  content={data?.responseData?.payerEmailAddress}
                />
                <DetailsCard title="Phone Number" content={data?.responseData?.payerPhoneNumber} />
              </ItemDetailsContainer>
            </div>
            <div className="mt-10">
              <ItemDetailsContainer title="Payee Details">
                <DetailsCard title="Payee Name" content={data?.responseData?.payeeName} />
                <DetailsCard title="Address" content={data?.responseData?.payeeAddress} />
                <DetailsCard
                  title="Email Address"
                  content={data?.responseData?.payeeEmailAddress}
                />
                <DetailsCard title="Phone Number" content={data?.responseData?.payeePhoneNumber} />
              </ItemDetailsContainer>
            </div>
            <div className="mt-10 hidden">
              <ItemDetailsContainer
                title="Biller Details"
                titleExtension={
                  <>
                    <div className="flex items-center justify-end gap-2">
                      <p className="text-sm text-darkgray">Biller Code:</p>
                      <p className="mb-[1px] font-semibold text-lightPurple">
                        {data?.responseData?.billerCode}
                      </p>
                    </div>
                  </>
                }
              >
                <DetailsCard
                  title="Biller Account Number"
                  content={data?.responseData?.billerAccountNumber}
                />
                <DetailsCard title="Bank Name" content={data?.responseData?.bankName} />
                <DetailsCard title="Account Name" content={data?.responseData?.accountName} />
                <DetailsCard title="Bank Code" content={data?.responseData?.bankCode} />
              </ItemDetailsContainer>
            </div>

            <div className="mt-10">
              <ItemDetailsContainer title="Creator Details">
                <ActionAuthorDetails
                  id={data?.responseData?.createdBy}
                  actionType={AuthorActionType.CreatedBy}
                  actionDate={data?.responseData?.dateCreated}
                />
              </ItemDetailsContainer>
            </div>

            <div className="mt-10">
              {data?.responseData?.status === 'Approved' && (
                <ItemDetailsContainer title="Approver Details" titleExtension={<ApprovedIcon />}>
                  <ActionAuthorDetails
                    id={data?.responseData?.approvedBy}
                    actionType={AuthorActionType.ApprovedBy}
                    actionDate={data?.responseData?.dateApproved}
                  />
                </ItemDetailsContainer>
              )}
            </div>
          </div>
        </>
      </div>
      {modals.confirmDisable && (
        <ModalWrapper
          isOpen={modals.confirmDisable}
          setIsOpen={() => closeModal('confirmDisable')}
          title={'Disable Mandate?'}
          info={'You are about to disable this mandate, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          loading={disableMandateMutation.isPending}
          proceedAction={() => {
            closeModal('confirmDisable');
            disableMandateMutation.mutate(data?.responseData?.id);
          }}
        />
      )}
      {modals.disableSuccessful && (
        <ModalWrapper
          isOpen={modals.disableSuccessful}
          setIsOpen={() => closeModal('disableSuccessful')}
          title={'Success!!'}
          info={'You have successfully disabled this mandate and your request is pending approval'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            refetch();
            closeModal('disableSuccessful');
          }}
        />
      )}
      {modals.confirmEnable && (
        <ModalWrapper
          isOpen={modals.confirmEnable}
          setIsOpen={() => closeModal('confirmEnable')}
          title={'Enable Mandate?'}
          info={'You are about to enable this mandate, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          loading={enableMandateMutation.isPending}
          proceedAction={() => {
            closeModal('confirmEnable');
            enableMandateMutation.mutate(data?.responseData?.id);
          }}
        />
      )}
      {modals.enableSuccessful && (
        <ModalWrapper
          isOpen={modals.enableSuccessful}
          setIsOpen={() => closeModal('enableSuccessful')}
          title={'Success!!'}
          info={'You have successfully enabled this mandate and your request is pending approval'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            refetch();
            closeModal('enableSuccessful');
          }}
        />
      )}
      {modals.confirmDelete && (
        <ModalWrapper
          isOpen={modals.confirmDelete}
          setIsOpen={() => closeModal('confirmDelete')}
          title={'Delete Mandate?'}
          info={'You are about to delete this mandate, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          loading={deleteMandateMutation.isPending}
          proceedAction={() => {
            closeModal('confirmDelete');
            deleteMandateMutation.mutate(data?.responseData?.id);
          }}
        />
      )}
      {modals.deleteSuccessful && (
        <ModalWrapper
          isOpen={modals.deleteSuccessful}
          setIsOpen={() => closeModal('deleteSuccessful')}
          title={'Success!!'}
          info={'You have successfully deleted this mandate and your request is pending approval'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            refetch();
            closeModal('deleteSuccessful');
            navigate({
              pathname: `/${appRoutes.adminDashboard.mandateManagement.index}`,
            });
          }}
        />
      )}

      {modals.editMandate && (
        <CustomModal
          isOpen={modals.editMandate}
          setIsOpen={() => closeModal('editMandate')}
          width={'800px'}
          paddingX={0}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className="slide-down flex items-center justify-between">
              <h1 className="text-xl font-semibold">Modify Mandate Details</h1>
              <button className="scale-[110%]" onClick={() => closeModal('editMandate')}>
                <CloseIcon />
              </button>
            </div>
            <div className="mt-3 h-[2px] w-full bg-grayPrimary"></div>
          </Typography>
          <div id="modal-modal-description" className="mt-2">
            {data?.responseData?.mandateType === 'Variable' ? (
              <form
                onSubmit={modifyMandateFormik.handleSubmit}
                noValidate
                className="slide-down mt-8 w-full pb-8"
              >
                <div className="mt-14 flex flex-col items-end gap-x-8 gap-y-4 md:flex-row md:items-center md:justify-between">
                  <div className="w-full">
                    <CustomInput
                      labelFor="amount"
                      label="Modify Amount"
                      inputType="text"
                      placeholder="Enter here"
                      maxW="w-full"
                      verticalMargin={false}
                      formik={modifyMandateFormik}
                    />
                  </div>
                  <ButtonComponent
                    variant="contained"
                    color="white"
                    backgroundColor="#5C068C"
                    hoverBackgroundColor="#2F0248"
                    type="submit"
                    title="Save"
                    height="3rem"
                    width="9rem"
                    customPaddingX="1.4rem"
                  />
                </div>
              </form>
            ) : (
              <span className="slide-down flex items-center justify-start gap-1">
                <h3 className="text-red-300">Error:</h3>
                <h3 className="">You cannot modify a fixed mandate</h3>
              </span>
            )}
          </div>
        </CustomModal>
      )}
      {modals.confirmEdit && (
        <ModalWrapper
          isOpen={modals.confirmEdit}
          setIsOpen={() => closeModal('confirmEdit')}
          title={'Save Changes?'}
          info={
            'You are about to save changes made to this mandate, would you want to proceed with this?'
          }
          icon={<RedAlertIcon />}
          type={'confirmation'}
          loading={updateMandateMutation.isPending}
          proceedAction={() => {
            closeModal('confirmEdit');
            updateMandateMutation.mutate(data?.responseData?.id);
          }}
        />
      )}
      {modals.editSuccessful && (
        <ModalWrapper
          isOpen={modals.editSuccessful}
          setIsOpen={() => closeModal('editSuccessful')}
          title={'Success!!'}
          info={'You have successfully saved new changes and your request is pending approval'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            refetch();
            closeModal('editSuccessful');
          }}
        />
      )}

      {modals.openTransactionHistory && (
        <CustomModal
          isOpen={modals.openTransactionHistory}
          setIsOpen={() => closeModal('openTransactionHistory')}
          width={'1000px'}
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
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="">
              <div className="slide-down flex flex-col items-start justify-between gap-y-2 lg:flex-row lg:items-center">
                <div className="flex w-full flex-row items-center justify-start gap-6 md:gap-10">
                  <CustomTabs
                    tabs={tabsList}
                    activeTab={activeTransactionTab}
                    setActiveTab={setActiveTransactionTab}
                    showTabTotal={false}
                  />
                </div>
                <div className="flexitems-center justify-end">
                  <TableFilter
                    name={'searchTransactionHistory'}
                    placeholder={'Search By Mandate Code'}
                    label={'Search Transactions'}
                    value={transactionsSearchTerm}
                    setSearch={setTransactionsSearchTerm}
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
                  tableData={transactionsData?.responseData?.items}
                  columns={transactionsTableColumn}
                  rowCount={transactionsData?.responseData?.totalCount}
                  paginationData={transactionPaginationData}
                  setPaginationData={setTransactionPaginationData}
                  isDataLoading={isTransactionsLoading}
                />
              </div>
            </div>
          </Typography>
        </CustomModal>
      )}
    </>
  );
};

export default MandateDetails;
