import { useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { auditTrailList } from 'utils/constants';
import TableLogo from 'assets/images/table_logo.png';
import CustomTable from 'components/CustomTable';
import CustomInput from 'components/FormElements/CustomInput';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ButtonComponent from 'components/FormElements/Button';
import { Box, Modal, Typography } from '@mui/material';
import Popover from '@mui/material/Popover';
import { LiaTimesSolid } from 'react-icons/lia';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import { DarkArrowDown } from 'assets/icons';

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

const AuditTrail = () => {
  const AuditTableColumn: GridColDef[] = [
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
            onClick={openModal}
            className="cursor-pointer font-medium text-lightPurple"
          >
            View Details
          </button>
        </>
      ),
    },
  ];

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

  return (
    <>
      <div className="px-5 py-5">
        <h2 className="text-2xl font-semibold">Audit Trail</h2>
        <div className="mt-5 rounded-lg bg-white px-5 py-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <CustomInput
              labelFor="merchantId"
              label="Username/Staff ID"
              containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 md:w-[400px]"
              inputStyles="h-[40px] w-[300px] px-2 focus:outline-none focus:ring-0"
              inputType="text"
              placeholder="Enter here"
            />
            <div className="mt-2 flex items-center justify-between gap-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <DatePicker
                    label="Start Date"
                    sx={{
                      height: '50px',
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
              <ButtonComponent
                onClick={() => {}}
                title="Continue"
                backgroundColor="#5C068C"
                hoverBackgroundColor="#2F0248"
                color="white"
                width="150px"
                height="50px"
              />
            </div>
          </div>
        </div>
        <div className="mt-10 rounded-lg bg-white px-5 py-5">
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-lightPurple">Staff Name: Abimbola Adeyemi</p>
            <ButtonComponent
              onClick={(e) => handleClick(e)}
              title="Export"
              children={<DarkArrowDown height="20" width="20" styles="ml-2" />}
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
          <div className="mt-5 rounded-tl-xl rounded-tr-xl border px-2 py-4 text-lg font-semibold">
            Activities between June to July, 2024
          </div>
          <div className="w-full">
            {auditTrailList?.length > 0 ? (
              <CustomTable tableData={auditTrailList} columns={AuditTableColumn} rowCount={20} />
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
                  <LiaTimesSolid />
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
    </>
  );
};

export default AuditTrail;
