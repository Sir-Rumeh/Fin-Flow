import ButtonComponent from 'components/FormElements/Button';
import { useEffect, useRef, useState } from 'react';
import CustomTable from 'components/CustomTable';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { CloseIcon } from 'assets/icons';
import { auditTrailList } from 'utils/constants';
import ExportBUtton from 'components/FormElements/ExportButton';
import { useFormik } from 'formik';
import { useMediaQuery } from '@mui/material';
import CustomInput from 'components/FormElements/CustomInput';
import FormDatePicker from 'components/FormElements/FormDatePicker';
import CustomModal from 'hoc/ModalWrapper/CustomModal';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import { useQuery } from '@tanstack/react-query';
import { QueryParams } from 'utils/interfaces';
import { getDateRange, notifyError } from 'utils/helpers';
import { getAuditTrails } from 'config/actions/audit-trail-actions';
import { SearchTypes } from 'utils/enums';
import dayjs from 'dayjs';

const AuditTrail = () => {
  const printPdfRef = useRef(null);
  const [modals, setModals] = useState({
    viewDetails: false,
  });

  const [selectedAudit, setSelectedAudit] = useState<any>();
  const [showFilteredAudit, setShowFilteredAudit] = useState(false);
  const [searchedTerm, setSearchedTerm] = useState('');
  const [auditRecords, setAuditRecords] = useState<any>();
  const [paginationData, setPaginationData] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const formik = useFormik({
    initialValues: {
      statusFilter: '',
      searchFilter: '',
      startDate: '',
      endDate: '',
    },
    onSubmit: (values) => {
      setQueryParams((prev) => ({
        ...prev,
        searchFilter: formik.values.searchFilter,
      }));
    },
  });

  const excelHeaders = [
    { label: 'Ref No', key: 'targetId' },
    { label: 'Account Name', key: 'actor' },
    { label: 'Affected Module', key: 'module' },
    { label: 'Performed Action', key: 'action' },
    { label: 'Date Created', key: 'dateCreated' },
  ];

  const columns: GridColDef[] = [
    {
      field: 'targetId',
      headerName: 'Ref No',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'actor',
      headerName: 'Actor Email',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'module',
      headerName: 'Affected Module',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'action',
      headerName: 'Performed Action',
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
      width: 150,
      headerClassName: 'ag-thead',
      renderCell: (params: GridRenderCellParams) => (
        <>
          <button
            type="button"
            onClick={() => {
              setSelectedAudit(params?.row);
              openModal('viewDetails');
            }}
            className="cursor-pointer font-semibold text-lightPurple"
          >
            View Details
          </button>
        </>
      ),
    },
  ];

  const isSmallWidth = useMediaQuery('(max-width:370px)');

  const [queryParams, setQueryParams] = useState<QueryParams>({
    pageNo: paginationData.pageNumber,
    pageSize: paginationData.pageSize,
    sortBy: 'asc',
    sortOrder: 'desc',
    searchFilter: formik.values.searchFilter,
    searchType: SearchTypes.SearchAudits,
    startDate: formik.values.startDate,
    endDate: formik.values.endDate,
  });

  const getAuditTrailRecords = async () => {
    setSearchedTerm(formik.values.searchFilter);
    const res = await getAuditTrails(queryParams as QueryParams);
    if (res.responseData) {
      setAuditRecords(res.responseData);
      setShowFilteredAudit(true);
    }
  };

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      searchFilter: formik.values.searchFilter,
      pageNo: paginationData.pageNumber,
      pageSize: paginationData.pageSize,
      startDate: formik.values.startDate,
      endDate: formik.values.endDate,
    }));
  }, [paginationData]);

  useEffect(() => {
    getAuditTrailRecords();
  }, [
    queryParams.searchFilter,
    queryParams.startDate,
    queryParams.endDate,
    queryParams.pageNo,
    queryParams.pageSize,
  ]);

  const clearFilter = () => {
    formik.setFieldValue('startDate', null);
    formik.setFieldValue('endDate', null);
    formik.setFieldValue('searchFilter', '');
  };

  useEffect(() => {
    if (formik.values.startDate && formik.values.endDate) {
      const startDate = new Date(formik.values.startDate);
      const endDate = new Date(formik.values.endDate);
      if (startDate > endDate) {
        notifyError('Start date should be less than end date');
      }
    }
  }, [formik.values.startDate, formik.values.endDate]);

  return (
    <>
      <section className="p-2 md:p-4">
        <div className="fade-in-down my-2 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">Audit Trail</h1>
          </div>
        </div>
        <div className="mt-5">
          <div className="slide-down relative mt-5 flex flex-col items-center justify-center rounded-md bg-white p-2 md:p-4">
            <div className="mt-6 flex w-full flex-col gap-4 py-1 md:flex-row md:items-center">
              <div className="w-full">
                <CustomInput
                  labelFor="searchFilter"
                  label="Actor Email"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="relative flex w-full items-center gap-2">
                <span className="absolute bottom-20 font-semibold">Date Range</span>
                <div className="w-full">
                  <FormDatePicker
                    name={'startDate'}
                    formik={formik}
                    label="Start Date"
                    placeholder="DD/MM/YY"
                    showLabel={false}
                    width="100%"
                  />
                </div>
                <div className="w-full">
                  <FormDatePicker
                    name={'endDate'}
                    formik={formik}
                    label="End Date"
                    placeholder="DD/MM/YY"
                    showLabel={false}
                  />
                </div>
              </div>
              <div className="mt-[6px] flex md:justify-end">
                <ButtonComponent
                  variant="contained"
                  color="white"
                  backgroundColor="#5C068C"
                  hoverBackgroundColor="#2F0248"
                  type="button"
                  title="Continue"
                  customPaddingX="2rem"
                  width={isSmallWidth ? '10rem' : undefined}
                  height="3rem"
                  onClick={() => {
                    setQueryParams((prev) => ({
                      ...prev,
                      searchFilter: formik.values.searchFilter,
                      pageNo: paginationData.pageNumber,
                      pageSize: paginationData.pageSize,
                      startDate: formik.values.startDate,
                      endDate: formik.values.endDate,
                    }));
                  }}
                />
              </div>
            </div>
            <div className="flex w-full items-center justify-end gap-3 py-1">
              <div className="">
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
          </div>

          {showFilteredAudit && auditRecords.items && (
            <div className="slide-downward relative mt-8 flex flex-col items-center justify-center rounded-md bg-white p-2 md:p-5">
              <div className="flex w-full flex-col justify-between gap-y-4 pb-3 lg:flex-row lg:items-center">
                {searchedTerm?.length > 0 ? (
                  <h2 className="text-xl font-bold text-lightPurple">{`Actor Email: ${searchedTerm.toLocaleUpperCase()}`}</h2>
                ) : null}
                <div
                  className={`flex w-full items-center ${searchedTerm?.length > 0 ? 'lg:w-[50%]' : 'lg:w-full'} lg:justify-end`}
                >
                  <ExportBUtton
                    data={auditRecords.items}
                    printPdfRef={printPdfRef}
                    headers={excelHeaders}
                    fileName="Audits.csv"
                  />
                </div>
              </div>
              <h3 className="mt-2 w-full rounded-tl-xl rounded-tr-xl border px-3 py-4 text-lg font-semibold">
                {formik.values.startDate && formik.values.endDate ? (
                  <>
                    Activities between:{' '}
                    {formik.values.startDate
                      ? dayjs(formik.values.startDate).format('D MMMM')
                      : 'Start Date'}{' '}
                    to{' '}
                    {formik.values.endDate
                      ? dayjs(formik.values.endDate).format('D MMMM, YYYY')
                      : 'End Date'}
                  </>
                ) : null}
              </h3>
              <div className="w-full">
                <div ref={printPdfRef} className="w-full">
                  <CustomTable
                    tableData={auditRecords?.items}
                    columns={columns}
                    rowCount={auditRecords?.totalCount}
                    paginationData={paginationData}
                    setPaginationData={setPaginationData}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      {modals.viewDetails && (
        <CustomModal
          isOpen={modals.viewDetails}
          setIsOpen={() => closeModal('viewDetails')}
          width={'800px'}
          paddingX={0}
        >
          <div id="modal-modal-title">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Log Details</h1>
              <button className="scale-[110%]" onClick={() => closeModal('viewDetails')}>
                <CloseIcon />
              </button>
            </div>
            <div className="mt-3 h-[2px] w-full bg-grayPrimary"></div>
          </div>
          <div id="modal-modal-description">
            <div className="slide-down mt-5 bg-white">
              <div className="rounded-[12px] border-[3px] border-grayPrimary px-6 py-4">
                <div className="flex items-center justify-between">
                  <p className="my-3 text-lg font-semibold">Log Details</p>
                </div>
                <div className="h-[2px] w-full bg-grayPrimary"></div>
                <div className="mt-4 grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-y-[20px]">
                  <DetailsCard title="Reference" content={selectedAudit.targetId} />
                  <DetailsCard title="Actor Email" content={selectedAudit.actor} />
                  <DetailsCard title="Affected Module" content={selectedAudit.module} />
                  <DetailsCard title="Performed Action" content={selectedAudit.action} />
                  <DetailsCard
                    title="Date Performed"
                    content={
                      selectedAudit.dateCreated &&
                      new Date(selectedAudit.dateCreated).toLocaleDateString()
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </CustomModal>
      )}
    </>
  );
};

export default AuditTrail;
