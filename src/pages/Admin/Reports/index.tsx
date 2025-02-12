import ButtonComponent from 'components/FormElements/Button';
import { useEffect, useRef, useState } from 'react';
import CustomTable from 'components/CustomTable';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { CloseIcon, CreationRequestIcon, DeleteRequestIcon } from 'assets/icons';
import {
  mandateRequestsList,
  statusDropdownOptions,
  transactionHistory,
  transactionsStatusDropdownOptions,
} from 'utils/constants';
import ExportBUtton from 'components/FormElements/ExportButton';
import { useFormik } from 'formik';
import { Typography, useMediaQuery } from '@mui/material';
import CustomInput from 'components/FormElements/CustomInput';
import FormDatePicker from 'components/FormElements/FormDatePicker';
import CustomModal from 'hoc/ModalWrapper/CustomModal';
import CustomPopover from 'hoc/PopOverWrapper';
import PopoverTitle from 'components/common/PopoverTitle';
import { createSearchParams, useNavigate } from 'react-router-dom';
import appRoutes from 'utils/constants/routes';
import FormSelect from 'components/FormElements/FormSelect';
import DownloadIcon from 'assets/icons/DownloadIcon';
import TableFilter from 'components/TableFilter';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import CustomTabs from 'hoc/CustomTabs';
import { QueryParams, TabsProps } from 'utils/interfaces';
import { updateMandateSchema } from 'utils/formValidators';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteMandate,
  disableMandate,
  enableMandate,
  getMandatesByMerchantId,
  getMandates,
  updateMandate,
  getTransactions,
  getTransactionsByMerchantId,
} from 'config/actions/dashboard-actions';
import { formatApiDataForDropdown, getDateRange, notifyError } from 'utils/helpers';
import { getMerchants } from 'config/actions/merchant-actions';
import { SearchTypes, TransactionsTabsListTabNames } from 'utils/enums';
import { useReactToPrint } from 'react-to-print';
import TransactionReceipt from 'components/TransactionReceipt';

