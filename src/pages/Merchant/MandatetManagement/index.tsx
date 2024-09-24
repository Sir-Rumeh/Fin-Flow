import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import {
  CloseIcon,
  CreationRequestIcon,
  DeleteRequestIcon,
  DisableRequestIcon,
  DownloadIcon,
  SearchIcon,
  SuccessModalIcon,
  UpdateRequestIcon,
} from 'assets/icons';
import { transactionHistory } from 'utils/constants';
import appRoutes from 'utils/constants/routes';
import TableLogo from 'assets/images/table_logo.png';
import { RequestType } from 'utils/enums';
import ButtonComponent from 'components/FormElements/Button';
import CustomPopover from 'hoc/PopOverWrapper';
import PopoverTitle from 'components/common/PopoverTitle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Tab from 'components/Tabs';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import TableFilter from 'components/TableFilter';
import { useFormik } from 'formik';
import ExportBUtton from 'components/FormElements/ExportButton';
import CustomTable from 'components/CustomTable';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QueryParams } from 'utils/interfaces';
import {
  deleteMandate,
  disableMandate,
  enableMandate,
  getMandates,
  updateMandate,
} from 'config/actions/dashboard-actions';
import { updateMandateSchema } from 'utils/formValidators';
import CustomInput from 'components/FormElements/CustomInput';
import { notifyError } from 'utils/helpers';
import { CircularProgress } from '@mui/material';

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
  fontFamily: "'Gotham', sans-serif",
};

