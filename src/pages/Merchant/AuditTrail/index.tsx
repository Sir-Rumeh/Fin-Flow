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
import { Box, createTheme, Modal, ThemeProvider, Typography } from '@mui/material';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import { CloseIcon, DarkArrowDown } from 'assets/icons';
import ExportBUtton from 'components/FormElements/ExportButton';

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
            className="cursor-pointer font-semibold text-lightPurple"
          >
            View Details
          </button>
        </>
      ),
    },
  ];

  const theme = createTheme({
    typography: {
      fontFamily: '"Gotham", sans-serif',
    },
  });

  const [isLogDetailsModalOpen, setIsLogDetailsModalOpen] = useState(false);

  const openModal = () => setIsLogDetailsModalOpen(true);

  const closeModal = () => setIsLogDetailsModalOpen(false);

  return (
    <>
      <div className="px-5 py-5">
        <h2 className="text-2xl font-semibold">Audit Trail</h2>
        <div className="mt-5 rounded-lg bg-white px-5 py-8">
          <div className="grid grid-cols-1 content-center items-center justify-center gap-10 md:grid-cols-2 lg:grid-cols-4">
            <CustomInput
              labelFor="merchantId"
              label="Username/Staff ID"
              containerStyles="w-full flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 w-full mb-[8px]"
              inputStyles="h-[40px] w-full lg:w-[300px] px-2 focus:outline-none focus:ring-0"
              inputType="text"
              placeholder="Enter here"
            />
            <DatePicker
              label="Start Date"
              sx={{
                height: '50px',
                width: '100%',
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
                '& .MuiInputBase-root': {
                  height: '50px',
                  borderRadius: '8px',
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
            />
            <ButtonComponent
              onClick={() => {}}
              title="Continue"
              backgroundColor="#5C068C"
              hoverBackgroundColor="#2F0248"
              color="white"
              width="150px"
              height="50px"
              fontWeight={600}
            />
          </div>
        </div>
        <div className="mt-10 rounded-lg bg-white px-5 py-5">
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-lightPurple">Staff Name: Abimbola Adeyemi</p>
            <ExportBUtton />
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
            <ThemeProvider theme={theme}>
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
            </ThemeProvider>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default AuditTrail;