const Reports = () => {
  const printPdfRef = useRef(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [activeTransactionTab, setActiveTransactionTab] = useState('Successful');
  const [selectedMandateCode, setSelectedMandateCode] = useState('');
  const [mandateRecords, setMandateRecords] = useState<any>();
  const [transactionRecords, setTransactionRecords] = useState<any>();
  const [transactionDetails, setTransactionDetails] = useState<any>();
  const receiptRef = useRef<HTMLDivElement>(null);
  const [selectedMandate, setSelectedMandate] = useState({
    id: '',
    mandateType: '',
  });

  const [paginationData, setPaginationData] = useState({
    pageNumber: 1,
    pageSize: 10,
  });
  const [mandateTransactionsPaginationData, setMandateTransactionsPaginationData] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

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

  const [showFilteredReport, setShowFilteredReport] = useState(false);

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const formik = useFormik({
    initialValues: {
      statusFilter: '',
      searchMandateCode: '',
      fromDateFilter: '',
      toDateFilter: '',
      reportType: '',
      merchant: '',
      status: '',
      searchMandateTransactionAccountNumber: '',
      transacStatusFilter: '',
      transacFromDateFilter: '',
      transacToDateFilter: '',
    },
    onSubmit: (values) => {
      setPaginationData((prev) => {
        return {
          ...prev,
          pageNumber: 1,
        };
      });
      setQueryParams((prev) => ({
        ...prev,
        pageNo: 1,
        searchFilter: values.searchMandateCode,
      }));
      setTransactionPaginationData((prev) => {
        return {
          ...prev,
          pageNumber: 1,
        };
      });
      setTransactionsQueryParams((prev) => ({
        ...prev,
        pageNo: 1,
        searchFilter: values.searchMandateTransactionAccountNumber,
      }));
      refecthMandateTransactions();
    },
  });

  const transactionsFormik = useFormik({
    initialValues: {
      statusFilter: '',
      searchTransactionAccountNumber: '',
      fromDateFilter: '',
      toDateFilter: '',
      transacStatusFilter: '',
      transacFromDateFilter: '',
      transacToDateFilter: '',
    },
    onSubmit: (values) => {
      setTransactionPaginationData((prev) => {
        return {
          ...prev,
          pageNumber: 1,
        };
      });
      setTransactionsQueryParams((prev) => ({
        ...prev,
        pageNo: 1,
        status: formik.values.transacStatusFilter
          ? formik.values.transacStatusFilter
          : activeTransactionTab,
        searchFilter: values.searchTransactionAccountNumber,
      }));
    },
  });

  const reportTypes = [
    { value: 'Mandate Status Reports', label: 'Mandate Status Reports' },
    { value: 'Transaction Reports', label: 'Transaction Reports' },
  ];

  const itemStatus = [
    { value: '', label: 'All' },
    { value: 'Enabled', label: 'Enabled' },
    { value: 'Disabled', label: 'Disabled' },
  ];

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

  const modifyMandateFormik = useFormik({
    initialValues: {
      amount: undefined,
    },
    validationSchema: updateMandateSchema,
    onSubmit: (values) => {
      openModal('confirmEdit');
    },
  });

  const [queryParams, setQueryParams] = useState<QueryParams>({
    status: formik.values.statusFilter,
    pageNo: paginationData.pageNumber,
    pageSize: paginationData.pageSize,
    searchFilter: formik.values.searchMandateCode,
    searchType: SearchTypes.SearchMandates,
    startDate: formik.values.fromDateFilter,
    endDate: formik.values.toDateFilter,
    sortBy: 'asc',
    sortOrder: 'desc',
  });

  const [mandateTransactionsQueryParams, setMandateTransactionsQueryParams] = useState<QueryParams>(
    {
      mandateCode: selectedMandateCode,
      status: formik.values.transacStatusFilter
        ? formik.values.transacStatusFilter
        : activeTransactionTab,
      pageNo: transactionPaginationData.pageNumber,
      pageSize: transactionPaginationData.pageSize,
      searchFilter: formik.values.searchMandateTransactionAccountNumber,
      searchType: SearchTypes.SearchTransactions,
      startDate: formik.values.transacFromDateFilter,
      endDate: formik.values.transacToDateFilter,
      sortBy: 'asc',
      sortOrder: 'desc',
    },
  );

  const [transactionsQueryParams, setTransactionsQueryParams] = useState<QueryParams>({
    status: activeTransactionTab,
    pageNo: transactionPaginationData.pageNumber,
    pageSize: transactionPaginationData.pageSize,
    searchFilter: transactionsFormik.values.searchTransactionAccountNumber,
    searchType: SearchTypes.SearchTransactions,
    startDate: transactionsFormik.values.transacFromDateFilter,
    endDate: transactionsFormik.values.transacToDateFilter,
    sortBy: 'asc',
    sortOrder: 'desc',
  });

  const mandateExcelHeaders = [
    { label: 'Account ID', key: 'accountId' },
    { label: 'Merchant ID', key: 'merchantId' },
    { label: 'Mandate Code', key: 'mandateCode' },
    { label: 'Mandate Type', key: 'mandateType' },
    { label: 'Active Status', key: 'isActive' },
    { label: 'Date Requested', key: 'dateCreated' },
  ];

  const transactionHeaders = [
    { label: 'Mandate Code', key: 'mandateCode' },
    { label: 'Amount', key: 'amount' },
    { label: 'Effective Date', key: 'effectiveDate' },
    { label: 'Billing Status', key: 'billingStatus' },
  ];

  const mandateColumns: GridColDef[] = [
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
      renderCell: (params: GridRenderCellParams) => {
        const renderIcon = (
          IconComponent: React.ComponentType,
          colorClass: string,
          title: string,
        ) => (
          <div className="flex w-full items-center gap-2 font-semibold">
            <IconComponent />
            <span className={`mb-[1px] ${colorClass}`}>{title}</span>
          </div>
        );
        switch (params?.row.isActive) {
          case true:
            return renderIcon(CreationRequestIcon, 'text-greenPrimary', 'Enabled');
          case false:
            return renderIcon(DeleteRequestIcon, 'text-redSecondary', 'Disabled');
          default:
            return <span>{params?.row.isActive ? 'Enabled' : 'Disabled'}</span>;
        }
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
      headerClassName: 'ag-thead ',
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div className="h-full border-none">
            <CustomPopover
              popoverId={params?.row.id}
              buttonIcon={<PopoverTitle title="Actions" />}
              translationX={-45}
              translationY={45}
            >
              <div className="flex flex-col rounded-md p-1">
                <button
                  onClick={() =>
                    navigate({
                      pathname: `/${appRoutes.adminDashboard.mandateManagement.mandateDetails}`,
                      search: `?${createSearchParams({ id: params?.row.id })}`,
                    })
                  }
                  type="button"
                  className="w-full px-3 py-2 text-start font-[600] hover:bg-purpleSecondary"
                >
                  View Details
                </button>
                <button
                  onClick={async () => {
                    setSelectedMandateCode(params.row.mandateCode);
                    setMandateTransactionsQueryParams((prev) => ({
                      ...prev,
                      mandateCode: params.row.mandateCode,
                    }));
                    await refecthMandateTransactions();
                    openModal('openTransactionHistory');
                  }}
                  type="button"
                  className="w-full px-3 py-2 text-start font-[600] hover:bg-purpleSecondary"
                >
                  View Transactions
                </button>
                {params?.row.mandateType === 'Variable' && (
                  <button
                    onClick={() => {
                      setSelectedMandate({
                        id: params.row.id,
                        mandateType: params.row.mandateType,
                      });
                      openModal('editMandate');
                    }}
                    type="button"
                    className="w-full px-3 py-2 text-start font-[600] hover:bg-purpleSecondary"
                  >
                    Update Amount
                  </button>
                )}
                {params?.row.isActive ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMandate({
                        id: params.row.id,
                        mandateType: params.row.mandateType,
                      });
                      openModal('confirmDisable');
                    }}
                    className="w-full px-3 py-2 text-start font-[600] text-red-400 hover:bg-purpleSecondary"
                  >
                    Disable
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMandate({
                        id: params.row.id,
                        mandateType: params.row.mandateType,
                      });
                      openModal('confirmEnable');
                    }}
                    className="w-full px-3 py-2 text-start font-[600] text-green-400 hover:bg-purpleSecondary"
                  >
                    Enable
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMandate({
                      id: params.row.id,
                      mandateType: params.row.mandateType,
                    });
                    openModal('confirmDelete');
                  }}
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
          <button className="flex cursor-pointer items-center gap-3 font-medium text-lightPurple">
            <DownloadIcon />
            Download Receipt
          </button>
        );
      },
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

  const transactionsReportColumn: GridColDef[] = [
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

  const [merchantQueryParams, setMerchantQueryParams] = useState<QueryParams>({
    sortBy: 'asc',
    sortOrder: 'desc',
  });

  const { data, refetch } = useQuery({
    queryKey: ['merchants', merchantQueryParams],
    queryFn: ({ queryKey }) => getMerchants(queryKey[1] as QueryParams),
  });

  const {
    isLoading: isMandateTransactionsLoading,
    data: mandateTransactionsData,
    refetch: refecthMandateTransactions,
  } = useQuery({
    queryKey: ['mandate-transactions', mandateTransactionsQueryParams],
    queryFn: ({ queryKey }) => getTransactions(queryKey[1] as QueryParams),
  });

  const getMandateReports = async () => {
    const res =
      formik.values.merchant.length > 0
        ? await getMandatesByMerchantId(formik.values.merchant, queryParams as QueryParams)
        : await getMandates(queryParams as QueryParams);
    if (res) {
      setMandateRecords(res);
      setShowFilteredReport(true);
    }
  };

  const getTransactionsReport = async () => {
    const res =
      formik.values.merchant.length > 0
        ? await getTransactionsByMerchantId(
            formik.values.merchant,
            transactionsQueryParams as QueryParams,
          )
        : await getTransactions(transactionsQueryParams as QueryParams);
    if (res) {
      setTransactionRecords(res);
      setShowFilteredReport(true);
    }
  };

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      pageNo: paginationData.pageNumber,
      pageSize: paginationData.pageSize,
    }));
  }, [paginationData]);

  useEffect(() => {
    setMandateTransactionsQueryParams((prev) => ({
      ...prev,
      status: formik.values.transacStatusFilter
        ? formik.values.transacStatusFilter
        : activeTransactionTab,
      pageNo: mandateTransactionsPaginationData.pageNumber,
      pageSize: mandateTransactionsPaginationData.pageSize,
    }));
  }, [mandateTransactionsPaginationData.pageNumber, activeTransactionTab]);

  useEffect(() => {
    setTransactionsQueryParams((prev) => ({
      ...prev,
      status: transactionsFormik.values.transacStatusFilter
        ? transactionsFormik.values.transacStatusFilter
        : activeTransactionTab,
      pageNo: transactionPaginationData.pageNumber,
      pageSize: transactionPaginationData.pageSize,
    }));
  }, [
    transactionPaginationData,
    transactionsFormik.values.transacStatusFilter,
    activeTransactionTab,
  ]);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  useEffect(() => {
    if (queryParams.pageNo !== undefined && !isFirstRender) {
      getMandateReports();
    }
  }, [
    queryParams.pageNo,
    queryParams.status,
    queryParams.startDate,
    queryParams.endDate,
    queryParams.searchFilter,
  ]);

  useEffect(() => {
    if (transactionsQueryParams.pageNo !== undefined && !isFirstRender) {
      getTransactionsReport();
    }
  }, [
    transactionsQueryParams.pageNo,
    transactionsQueryParams.status,
    transactionsQueryParams.startDate,
    transactionsQueryParams.endDate,
    transactionsQueryParams.searchFilter,
  ]);

  const handleOptionsFilter = () => {
    setPaginationData((prev) => {
      return {
        ...prev,
        pageNumber: 1,
      };
    });
    setQueryParams((prev) => ({
      ...prev,
      status: formik.values.statusFilter,
      startDate: formik.values.fromDateFilter,
      endDate: formik.values.toDateFilter,
    }));
  };

  const handleTransactionsOptionsFilter = () => {
    setTransactionsQueryParams((prev) => ({
      ...prev,
      status: transactionsFormik.values.transacStatusFilter
        ? transactionsFormik.values.transacStatusFilter
        : activeTransactionTab,
      startDate: transactionsFormik.values.transacFromDateFilter,
      endDate: transactionsFormik.values.transacToDateFilter,
    }));
  };

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

  const isSmallWidth = useMediaQuery('(max-width:370px)');
  const isLargeWidth = useMediaQuery('(min-width:1320px)');

  const clearFilter = () => {
    formik.setFieldValue('fromDateFilter', null);
    formik.setFieldValue('toDateFilter', null);
    formik.setFieldValue('merchant', null);
    formik.setFieldValue('status', null);
  };

  const generateReport = () => {
    if (!formik.values.reportType)
      return formik.setFieldError('reportType', 'Report Type is required');
    if (formik.values.reportType === 'Mandate Status Reports') {
      if (formik.values.status) {
        setQueryParams((prev) => ({
          ...prev,
          startDate: formik.values.fromDateFilter,
          endDate: formik.values.toDateFilter,
          status: formik.values.status,
        }));
      } else if (!(formik.values.status.length > 0)) {
        getMandateReports();
        setTimeout(() => {
          setQueryParams((prev) => ({
            ...prev,
            startDate: formik.values.fromDateFilter,
            endDate: formik.values.toDateFilter,
            status: '',
          }));
        }, 500);
      }
    } else if (formik.values.reportType === 'Transaction Reports') {
      if (formik.values.status) {
        setTransactionsQueryParams((prev) => ({
          ...prev,
          startDate: formik.values.fromDateFilter,
          endDate: formik.values.toDateFilter,
          status: formik.values.status,
        }));
      } else if (!(formik.values.status.length > 0)) {
        getTransactionsReport();
        setTimeout(() => {
          setTransactionsQueryParams((prev) => ({
            ...prev,
            startDate: formik.values.fromDateFilter,
            endDate: formik.values.toDateFilter,
            status: 'Successful',
          }));
        }, 500);
      }
    }
  };

  useEffect(() => {
    if (formik.values.fromDateFilter && formik.values.toDateFilter) {
      const startDate = new Date(formik.values.fromDateFilter);
      const endDate = new Date(formik.values.toDateFilter);
      if (startDate > endDate) {
        notifyError('Start date should be less than end date');
      }
    }
  }, [formik.values.fromDateFilter, formik.values.toDateFilter]);

  const maxDate = () => {
    return new Date();
  };

  const maxAllowedDate = maxDate();

  return (
    <>
      <div style={{ display: 'none' }}>
        <TransactionReceipt ref={receiptRef} data={transactionDetails} />
      </div>
      <section className="p-2 md:p-4">
        <div className="fade-in-down my-2 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">Reporting</h1>
          </div>
        </div>
        <div className="mt-5">
          <div className="slide-down relative z-[999] mt-5 flex flex-col items-center justify-center rounded-md bg-white p-2 pb-6 md:p-4 md:pb-8">
            <div className="flex w-full items-center justify-start border-b pb-2">
              <h2 className="text-xl font-semibold tracking-wide">Generate Report</h2>
            </div>
            <div className="mt-8 grid w-full grid-cols-1 gap-4 py-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div className="relative flex w-full items-center">
                <span className="absolute bottom-20 font-semibold">Date Range</span>
                <div className="relative mt-2 flex w-full items-center justify-between rounded-lg border border-gray-300">
                  <div className="w-full 2xl:w-[80%]">
                    <FormDatePicker
                      name={'fromDateFilter'}
                      formik={formik}
                      label="Start Date"
                      placeholder="DD/MM/YY"
                      showLabel={false}
                      customPicker
                      width="100%"
                      hideBorder
                      maxDate={maxAllowedDate}
                    />
                  </div>
                  <div className="h-[2px] w-[8px] bg-gray-300"></div>
                  <div className="w-full 2xl:w-[80%]">
                    <FormDatePicker
                      name={'toDateFilter'}
                      formik={formik}
                      label="End Date"
                      placeholder="DD/MM/YY"
                      showLabel={false}
                      customPicker
                      hideBorder
                      maxDate={maxAllowedDate}
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
                  performExtraAction={() => setShowFilteredReport(false)}
                />
              </div>
              <div className="w-full">
                <FormSelect
                  labelFor="merchant"
                  label="Merchant"
                  formik={formik}
                  options={formatApiDataForDropdown(data?.responseData?.items, 'name', 'id')}
                  scrollableOptions
                  scrollableHeight="max-h-[10rem]"
                />
              </div>
              <div className="w-full">
                <FormSelect labelFor="status" label="Status" formik={formik} options={itemStatus} />
              </div>
            </div>
            <div className="flex w-full items-center justify-end gap-3 py-1">
              <ButtonComponent
                variant="contained"
                color="white"
                backgroundColor="#5C068C"
                hoverBackgroundColor="#2F0248"
                type="button"
                title="Generate Report"
                customPaddingX="1.4rem"
                onClick={() => {
                  generateReport();
                }}
              />
              <button
                type="button"
                onClick={() => {
                  clearFilter();
                }}
                className={`rounded-lg bg-[#f3dad9] px-[1.2rem] py-[0.65rem] font-semibold text-[#B42318] hover:bg-[#f8efed]`}
              >
                Clear Filter
              </button>
            </div>
          </div>
          {showFilteredReport && formik.values.reportType === 'Mandate Status Reports' && (
            <div className="slide-downward relative mt-8 flex flex-col items-center justify-center rounded-md bg-white p-2 md:p-5">
              <div className="flex w-full flex-col justify-between gap-y-4 pb-3 lg:flex-row lg:items-center">
                <h2 className="text-xl font-bold">
                  {` Mandate Status Report: ${getDateRange(mandateRecords?.responseData.items)}`}
                </h2>
                <div className="flex w-full items-center lg:w-[50%] lg:justify-end">
                  <ExportBUtton
                    data={mandateRecords?.responseData.items}
                    printPdfRef={printPdfRef}
                    headers={mandateExcelHeaders}
                    fileName="Mandate-Reports.csv"
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
                        name={'searchMandateCode'}
                        placeholder={'Search Mandate Code'}
                        label={'Search'}
                        value={searchTerm}
                        setSearch={setSearchTerm}
                        handleOptionsFilter={handleOptionsFilter}
                        formik={formik}
                        fromDateName={'fromDateFilter'}
                        toDateName={'toDateFilter'}
                        selectName={'statusFilter'}
                        translationX={isLargeWidth ? 300 : undefined}
                        dropdownOptions={statusDropdownOptions}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div ref={printPdfRef} className="w-full">
                    <CustomTable
                      tableData={mandateRecords?.responseData.items}
                      columns={mandateColumns}
                      rowCount={mandateRecords?.responseData.totalCount}
                      defaultAnimation={false}
                      paginationData={paginationData}
                      setPaginationData={setPaginationData}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {showFilteredReport && formik.values.reportType === 'Transaction Reports' && (
            <div className="slide-downward relative mt-8 flex flex-col items-center justify-center rounded-md bg-white p-2 md:p-5">
              <div className="flex w-full flex-col justify-between gap-y-4 pb-3 lg:flex-row lg:items-center">
                <h2 className="text-xl font-bold">
                  {`Transaction Report Details: ${getDateRange(transactionRecords?.responseData?.items)}`}
                </h2>
                <div className="flex w-full items-center lg:w-[20%] lg:justify-end">
                  <ExportBUtton />
                </div>
              </div>
              <div className="mt-1 w-full rounded-md border px-3 pt-2">
                <div className="slide-down flex w-full flex-col justify-between border-b pb-1 lg:flex-row lg:items-center">
                  <div className="flex flex-row items-center justify-start gap-6 md:gap-10 lg:w-[40%]">
                    <CustomTabs
                      tabs={tabsList}
                      activeTab={activeTransactionTab}
                      setActiveTab={setActiveTransactionTab}
                      showTabTotal={false}
                    />
                  </div>
                  <div className="flex items-center lg:w-[60%] lg:justify-end">
                    <div className="">
                      <TableFilter
                        name={'searchTransactionAccountNumber'}
                        placeholder={'Search By Mandate Code'}
                        label={'Search Transactions'}
                        value={searchTerm}
                        setSearch={setSearchTerm}
                        handleOptionsFilter={handleTransactionsOptionsFilter}
                        formik={transactionsFormik}
                        fromDateName={'transacFromDateFilter'}
                        toDateName={'transacToDateFilter'}
                        selectName={'transacStatusFilter'}
                        translationX={isLargeWidth ? 300 : undefined}
                        dropdownOptions={transactionsStatusDropdownOptions}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 w-full">
                  <CustomTable
                    tableData={transactionRecords?.responseData.items}
                    columns={transactionsReportColumn}
                    rowCount={transactionRecords?.responseData.totalCount}
                    defaultAnimation={false}
                    paginationData={transactionPaginationData}
                    setPaginationData={setTransactionPaginationData}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
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
            disableMandateMutation.mutate(selectedMandate.id);
          }}
        />
      )}

      {modals.disableSuccessful && (
        <ModalWrapper
          isOpen={modals.disableSuccessful}
          setIsOpen={() => closeModal('disableSuccessful')}
          title={'Success!!'}
          info={'You have successfully disabled this mandate'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            getMandateReports();
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
            enableMandateMutation.mutate(selectedMandate.id);
          }}
        />
      )}
      {modals.enableSuccessful && (
        <ModalWrapper
          isOpen={modals.enableSuccessful}
          setIsOpen={() => closeModal('enableSuccessful')}
          title={'Success!!'}
          info={'You have successfully enabled this mandate'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            getMandateReports();
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
            deleteMandateMutation.mutate(selectedMandate.id);
          }}
        />
      )}
      {modals.deleteSuccessful && (
        <ModalWrapper
          isOpen={modals.deleteSuccessful}
          setIsOpen={() => closeModal('deleteSuccessful')}
          title={'Success!!'}
          info={'You have successfully deleted this mandate'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            getMandateReports();
            closeModal('deleteSuccessful');
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
            {selectedMandate.mandateType === 'Variable' ? (
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
            updateMandateMutation.mutate(selectedMandate.id);
          }}
        />
      )}
      {modals.editSuccessful && (
        <ModalWrapper
          isOpen={modals.editSuccessful}
          setIsOpen={() => closeModal('editSuccessful')}
          title={'Success!!'}
          info={'You have successfully saved new changes'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            getMandateReports();
            closeModal('editSuccessful');
          }}
        />
      )}

      {modals.openTransactionHistory && (
        <CustomModal
          isOpen={modals.openTransactionHistory}
          setIsOpen={() => closeModal('openTransactionHistory')}
          width={'1000px'}
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
                    name={'searchMandateTransactionAccountNumber'}
                    placeholder={'Search By Mandate Code'}
                    label={'Search Transactions'}
                    value={searchTerm}
                    setSearch={setSearchTerm}
                    handleOptionsFilter={() => handleTransactionsOptionsFilter()}
                    formik={formik}
                    fromDateName={'transacFromDateFilter'}
                    toDateName={'transacToDateFilter'}
                    selectName={'transacStatusFilter'}
                    showOptionsFilter={false}
                    dropdownOptions={transactionsStatusDropdownOptions}
                  />
                </div>
              </div>
              <div className="mt-3 h-[2px] w-full bg-grayPrimary"></div>
              <div className="slide-down mt-6">
                <CustomTable
                  tableData={mandateTransactionsData?.responseData.items}
                  columns={transactionsReportColumn}
                  rowCount={mandateTransactionsData?.responseData.totalCount}
                  defaultAnimation={false}
                  paginationData={mandateTransactionsPaginationData}
                  setPaginationData={setMandateTransactionsPaginationData}
                  isDataLoading={isMandateTransactionsLoading}
                />
              </div>
            </div>
          </div>
        </CustomModal>
      )}
    </>
  );
};

export default Reports;
