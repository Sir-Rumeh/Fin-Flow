import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  CreationRequestIcon,
  DeleteRequestIcon,
  DisableRequestIcon,
  FilterIcon,
  UpdateRequestIcon,
} from 'assets/icons';
import { BiSearch } from 'react-icons/bi';
import { mandateList, muiDashboardMerchantsList } from 'utils/constants';
import appRoutes from 'utils/constants/routes';
import TableLogo from 'assets/images/table_logo.png';

const MandateRequests = () => {
  const [tab, setTab] = useState(1);

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
            <span className={`mb-[1px] ${colorClass}`}>{params.value}</span>
          </div>
        );

        switch (params.value) {
          case 'Creation':
            return renderIcon(CreationRequestIcon, 'text-greenPrimary');
          case 'Update':
            return renderIcon(UpdateRequestIcon, 'text-lightPurple');
          case 'Disable':
            return renderIcon(DisableRequestIcon, 'text-yellowNeutral');
          case 'Deletion':
            return renderIcon(DeleteRequestIcon, 'text-redSecondary');
          default:
            return <span>{params.value}</span>;
        }
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
      field: 'action',
      headerName: 'Action',
      width: 150,
      headerClassName: 'ag-thead',
      renderCell: (params) => {
        const route =
          params.row.requestType === 'Creation'
            ? appRoutes.merchantDashboard.requests.createRequestDetails
            : params.row.requestType === 'Update'
              ? appRoutes.merchantDashboard.requests.updateRequestDetails
              : params.row.requestType === 'DIsable'
                ? appRoutes.merchantDashboard.requests.disableRequestDetails
                : null;

        if (!route) return <span>View Details</span>;

        return (
          <Link to={`/${route}`} className="cursor-pointer font-medium text-lightPurple">
            View Details
          </Link>
        );
      },
    },
  ];

  return (
    <>
      <div className="px-5 py-5">
        <h2 className="text-2xl font-semibold">Requests</h2>
        <div className="mt-5 rounded-lg bg-white px-5 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-10">
              <div className="flex cursor-pointer flex-col gap-2" onClick={() => setTab(1)}>
                <div className="flex items-center gap-2">
                  <p className={`font-semibold ${tab === 1 ? 'text-blue-500' : 'text-yellow-500'}`}>
                    Pending
                  </p>
                  <span className="rounded-[20px] bg-graySecondary px-3 py-[1px] text-sm text-blue-500">
                    20
                  </span>
                </div>
                <div className={tab === 1 ? 'h-[2px] w-full bg-blue-500' : ''}></div>
              </div>
              <div className="flex cursor-pointer flex-col gap-2" onClick={() => setTab(2)}>
                <div className="flex items-center gap-2">
                  <p className={`font-semibold ${tab === 2 ? 'text-blue-500' : 'text-green-500'}`}>
                    Approved
                  </p>
                  <span className="rounded-[20px] bg-graySecondary px-3 py-[1px] text-sm text-blue-500">
                    20
                  </span>
                </div>
                <div className={tab === 2 ? 'h-[2px] w-full bg-blue-500' : ''}></div>
              </div>
              <div className="flex cursor-pointer flex-col gap-2" onClick={() => setTab(3)}>
                <div className="flex items-center gap-2">
                  <p className={`font-semibold ${tab === 3 ? 'text-blue-500' : 'text-red-500'} `}>
                    Rejected
                  </p>
                  <span className="rounded-[20px] bg-graySecondary px-3 py-[1px] text-sm text-blue-500">
                    20
                  </span>
                </div>
                <div className={tab === 3 ? 'h-[2px] w-full bg-blue-500' : ''}></div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex cursor-pointer items-center gap-3 rounded-lg border border-lightPurple px-4 py-2 text-lightPurple">
                <p>Filter by</p>
                <FilterIcon />
              </button>
              <div className="flex w-[309px] cursor-pointer items-center gap-2 rounded-lg border border-lightPurple px-4 py-2">
                <BiSearch className="h-6 w-6" />
                <input
                  type="text"
                  className="w-full border-none focus:border-none focus:outline-none"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 h-[2px] w-full bg-grayPrimary"></div>
          <div className="mt-6 w-full">
            {muiDashboardMerchantsList?.length > 0 ? (
              <DataGrid
                rows={mandateList}
                columns={MandateTableColumn}
                sx={{
                  border: 0,
                }}
                rowHeight={70}
                columnHeaderHeight={70}
                disableRowSelectionOnClick
                disableColumnMenu
                pagination
              />
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

export default MandateRequests;
