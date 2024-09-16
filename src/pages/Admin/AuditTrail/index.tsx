import ButtonComponent from 'components/FormElements/Button';
import { useState } from 'react';
import CustomTable from 'components/CustomTable';
import { GridColDef } from '@mui/x-data-grid';
import { CloseIcon } from 'assets/icons';
import { auditTrailList } from 'utils/constants';
import ExportBUtton from 'components/FormElements/ExportButton';
import { useFormik } from 'formik';
import { Typography, useMediaQuery } from '@mui/material';
import CustomInput from 'components/FormElements/CustomInput';
import FormDatePicker from 'components/FormElements/FormDatePicker';
import CustomModal from 'hoc/ModalWrapper/CustomModal';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';

const AuditTrail = () => {
  const [modals, setModals] = useState({
    viewDetails: false,
  });
  const [showFilteredAudit, setShowFilteredAudit] = useState(false);

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
    },
    onSubmit: (values) => {},
  });

  const columns: GridColDef[] = [
    {
      field: 'referenceNumber',
      headerName: 'Ref No',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'accountName',
      headerName: 'Account Name',
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
      field: 'performedAction',
      headerName: 'Performed Action',
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
      field: 'action',
      headerName: 'Action',
      width: 150,
      headerClassName: 'ag-thead',
      renderCell: () => (
        <>
          <button
            type="button"
            onClick={() => openModal('viewDetails')}
            className="cursor-pointer font-semibold text-lightPurple"
          >
            View Details
          </button>
        </>
      ),
    },
  ];

  const isSmallWidth = useMediaQuery('(max-width:370px)');

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
                  label="Account Number/Username/CIF/Staff ID"
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
                    setShowFilteredAudit(true);
                  }}
                />
              </div>
            </div>
          </div>

          {showFilteredAudit && (
            <div className="slide-downward relative mt-8 flex flex-col items-center justify-center rounded-md bg-white p-2 md:p-5">
              <div className="flex w-full flex-col justify-between gap-y-4 pb-3 lg:flex-row lg:items-center">
                <h2 className="text-xl font-bold text-lightPurple">Staff Name: Abimbola Adeyemi</h2>
                <div className="flex w-full items-center lg:w-[50%] lg:justify-end">
                  <ExportBUtton />
                </div>
              </div>
              <h3 className="mt-2 w-full rounded-tl-xl rounded-tr-xl border px-3 py-4 text-lg font-semibold">
                Activities between June to July, 2024
              </h3>
              <div className="w-full">
                <CustomTable
                  tableData={auditTrailList}
                  columns={columns}
                  rowCount={257}
                  defaultAnimation={false}
                  paginationData={paginationData}
                  setPaginationData={setPaginationData}
                />
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Log Details</h1>
              <button className="scale-[110%]" onClick={() => closeModal('viewDetails')}>
                <CloseIcon />
              </button>
            </div>
            <div className="mt-3 h-[2px] w-full bg-grayPrimary"></div>
          </Typography>
          <Typography id="modal-modal-description">
            <div className="slide-down mt-5 bg-white">
              <div className="rounded-[12px] border-[3px] border-grayPrimary px-6 py-4">
                <div className="flex items-center justify-between">
                  <p className="my-3 text-lg font-semibold">Log Details</p>
                </div>
                <div className="h-[2px] w-full bg-grayPrimary"></div>
                <div className="mt-4 grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-y-[20px]">
                  <DetailsCard title="Reference" content="12345" />
                  <DetailsCard title="Account Name" content="John Wick" />
                  <DetailsCard title="Affected Module" content="Account Management" />
                  <DetailsCard title="Performed Action" content="Disable Account" />
                  <DetailsCard title="Date Performed" content="12/12/2024 ; 12:12:12" />
                </div>
              </div>
            </div>
          </Typography>
        </CustomModal>
      )}
    </>
  );
};

export default AuditTrail;
