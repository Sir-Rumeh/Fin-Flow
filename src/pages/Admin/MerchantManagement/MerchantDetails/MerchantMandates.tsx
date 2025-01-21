import { useEffect, useRef, useState } from 'react';
import TableFilter from 'components/TableFilter';
import CustomTable from 'components/CustomTable';
import appRoutes from 'utils/constants/routes';
import ChevronRight from 'assets/icons/ChevronRight';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { CloseIcon, CreationRequestIcon, DeleteRequestIcon, DownloadIcon } from 'assets/icons';
import CustomPopover from 'hoc/PopOverWrapper';
import PopoverTitle from 'components/common/PopoverTitle';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import ExportBUtton from 'components/FormElements/ExportButton';
import { useFormik } from 'formik';
import { QueryParams, TabsProps } from 'utils/interfaces';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getMerchantById } from 'config/actions/merchant-actions';
import {
  deleteMandate,
  disableMandate,
  enableMandate,
  getMandatesByMerchantId,
  updateMandate,
} from 'config/actions/dashboard-actions';
import { updateMandateSchema } from 'utils/formValidators';
import { capitalize } from 'utils/helpers';
import {
  statusDropdownOptions,
  transactionHistory,
  transactionsStatusDropdownOptions,
} from 'utils/constants';
import CustomModal from 'hoc/ModalWrapper/CustomModal';
import { Typography } from '@mui/material';
import CustomTabs from 'hoc/CustomTabs';
import CustomInput from 'components/FormElements/CustomInput';
import ButtonComponent from 'components/FormElements/Button';

const MerchantMandates = () => {
  const [searchParams] = useSearchParams();
  const merchantId = searchParams?.get('id') || '';
  const printPdfRef = useRef(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTransactionTab, setActiveTransactionTab] = useState('Successful');

  const [paginationData, setPaginationData] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  const [selectedMandate, setSelectedMandate] = useState<any>();

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
      searchMandate: '',
      fromDateFilter: '',
      toDateFilter: '',
      statusFilter: '',
    },
    onSubmit: (values) => {
      setSearchTerm('');
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

  const [queryParams, setQueryParams] = useState<QueryParams>({
    mandateCode: '',
    status: formik.values.statusFilter,
    pageNo: paginationData.pageNumber,
    pageSize: paginationData.pageSize,
    sortBy: 'asc',
    sortOrder: 'desc',
    searchFilter: formik.values.searchMandate,
    startDate: formik.values.fromDateFilter,
    endDate: formik.values.toDateFilter,
  });

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      status: formik.values.statusFilter,
      pageNo: paginationData.pageNumber,
      pageSize: paginationData.pageSize,
      searchFilter: formik.values.searchMandate,
      startDate: formik.values.fromDateFilter,
      endDate: formik.values.toDateFilter,
    }));
  }, [paginationData]);

  const handleOptionsFilter = () => {
    setQueryParams((prev) => ({
      ...prev,
      status: formik.values.statusFilter,
      startDate: formik.values.fromDateFilter,
      endDate: formik.values.toDateFilter,
    }));
  };

  const excelHeaders = [
    { label: 'Merchant ID', key: 'merchantId' },
    { label: 'Mandate Code', key: 'mandateCode' },
    { label: 'Mandate Type', key: 'mandateType' },
    { label: 'Active Status', key: 'isActive' },
    { label: 'Date Requested', key: 'dateCreated' },
  ];

  const tabsList: TabsProps[] = [
    {
      tabIndex: 1,
      tabName: 'Successful',
      tabTotal: 20,
    },
    {
      tabIndex: 2,
      tabName: 'Failed',
      tabTotal: 20,
    },
  ];

  const columns: GridColDef[] = [
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
      valueGetter: (params: any) => capitalize(params),
    },
    {
      field: 'isActive',
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
                  onClick={() => {
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

  const { data, refetch } = useQuery({
    queryKey: ['mandates', queryParams],
    queryFn: ({ queryKey }) => getMandatesByMerchantId(merchantId, queryKey[1] as QueryParams),
  });

  const { data: merchantData } = useQuery({
    queryKey: ['merchants', merchantId],
    queryFn: ({ queryKey }) => getMerchantById(queryKey[1]),
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
      <section className="p-2 md:p-4">
        <div className="flex items-center gap-2 text-lg">
          <Link
            to={`/${appRoutes.adminDashboard.merchantManagement.index}`}
            className="cursor-pointer text-darkgray"
          >
            Merchant Management
          </Link>
          <ChevronRight />
          <Link
            to={{
              pathname: `/${appRoutes.adminDashboard.merchantManagement.merchantDetails}`,
              search: `?${createSearchParams({ id: merchantId })}`,
            }}
            className="cursor-pointer text-darkgray"
          >
            Merchant Details
          </Link>{' '}
          <ChevronRight />
          <span className="text-lightPurple">Merchant Mandates</span>
        </div>
        <div className="fade-in-down my-2 mt-6 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">{`Mandates Under Merchant: ${merchantData?.responseData?.name ? merchantData?.responseData?.name : ''}`}</h1>
          </div>
        </div>
        <div className="mt-5">
          <div className="slide-down relative mt-5 flex flex-col items-center justify-center rounded-md bg-white p-2 md:p-4">
            <div className="flex w-full flex-col gap-y-4 border-b pb-3 lg:flex-row lg:items-center">
              <div className="slide-down flex w-full items-center lg:w-[50%] lg:justify-start">
                <div className="">
                  <TableFilter
                    name={'searchMandate'}
                    placeholder={'Search Mandate Code'}
                    label={'Search Mandate'}
                    value={searchTerm}
                    setSearch={setSearchTerm}
                    handleOptionsFilter={handleOptionsFilter}
                    formik={formik}
                    fromDateName={'fromDateFilter'}
                    toDateName={'toDateFilter'}
                    selectName={'statusFilter'}
                    dropdownOptions={statusDropdownOptions}
                  />
                </div>
              </div>
              <div className="flex w-full items-center lg:w-[50%] lg:justify-end">
                <ExportBUtton
                  data={data?.responseData?.items}
                  printPdfRef={printPdfRef}
                  headers={excelHeaders}
                  fileName="Mandates.csv"
                />
              </div>
            </div>

            <div className="mt-6 w-full">
              <div ref={printPdfRef} className="w-full">
                <CustomTable
                  tableData={data?.responseData?.items}
                  columns={columns}
                  rowCount={data?.responseData?.totalCount}
                  paginationData={paginationData}
                  setPaginationData={setPaginationData}
                />
              </div>
            </div>
          </div>
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
            closeModal('confirmDisable');
            disableMandateMutation.mutate(selectedMandate.id);
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
            enableMandateMutation.mutate(selectedMandate.id);
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
            deleteMandateMutation.mutate(selectedMandate.id);
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
            closeModal('confirmEdit');
            updateMandateMutation.mutate(selectedMandate.id);
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
                <div className="flex items-center justify-end">
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
                    dropdownOptions={transactionsStatusDropdownOptions}
                  />
                </div>
              </div>
              <div className="mt-3 h-[2px] w-full bg-grayPrimary"></div>
              <div className="slide-down mt-6">
                <CustomTable
                  tableData={transactionHistory}
                  columns={transactionsTableColumn}
                  rowCount={73}
                />
              </div>
            </div>
          </div>
        </CustomModal>
      )}
    </>
  );
};

export default MerchantMandates;