const MandatetManagement = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMandateId, setSelectedMandateId] = useState<string | undefined>('');

  const [queryParams, setQueryParams] = useState<QueryParams>({
    mandateCode: '',
    status: '',
    pageNo: 1,
    pageSize: 10,
    sortBy: 'asc',
    sortOrder: 'desc',
  });

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

  const formik = useFormik({
    initialValues: {
      searchMerchantName: '',
      fromDateFilter: '',
      toDateFilter: '',
      statusFilter: '',
    },
    onSubmit: (values) => {
      setSearchTerm('');
    },
  });

  const modifyMandateValidation = useFormik({
    initialValues: {
      amount: null,
    },
    validationSchema: updateMandateSchema,
    onSubmit: (values) => {
      openModal('confirmModifyMandate');
      closeModal('openModifyMandate');
    },
  });

  const MandateTableColumn: GridColDef[] = [
    // {
    //   field: 'accountId',
    //   headerName: 'Account ID',
    //   width: screen.width < 1000 ? 200 : undefined,
    //   flex: screen.width >= 1000 ? 1 : undefined,
    //   headerClassName: 'ag-thead',
    // },
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
      field: 'status',
      headerName: 'Status',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      renderCell: (params) => {
        const renderIcon = (IconComponent: any, colorClass: string, text: string) => (
          <div className="flex items-center gap-2">
            <IconComponent />
            <span className={`mb-0 ${colorClass}`}>{text}</span>
          </div>
        );

        const getIconAndColor = (
          requestType: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>,
          isActive: boolean,
        ) => {
          if (isActive) {
            return {
              IconComponent: CreationRequestIcon,
              colorClass: 'text-greenPrimary font-semibold',
              text: 'Enabled',
            };
          } else {
            return {
              IconComponent: DeleteRequestIcon,
              colorClass: 'text-redSecondary font-semibold',
              text: 'Disabled',
            };
          }
        };

        const isActive = params?.row?.isActive;
        const iconAndColor = getIconAndColor(params.value, isActive);

        return renderIcon(iconAndColor.IconComponent, iconAndColor.colorClass, iconAndColor.text);
      },
    },
    {
      field: 'dateCreated',
      headerName: 'Date Requested',
      width: screen.width < 1000 ? 50 : 50,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      valueGetter: (params: any) => new Date(params).toLocaleDateString(),
    },
    {
      field: 'actions',
      headerName: 'Action',
      width: 120,
      headerClassName: 'ag-thead ',
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const buttonTitle = params.row.isActive ? 'Disable' : 'Enable';
        const buttonColorClass = params.row.isActive ? 'text-red-400' : 'text-greenPrimary';

        const selectModal = () => {
          if (buttonTitle === 'Enable') {
            return openModal('openEnableMandate');
          } else {
            return openModal('openDisableMandate');
          }
        };

        return (
          <div className="h-full border-none">
            <CustomPopover
              popoverId={params?.row.id}
              buttonIcon={<PopoverTitle title="Actions" />}
              translationX={-15}
              translationY={45}
            >
              <div className="flex w-[8rem] flex-col rounded-md p-1 text-[12px]">
                <Link
                  to={`/${appRoutes.merchantDashboard.mandateManagement.mandateDetails}/${params.id}`}
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
                  onClick={() => {
                    setSelectedMandateId(params.row.id);
                    openModal('openModifyMandate');
                  }}
                  className="w-full px-3 py-2 text-start font-semibold opacity-75 hover:bg-purpleSecondary"
                >
                  Update Amount
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMandateId(params.row.id);
                    selectModal();
                  }}
                  className={`w-full px-3 py-2 text-start font-semibold opacity-75 hover:bg-purpleSecondary ${buttonColorClass}`}
                >
                  {buttonTitle}
                </button>
                <button
                  type="button"
                  className="w-full px-3 py-2 text-start font-[600] text-red-400 hover:bg-purpleSecondary"
                  onClick={() => {
                    setSelectedMandateId(params.row.id);
                    openModal('openDeleteProfile');
                  }}
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
            <DownloadIcon />
            Download Receipt
          </button>
        );
      },
    },
  ];

  const { isLoading, data } = useQuery({
    queryKey: ['mandates', queryParams],
    queryFn: ({ queryKey }) => getMandates(queryKey[1] as QueryParams),
  });

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
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold md:text-2xl">Mandate Management</h2>
          <div className="">
            <ButtonComponent
              onClick={() =>
                navigate(`/${appRoutes.merchantDashboard.mandateManagement.createMandate}`)
              }
              title="Create Mandate"
              backgroundColor="#5C068C"
              hoverBackgroundColor="#2F0248"
              color="white"
              width="160px"
              height="42px"
              fontWeight={600}
            />
          </div>
        </div>
        <div className="mt-5 rounded-lg bg-white px-5 py-5">
          <div className="flex items-center justify-between">
            <TableFilter
              name={'searchMerchantName'}
              placeholder={'Search '}
              label={'Search Merchant'}
              value={searchTerm}
              setSearch={setSearchTerm}
              handleOptionsFilter={() => {}}
              formik={formik}
              fromDateName={'fromDateFilter'}
              toDateName={'toDateFilter'}
              selectName={'statusFilter'}
            />
            <ExportBUtton />
          </div>
          <div className="mt-4 h-[2px] w-full bg-grayPrimary"></div>
          <div className="mt-6 w-full">
            {isLoading ? (
              <div className="flex h-[30vh] flex-col items-center justify-center">
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
              </div>
            ) : data?.responseData?.items?.length > 0 ? (
              <CustomTable
                tableData={data.responseData.items}
                columns={MandateTableColumn}
                rowCount={20}
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
                <h1 className="font-gotham">Transaction History Details</h1>
                <button onClick={() => closeModal('openTransactionHistory')}>
                  <CloseIcon />
                </button>
              </div>
              <div className="mt-3 h-[2px] w-full bg-grayPrimary"></div>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className="">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-between gap-4 font-gotham">
                    <Tab
                      label="Successful"
                      count={20}
                      isActive={tab === 1}
                      onClick={() => setTab(1)}
                      inactiveColor="text-green-500"
                    />
                    <Tab
                      label="Failed"
                      count={20}
                      isActive={tab === 2}
                      onClick={() => setTab(2)}
                      inactiveColor="text-red-500"
                    />
                  </div>
                  <div className="flex h-[42px] w-[309px] cursor-pointer items-center gap-2 rounded-lg border border-lightPurple px-4 py-2 font-gotham">
                    <SearchIcon />
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
                    <CustomTable
                      tableData={transactionHistory}
                      columns={TransactionsTableColumn}
                      rowCount={20}
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
            updateMandateMutation.mutate(selectedMandateId);
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
            enableMandateMutation.mutate(selectedMandateId);
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
            disableMandateMutation.mutate(selectedMandateId);
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
            deleteMandateMutation.mutate(selectedMandateId);
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
