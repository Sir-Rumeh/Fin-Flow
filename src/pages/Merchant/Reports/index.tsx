import { useRef, useState } from 'react';
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import { transactionHistory } from 'utils/constants';
import CustomTable from 'components/CustomTable';
import ButtonComponent from 'components/FormElements/Button';
import { Box, Modal, Typography, useMediaQuery } from '@mui/material';
import CustomPopover from 'hoc/PopOverWrapper';
import PopoverTitle from 'components/common/PopoverTitle';
import appRoutes from 'utils/constants/routes';
import { Link, useNavigate } from 'react-router-dom';
import {
  CloseIcon,
  CreationRequestIcon,
  DeleteRequestIcon,
  DownloadIcon,
  SuccessModalIcon,
} from 'assets/icons';

import ExportBUtton from 'components/FormElements/ExportButton';
import TableFilter from 'components/TableFilter';
import { useFormik } from 'formik';
import { MerchantAuthData, QueryParams, TabsProps } from 'utils/interfaces';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import CustomInput from 'components/FormElements/CustomInput';
import CustomModal from 'hoc/ModalWrapper/CustomModal';
import CustomTabs from 'hoc/CustomTabs';
import FormSelect from 'components/FormElements/FormSelect';
import FormDatePicker from 'components/FormElements/FormDatePicker';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteMandate,
  disableMandate,
  enableMandate,
  getMandates,
  getMandatesByMerchantId,
  getTransactions,
  updateMandate,
} from 'config/actions/dashboard-actions';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { updateMandateSchema } from 'utils/formValidators';
import { getUserFromLocalStorage } from 'utils/helpers';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '10px',
  boxShadow: 10,
  p: 4,
};

