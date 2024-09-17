import { useState } from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { mandateList, transactionReports } from 'utils/constants';
import TableLogo from 'assets/images/table_logo.png';
import CustomTable from 'components/CustomTable';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ButtonComponent from 'components/FormElements/Button';
import { Box, createTheme, Modal, ThemeProvider, Typography } from '@mui/material';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import Tab from 'components/Tabs';
import { ReportsType, RequestType } from 'utils/enums';
import CustomPopover from 'hoc/PopOverWrapper';
import PopoverTitle from 'components/common/PopoverTitle';
import appRoutes from 'utils/constants/routes';
import { Link } from 'react-router-dom';
import {
  CloseIcon,
  CreationRequestIcon,
  DarkArrowDown,
  DeleteRequestIcon,
  DisableRequestIcon,
  DownloadIcon,
  UpdateRequestIcon,
} from 'assets/icons';
import CustomSelect from 'components/FormElements/CustomSelect';
import { useTabContext } from '../../../context/TabContext';
import ExportBUtton from 'components/FormElements/ExportButton';
import TableFilter from 'components/TableFilter';
import { useFormik } from 'formik';

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
  const { tab, setTab } = useTabContext();
  const [searchTerm, setSearchTerm] = useState('');

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const [isLogDetailsModalOpen, setIsLogDetailsModalOpen] = useState(false);

  const openModal = () => setIsLogDetailsModalOpen(true);

  const closeModal = () => setIsLogDetailsModalOpen(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [selectedReportType, setSelectedReportType] = useState<string>('');

  const handleSelect = (value: string) => {
    setSelectedReportType(value);
    console.log(selectedReportType);
  };

  const theme = createTheme({
    typography: {
      fontFamily: '"Gotham", sans-serif',
    },
  });

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

  const TransactionsReportsTableColumn: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
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
          <button className="flex cursor-pointer items-center gap-3 font-semibold text-lightPurple">
            <DownloadIcon />
            Download Receipt
          </button>
        );
      },
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
      field: 'requestType',
      headerName: 'Request Type',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      renderCell: (params) => {
        const renderIcon = (IconComponent: any, colorClass: any) => (
          <div className="flex items-center gap-2">
            <IconComponent />
            <span className={`mb-0 ${colorClass}`}>{params.value}</span>
          </div>
        );

        const getIconAndColor = (requestType: RequestType) => {
          switch (requestType) {
            case RequestType.Creation:
            case RequestType.Enabled:
              return {
                IconComponent: CreationRequestIcon,
                colorClass: 'text-greenPrimary font-semibold',
              };
            case RequestType.Update:
              return {
                IconComponent: UpdateRequestIcon,
                colorClass: 'text-lightPurple font-semibold',
              };
            case RequestType.Disable:
              return {
                IconComponent: DisableRequestIcon,
                colorClass: 'text-yellowNeutral font-semibold',
              };
            case RequestType.Deletion:
            case RequestType.Disabled:
              return {
                IconComponent: DeleteRequestIcon,
                colorClass: 'text-redSecondary font-semibold',
              };
            default:
              return null;
          }
        };

        const iconAndColor = getIconAndColor(params.value);

        if (iconAndColor) {
          return renderIcon(iconAndColor.IconComponent, iconAndColor.colorClass);
        }

        return <span>{params.value}</span>;
      },
    },
    {
      field: 'dateRequested',
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
        const requestType = params.row.requestType;

        const isEnabled = requestType === RequestType.Enabled;

        const buttonTitle = isEnabled ? 'Disable' : 'Enable';
        const buttonColorClass = isEnabled ? 'text-red-400' : 'text-greenPrimary';

        return (
          <div className="-ml-1 h-full border-none">
            <CustomPopover
              popoverId={params?.row.id}
              buttonIcon={<PopoverTitle title="Actions" />}
              translationX={-15}
              translationY={45}
            >
              <div className="flex w-[8rem] flex-col rounded-md p-1 text-sm">
                <Link
                  to={`/${appRoutes.merchantDashboard.mandateManagement.mandateDetails}`}
                  className="w-full px-3 py-2 text-start font-semibold opacity-75 hover:bg-purpleSecondary"
                >
                  View Details
                </Link>
                <div
                  onClick={() => {}}
                  className="w-full px-3 py-2 text-start font-semibold opacity-75 hover:bg-purpleSecondary"
                >
                  View Transactions
                </div>
                <div
                  onClick={() => {}}
                  className="w-full px-3 py-2 text-start font-semibold opacity-75 hover:bg-purpleSecondary"
                >
                  Update Amount
                </div>
                <div
                  onClick={() => {}}
                  className={`w-full px-3 py-2 text-start font-semibold opacity-75 hover:bg-purpleSecondary ${buttonColorClass}`}
                >
                  Enable
                </div>
                <div
                  className="w-full px-3 py-2 text-start font-[600] text-red-400 hover:bg-purpleSecondary"
                  onClick={() => {}}
                >
                  Delete
                </div>
              </div>
            </CustomPopover>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="px-5 py-5">
        <h2 className="text-2xl font-semibold">Reporting</h2>
        <div className="mt-5 rounded-lg bg-white px-5 py-8">
          <div className="flex items-center justify-between">
            <p className="my-3 text-xl font-semibold">Generate Report</p>
          </div>
          <div className="h-[2px] w-full bg-grayPrimary"></div>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <ThemeProvider theme={theme}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start Date"
                  sx={{
                    height: '50px',
                    width: '100%',
                    marginTop: '32px',
                    '& .MuiInputBase-root': {
                      height: '50px',
                      borderRadius: '8px',
                    },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />
                <DatePicker
                  label="End Date"
                  sx={{
                    height: '50px',
                    width: '100%',
                    marginTop: '32px',
                    '& .MuiInputBase-root': {
                      height: '50px',
                      borderRadius: '8px',
                    },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />
              </LocalizationProvider>
            </ThemeProvider>
            <CustomSelect
              labelFor="reportType"
              label="Report Type"
              containerStyles="h-[50px] w-full mb-10"
              selectStyles="h-[50px] px-2"
              options={['Mandate Status Report', 'Transaction Reports']}
              placeholder="Select here"
              icon={<DarkArrowDown height="20" width="20" styles="mt-1 mr-1" />}
              onSelect={handleSelect}
            />
            <CustomSelect
              labelFor="status"
              label="Status"
              containerStyles="w-full h-[50px]"
              selectStyles="h-[50px] px-2"
              options={['Mandate Status Report', 'Transaction Reports']}
              placeholder="Select here"
              icon={<DarkArrowDown height="20" width="20" styles="mt-1 mr-1" />}
            />
          </div>
          <div className="mt-10 flex justify-end">
            <div className="">
              <ButtonComponent
                onClick={() => {}}
                title="Generate Report"
                backgroundColor="#5C068C"
                hoverBackgroundColor="#2F0248"
                color="white"
                width="180px"
                height="45px"
              />
            </div>
          </div>
        </div>
        {selectedReportType === ReportsType.TransactionReports && (
          <div className="mt-10 rounded-lg bg-white px-5 py-5">
            <div className="mt-10 flex items-center justify-between">
              <p className="text-xl font-bold">
                Mono Tech Transaction Report Details (June 2023 to August 2023)
              </p>
              <ExportBUtton />
            </div>
            <div className="mt-5 rounded-lg border px-4 py-6">
              <div className="">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-between gap-4">
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
                  <div className="">
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
                  </div>
                </div>
                <div className="mt-3 h-[2px] w-full bg-grayPrimary"></div>
                <div className="mt-6">
                  {transactionReports.length > 0 ? (
                    <CustomTable
                      tableData={transactionReports}
                      columns={TransactionsReportsTableColumn}
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
            </div>
          </div>
        )}
        {selectedReportType === ReportsType.MandateStatusReports && (
          <div className="mt-10 rounded-lg bg-white px-5 py-5">
            <div className="mt-10 rounded-lg bg-white px-5 py-5">
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold md:text-xl">
                  Mandate Status Report (June 2023 to August 2023)
                </p>
                <ExportBUtton />
              </div>
              <div className="mt-5 rounded-lg border px-4 py-6">
                <div className="">
                  <div className="flex flex-col items-center justify-between md:flex-row">
                    <p className="text-lg font-semibold md:text-xl">All Mandates Reports</p>
                    <div className="">
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
                    </div>
                  </div>
                  <div className="mt-3 h-[2px] w-full bg-grayPrimary"></div>
                  <div className="mt-6">
                    {transactionReports.length > 0 ? (
                      <CustomTable
                        tableData={mandateList}
                        columns={MandateTableColumn}
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
              </div>
            </div>
          </div>
        )}
        {isLogDetailsModalOpen && (
          <Modal
            open={isLogDetailsModalOpen}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <div className="flex items-center justify-between font-semibold">
                  <h1>Log Details</h1>
                  <button onClick={closeModal}>
                    <CloseIcon />
                  </button>
                </div>
                <div className="mt-3 h-[2px] w-full bg-grayPrimary"></div>
              </Typography>
              <Typography id="modal-modal-description">
                <div className="rounded-xl bg-white py-10">
                  <div className="rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
                    <div className="flex items-center justify-between">
                      <p className="my-3 text-lg font-semibold">Log Details</p>
                    </div>
                    <div className="h-[2px] w-full bg-grayPrimary"></div>
                    <div className="mt-4 grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[30px]">
                      <DetailsCard title="Reference" content="12345" />
                      <DetailsCard title="Account Name" content="John Wick" />
                      <DetailsCard title="Affected Module" content="Account Management" />
                      <DetailsCard title="Performed Action" content="Disable Account" />
                      <DetailsCard title="Date Performed" content="12/12/2024 - 03:00pm" />
                    </div>
                  </div>
                </div>
              </Typography>
            </Box>
          </Modal>
        )}
      </div>
    </>
  );
};

export default Reports;
