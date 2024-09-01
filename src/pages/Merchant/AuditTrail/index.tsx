import { Link } from 'react-router-dom';
import { GridColDef } from '@mui/x-data-grid';
import { CreationRequestIcon, DeleteRequestIcon } from 'assets/icons';
import { pendingMandateList, UserManagementList } from 'utils/constants';
import appRoutes from 'utils/constants/routes';
import TableLogo from 'assets/images/table_logo.png';
import { RequestType } from 'utils/enums';
import CustomTable from 'components/CustomTable';
import CustomInput from 'components/FormElements/CustomInput';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ButtonComponent from 'components/FormElements/Button';
import { Box } from '@mui/material';
import { BiChevronDown } from 'react-icons/bi';

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

const AuditTrail = () => {
  const UserTableColumn: GridColDef[] = [
    {
      field: 'accountId',
      headerName: 'Account ID',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'username',
      headerName: 'User Name',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'emailAddress',
      headerName: 'Email',
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
        const renderIcon = (IconComponent: any, colorClass: any) => (
          <div className="flex items-center gap-2">
            <IconComponent />
            <span className={`mb-[1px] ${colorClass}`}>{params.value}</span>
          </div>
        );

        switch (params.value) {
          case RequestType.Enabled:
            return renderIcon(CreationRequestIcon, 'text-greenPrimary');
          case RequestType.Disabled:
            return renderIcon(DeleteRequestIcon, 'text-redSecondary');
          default:
            return <span>{params.value}</span>;
        }
      },
    },
    {
      field: 'dateCreated',
      headerName: 'Date Created',
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
        <Link
          to={`/${appRoutes.merchantDashboard.userManagement.userDetails}`}
          className="cursor-pointer font-medium text-lightPurple"
        >
          View Details
        </Link>
      ),
    },
  ];

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

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
        <div className="mt-5 rounded-lg bg-white px-5 py-5">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <CustomInput
              labelFor="merchantId"
              label="Username/Staff ID"
              containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 md:w-[400px]"
              inputStyles="h-[40px] w-[300px] px-2 focus:outline-none focus:ring-0"
              inputType="text"
              placeholder="Enter here"
            />
            <div className="mt-8 flex items-center justify-between gap-4">
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
              children={<BiChevronDown className="mb-[1px] ml-2 h-8 w-8" />}
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
          <div className="mt-4 h-[2px] w-full bg-grayPrimary"></div>
          <div className="rounded-tl-xl rounded-tr-xl border px-2 py-4 text-lg font-semibold">
            Activities between June to July, 2024
          </div>
          <div className="w-full">
            {pendingMandateList?.length > 0 ? (
              <CustomTable tableData={UserManagementList} columns={UserTableColumn} rowCount={20} />
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
    </>
  );
};

export default AuditTrail;