const Reports = () => {
  const printPdfRef = useRef(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [reportType, setReportType] = useState('');
  const [activeTransactionTab, setActiveTransactionTab] = useState('Successful');

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

  const [showFilteredReport, setShowFilteredReport] = useState(false);
  const [selectedMandateId, setSelectedMandateId] = useState<string | undefined>('');

  const [paginationData, setPaginationData] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  const formikFilter = useFormik({
    initialValues: {
      searchMandate: '',
      fromDateFilter: '',
      toDateFilter: '',
      statusFilter: '',
    },
    onSubmit: (values) => {
      setSearchTerm('');
    },
  });

  const excelHeaders = [
    { label: 'Merchant ID', key: 'merchantId' },
    { label: 'Mandate Code', key: 'mandateCode' },
    { label: 'Mandate Type', key: 'mandateType' },
    { label: 'Active Status', key: 'isActive' },
    { label: 'Date Requested', key: 'dateCreated' },
  ];

  const transactionHeaders = [
    { label: 'Account ID', key: 'accountId' },
    { label: 'Mandate ID', key: 'mandateId' },
    { label: 'Amount', key: 'amount' },
    { label: 'Date', key: 'dateCreated' },
  ];

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const validationSchema = Yup.object().shape({
    startDate: Yup.string().required('Start date is required.'),
    endDate: Yup.string().required('End date is required.'),
    reportType: Yup.string().required('Report type is required.'),
    status: Yup.string().required('Status is required.'),
  });

  const formik = useFormik({
    initialValues: {
      startDate: '',
      endDate: '',
      status: '',
      reportType: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { startDate, endDate } = values;
      const formattedStartDate = startDate ? dayjs(startDate).format('YYYY-MM-DD') : '';
      const formattedEndDate = endDate ? dayjs(endDate).format('YYYY-MM-DD') : '';

      if (values.reportType === reportTypes[0].value) {
        setReportType(values.reportType);
      } else if (values.reportType === reportTypes[1].value) {
        setReportType(values.reportType);
      }

      setQueryParams((prev) => ({
        ...prev,
        status: values.status,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        pageNo: paginationData.pageNumber,
        pageSize: paginationData.pageSize,
      }));
      setShowFilteredReport(true);
    },
  });

  const [queryParams, setQueryParams] = useState<QueryParams>({
    mandateCode: '',
    status: formikFilter.values.statusFilter
      ? formikFilter.values.statusFilter
      : formik.values.status,
    pageNo: paginationData.pageNumber,
    pageSize: paginationData.pageSize,
    sortBy: 'asc',
    sortOrder: 'desc',
    searchFilter: formikFilter.values.searchMandate,
    startDate: formikFilter.values.fromDateFilter,
    endDate: formikFilter.values.toDateFilter,
  });

  const reportTypes = [
    { value: 'Mandate Status Reports', label: 'Mandate Status Reports' },
    { value: 'Transaction Reports', label: 'Transaction Reports' },
  ];

  const itemStatus = [
    { value: 'enabled', label: 'Enabled' },
    { value: 'disabled', label: 'Disabled' },
  ];

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

  const total = 20;

  const tabsList: TabsProps[] = [
    {
      tabIndex: 1,
      tabName: 'Successful',
      tabTotal: total,
    },
    {
      tabIndex: 2,
      tabName: 'Failed',
      tabTotal: total,
    },
  ];

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

  const transactionsReportColumn: GridColDef[] = [
    {
      field: 'accountId',
      headerName: 'Account ID',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'mandateId',
      headerName: 'Mandate ID',
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
      field: 'dateCreated',
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

  const isSmallWidth = useMediaQuery('(max-width:370px)');
  const isLargeWidth = useMediaQuery('(min-width:1320px)');

  const user = getUserFromLocalStorage() as MerchantAuthData;
  const loggedInMerchantId = user?.profileData?.merchantID;

  const { data } = useQuery({
    queryKey: ['mandates', queryParams],
    queryFn: ({ queryKey }) =>
      getMandatesByMerchantId(loggedInMerchantId, queryKey[1] as QueryParams),
    enabled: reportType === reportTypes[0].value,
    retry: 2,
  });

  const { data: transactionsData } = useQuery({
    queryKey: ['transactions', queryParams],
    queryFn: ({ queryKey }) => getTransactions(queryKey[1] as QueryParams),
    enabled: reportType === reportTypes[1].value,
    retry: 2,
  });

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
      <section className="p-2 md:p-4">
        <div className="fade-in-down my-2 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">Reporting</h1>
          </div>
        </div>
        <div className="mt-5">
          <div className="slide-down relative mt-5 flex flex-col items-center justify-center rounded-md bg-white p-2 pb-6 md:p-4 md:pb-8">
            <div className="flex w-full items-center justify-start border-b pb-2">
              <h2 className="text-xl font-semibold tracking-wide">Generate Report</h2>
            </div>
            <div className="mt-8 grid w-full grid-cols-3 gap-4 py-1 md:grid-cols-3">
              <div className="relative flex w-full items-center">
                <span className="absolute bottom-20 font-semibold">Date Range</span>
                <div className="relative mt-2 flex w-full items-center justify-between rounded-lg border border-gray-300">
                  <div className="w-full">
                    <FormDatePicker
                      name={'startDate'}
                      formik={formik}
                      label="Start Date"
                      placeholder="DD/MM/YY"
                      showLabel={false}
                      customPicker
                      width="100%"
                      hideBorder
                    />
                  </div>
                  <div className="h-[2px] w-[8px] bg-gray-300"></div>
                  <div className="w-full">
                    <FormDatePicker
                      name={'endDate'}
                      formik={formik}
                      label="End Date"
                      placeholder="DD/MM/YY"
                      showLabel={false}
                      customPicker
                      hideBorder
                    />
                  </div>
                </div>
              </div>
              <div className="w-full">
                <FormSelect
                  labelFor="reportType"
                  label="Report Type"
                  formik={formik}
                  options={reportTypes}
                />
              </div>
              <div className="w-full">
                <FormSelect labelFor="status" label="Status" formik={formik} options={itemStatus} />
              </div>
            </div>
            <div className="flex w-full items-center justify-end py-1">
              <ButtonComponent
                variant="contained"
                color="white"
                backgroundColor="#5C068C"
                hoverBackgroundColor="#2F0248"
                type="button"
                title="Generate Report"
                customPaddingX="1.4rem"
                onClick={formik.handleSubmit}
              />
            </div>
          </div>
          {showFilteredReport && formik.values.reportType === reportTypes[0].value && (
            <div className="slide-downward relative mt-8 flex flex-col items-center justify-center rounded-md bg-white p-2 md:p-5">
              <div className="flex w-full flex-col justify-between gap-y-4 pb-3 lg:flex-row lg:items-center">
                <h2 className="text-xl font-bold">
                  Mandate Status Report (
                  {formik.values.startDate
                    ? dayjs(formik.values.startDate).format('D MMMM')
                    : 'Start Date'}{' '}
                  to{' '}
                  {formik.values.endDate
                    ? dayjs(formik.values.endDate).format('D MMMM, YYYY')
                    : 'End Date'}
                  )
                </h2>
                <div className="flex w-full items-center lg:w-[50%] lg:justify-end">
                  <ExportBUtton
                    data={data?.responseData?.items}
                    printPdfRef={printPdfRef}
                    headers={excelHeaders}
                    fileName="Mandates.csv"
                  />
                </div>
              </div>
              <div className="mt-1 w-full rounded-md border px-3 pt-2">
                <div className="flex w-full flex-col justify-between gap-y-4 border-b 2xl:flex-row 2xl:items-center">
                  <h3 className="w-full text-xl font-semibold tracking-wide lg:w-[50%]">
                    All Mandates Reports
                  </h3>
                  <div className="flex w-full items-center lg:w-[50%] lg:justify-end">
                    <div>
                      <TableFilter
                        name={'searchMandateReport'}
                        placeholder={'Search'}
                        label={'Search'}
                        value={searchTerm}
                        setSearch={setSearchTerm}
                        handleOptionsFilter={() => {}}
                        formik={formikFilter}
                        fromDateName={'fromDateFilter'}
                        toDateName={'toDateFilter'}
                        selectName={'statusFilter'}
                        translationX={isLargeWidth ? 300 : undefined}
                      />
                    </div>
                  </div>
                </div>
                <div ref={printPdfRef} className="w-full">
                  <CustomTable
                    tableData={data?.responseData?.items}
                    columns={MandateTableColumn}
                    rowCount={data?.responseData?.totalCount}
                    paginationData={paginationData}
                    setPaginationData={setPaginationData}
                  />
                </div>
              </div>
            </div>
          )}
          {showFilteredReport && formik.values.reportType === reportTypes[1].value && (
            <div className="slide-downward relative mt-8 flex flex-col items-center justify-center rounded-md bg-white p-2 md:p-5">
              <div className="flex w-full flex-col justify-between gap-y-4 pb-3 lg:flex-row lg:items-center">
                <h2 className="text-xl font-bold">
                  Mono Tech Transaction Report Details (
                  {formik.values.startDate
                    ? dayjs(formik.values.startDate).format('D MMMM')
                    : 'Start Date'}{' '}
                  to{' '}
                  {formik.values.endDate
                    ? dayjs(formik.values.endDate).format('D MMMM, YYYY')
                    : 'End Date'}
                  )
                </h2>
                <div className="flex w-full items-center lg:w-[20%] lg:justify-end">
                  <ExportBUtton
                    data={transactionsData?.responseData?.items}
                    printPdfRef={printPdfRef}
                    headers={transactionHeaders}
                    fileName="Transactions.csv"
                  />
                </div>
              </div>
              <div className="mt-1 w-full rounded-md border px-3 pt-2">
                <div className="slide-down flex w-full flex-col justify-between border-b pb-1 lg:flex-row lg:items-center">
                  <div className="flex w-full flex-row items-center justify-start gap-6 md:gap-10">
                    <CustomTabs
                      tabs={tabsList}
                      activeTab={activeTransactionTab}
                      setActiveTab={setActiveTransactionTab}
                    />
                  </div>
                  <div className="flex w-full items-center lg:justify-end">
                    <div className="">
                      <TableFilter
                        name={'searchTransactionHistory'}
                        placeholder={'Search'}
                        label={'Search Transactions'}
                        value={searchTerm}
                        setSearch={setSearchTerm}
                        handleOptionsFilter={() => {}}
                        formik={formikFilter}
                        fromDateName={'fromDateFilter'}
                        toDateName={'toDateFilter'}
                        selectName={'statusFilter'}
                        translationX={isLargeWidth ? 300 : undefined}
                      />
                    </div>
                  </div>
                </div>

                <div ref={printPdfRef} className="mt-4 w-full">
                  <CustomTable
                    tableData={transactionsData?.responseData?.items}
                    columns={transactionsReportColumn}
                    rowCount={transactionsData?.responseData?.totalCount}
                    paginationData={paginationData}
                    setPaginationData={setPaginationData}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
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
                  />
                </div>
                <div className="flexitems-center justify-end">
                  <TableFilter
                    name={'searchTransactionHistory'}
                    placeholder={'Search Transactions'}
                    label={'Search Transactions'}
                    value={searchTerm}
                    setSearch={setSearchTerm}
                    handleOptionsFilter={() => {}}
                    formik={formik}
                    fromDateName={'fromDateFilter'}
                    toDateName={'toDateFilter'}
                    selectName={'statusFilter'}
                    showOptionsFilter={false}
                  />
                </div>
              </div>
              <div className="mt-3 h-[2px] w-full bg-grayPrimary"></div>
              <div className="slide-down mt-6">
                <CustomTable
                  tableData={transactionHistory}
                  columns={transactionsReportColumn}
                  rowCount={73}
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
              requestId: selectedMandateId,
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
            disableMandateMutation.mutate(selectedMandateId);
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
            deleteMandateMutation.mutate(selectedMandateId);
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

export default Reports;
