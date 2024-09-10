import { useState } from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { mandateList, transactionReports } from 'utils/constants';
import TableLogo from 'assets/images/table_logo.png';
import CustomTable from 'components/CustomTable';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ButtonComponent from 'components/FormElements/Button';
import { Box, Modal, Typography } from '@mui/material';
import Popover from '@mui/material/Popover';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import Tab from 'components/Tabs';
import DownloadIcon from 'assets/icons/DownloadIcon';
import SearchIcon from 'assets/icons/SearchIcon';
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
  FilterIcon,
  UpdateRequestIcon,
} from 'assets/icons';
import CustomSelect from 'components/FormElements/CustomSelect';
import { useTabContext } from '../../../context/TabContext';

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
  fontFamily: 'sans-serif',
};

const Reports = () => {
  const { tab, setTab } = useTabContext();

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
              return { IconComponent: CreationRequestIcon, colorClass: 'text-greenPrimary' };
            case RequestType.Update:
              return { IconComponent: UpdateRequestIcon, colorClass: 'text-lightPurple' };
            case RequestType.Disable:
              return { IconComponent: DisableRequestIcon, colorClass: 'text-yellowNeutral' };
            case RequestType.Deletion:
            case RequestType.Disabled:
              return { IconComponent: DeleteRequestIcon, colorClass: 'text-redSecondary' };
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
      headerClassName: 'ag-thead ',
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const requestType = params.row.requestType;

        const isEnabled = requestType === RequestType.Enabled;

        const buttonTitle = isEnabled ? 'Disable' : 'Enable';
        const buttonColorClass = isEnabled ? 'text-red-400' : 'text-greenPrimary';

        // const selectModal = () => {
        //   if (buttonTitle === 'Enable') {
        //     return openModal('openEnableMandate');
        //   } else {
        //     return openModal('openDisableMandate');
        //   }
        // };

        return (
          <div className="-ml-1 h-full border-none">
            <CustomPopover
              popoverId={params?.row.id}
              buttonIcon={<PopoverTitle title="Actions" />}
              translationX={-40}
              translationY={50}
            >
              <div className="flex w-[8rem] flex-col rounded-md p-1 text-sm">
                <Link
                  to={`/${appRoutes.merchantDashboard.mandateManagement.mandateDetails}`}
                  className="w-full px-3 py-2 text-start font-semibold opacity-75 hover:bg-purpleSecondary"
                >
                  View Details
                </Link>
                <button
                  type="button"
                  onClick={() => {}}
                  className="w-full px-3 py-2 text-start font-semibold opacity-75 hover:bg-purpleSecondary"
                >
                  View Transactions
                </button>
                <button
                  type="button"
                  onClick={() => {}}
                  className="w-full px-3 py-2 text-start font-semibold opacity-75 hover:bg-purpleSecondary"
                >
                  Update Amount
                </button>
                <button
                  type="button"
                  onClick={() => {}}
                  className={`w-full px-3 py-2 text-start font-semibold opacity-75 hover:bg-purpleSecondary ${buttonColorClass}`}
                >
                  {/* {buttonTitle} */}
                  Enable
                </button>
                <button
                  type="button"
                  className="w-full px-3 py-2 text-start font-[600] text-red-400 hover:bg-purpleSecondary"
                  onClick={() => {}}
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

  return (
    <>
      <div className="px-5 py-5">
        <h2 className="text-2xl font-semibold">Reporting</h2>
        <div className="mt-5 rounded-lg bg-white px-5 py-8">
          <div className="flex items-center justify-between">
            <p className="my-3 text-lg font-semibold">Generate Report</p>
          </div>
          <div className="h-[2px] w-full bg-grayPrimary"></div>
          <div className="mt-4 flex flex-col items-center gap-14 md:flex-row">
            <div className="mt-8 flex items-center justify-between gap-14">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ display: 'flex', gap: 5 }}>
                  <DatePicker
                    label="Start Date"
                    sx={{
                      height: '50px',
                      width: '230px',
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
                      width: '230px',
                      '& .MuiInputBase-root': {
                        height: '50px',
                        borderRadius: '8px',
                      },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                      },
                    }}
                  />
                </Box>
              </LocalizationProvider>
            </div>
            <div className="mb-8 flex w-full items-center gap-14">
              <CustomSelect
                labelFor="reportType"
                label="Report Type"
                containerStyles="h-[50px] md:w-[230px]"
                selectStyles="h-[50px] px-2"
                options={['Mandate Status Report', 'Transaction Reports']}
                placeholder="Select here"
                icon={<DarkArrowDown height="20" width="20" styles="mt-1 mr-1" />}
                onSelect={handleSelect}
              />
              <CustomSelect
                labelFor="status"
                label="Status"
                containerStyles=" h-[50px] md:w-[230px]"
                selectStyles="h-[50px] px-2"
                options={['Mandate Status Report', 'Transaction Reports']}
                placeholder="Select here"
                icon={<DarkArrowDown height="20" width="20" styles="mt-1 mr-1" />}
              />
            </div>
          </div>
          <div className="mt-5 flex justify-end">
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
        {selectedReportType === ReportsType.TransactionReports && (
          <div className="mt-10 rounded-lg bg-white px-5 py-5">
            <div className="mt-10 flex items-center justify-between">
              <p className="text-xl font-bold">
                Mono Tech Transaction Report Details (June 2023 to August 2023)
              </p>
              <ButtonComponent
                onClick={(e) => handleClick(e)}
                title="Export"
                children={<DarkArrowDown styles="ml-2" height="20" width="20" />}
                color="#5C068C"
                border={1}
                width="150px"
                height="45px"
              />

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
                <div className="flex w-[8rem] flex-col rounded-md p-1 text-sm">
                  <button
                    type="button"
                    onClick={() => {}}
                    className="w-full px-3 py-2 text-start font-semibold opacity-75 hover:bg-purpleSecondary"
                  >
                    CSV
                  </button>
                  <button
                    type="button"
                    onClick={() => {}}
                    className="w-full px-3 py-2 text-start font-semibold opacity-75 hover:bg-purpleSecondary"
                  >
                    Excel
                  </button>
                  <button
                    type="button"
                    onClick={() => {}}
                    className="w-full px-3 py-2 text-start font-semibold opacity-75 hover:bg-purpleSecondary"
                  >
                    PDF
                  </button>
                </div>
              </Popover>
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
                  <div className="flex items-center gap-4">
                    <ButtonComponent
                      onClick={() => {}}
                      title="Filter by"
                      children={<FilterIcon styles="ml-2" />}
                      color="#5C068C"
                      border={1}
                      width="150px"
                      height="45px"
                    />
                    <div className="flex h-[45px] w-[309px] cursor-pointer items-center gap-2 rounded-lg border border-lightPurple px-4 py-2">
                      <SearchIcon className="h-6 w-6" />
                      <input
                        type="text"
                        className="w-full border-none focus:border-none focus:outline-none"
                        placeholder="Search"
                      />
                    </div>
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
                <p className="text-xl font-bold">
                  Mandate Status Report (June 2023 to August 2023)
                </p>
                <ButtonComponent
                  onClick={(e) => handleClick(e)}
                  title="Export"
                  children={<DarkArrowDown styles="ml-2" height="20" width="20" />}
                  color="#5C068C"
                  border={1}
                  width="150px"
                  height="45px"
                />

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
                  <div className="flex w-[8rem] flex-col rounded-md p-1 text-sm">
                    <button
                      type="button"
                      onClick={() => {}}
                      className="w-full px-3 py-2 text-start font-semibold opacity-75 hover:bg-purpleSecondary"
                    >
                      CSV
                    </button>
                    <button
                      type="button"
                      onClick={() => {}}
                      className="w-full px-3 py-2 text-start font-semibold opacity-75 hover:bg-purpleSecondary"
                    >
                      Excel
                    </button>
                    <button
                      type="button"
                      onClick={() => {}}
                      className="w-full px-3 py-2 text-start font-semibold opacity-75 hover:bg-purpleSecondary"
                    >
                      PDF
                    </button>
                  </div>
                </Popover>
              </div>
              <div className="mt-5 rounded-lg border px-4 py-6">
                <div className="">
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-semibold">All Mandates Reports</p>
                    <div className="flex items-center gap-4">
                      <ButtonComponent
                        onClick={() => {}}
                        title="Filter by"
                        children={<FilterIcon styles="ml-2" />}
                        color="#5C068C"
                        border={1}
                        width="150px"
                        height="45px"
                      />
                      <div className="flex h-[45px] w-[309px] cursor-pointer items-center gap-2 rounded-lg border border-lightPurple px-4 py-2">
                        <search className="h-6 w-6" />
                        <input
                          type="text"
                          className="w-full border-none focus:border-none focus:outline-none"
                          placeholder="Search"
                        />
                      </div>
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
