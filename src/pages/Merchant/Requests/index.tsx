import { Link } from 'react-router-dom';
import { GridColDef } from '@mui/x-data-grid';
import {
  CreationRequestIcon,
  DeleteRequestIcon,
  DisableRequestIcon,
  FilterIcon,
  UpdateRequestIcon,
} from 'assets/icons';
import SearchIcon from 'assets/icons/SearchIcon';
import { approvedMandateList, pendingMandateList, rejectedMandateList } from 'utils/constants';
import appRoutes from 'utils/constants/routes';
import TableLogo from 'assets/images/table_logo.png';
import { useTabContext } from '../../../context/TabContext';
import { RequestType } from 'utils/enums';
import Tab from 'components/Tabs';
import CustomTable from 'components/CustomTable';

const MandateRequests = () => {
  const { tab, setTab } = useTabContext();

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
          case RequestType.Creation:
            return renderIcon(CreationRequestIcon, 'text-greenPrimary');
          case RequestType.Update:
            return renderIcon(UpdateRequestIcon, 'text-lightPurple');
          case RequestType.Disable:
            return renderIcon(DisableRequestIcon, 'text-yellowNeutral');
          case RequestType.Deletion:
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
              : params.row.requestType === 'Disable'
                ? appRoutes.merchantDashboard.requests.disableRequestDetails
                : params.row.requestType === 'Deletion'
                  ? appRoutes.merchantDashboard.requests.deletionRequestDetails
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

  const getCurrentMandateList = () => {
    switch (tab) {
      case 1:
        return pendingMandateList;
      case 2:
        return approvedMandateList;
      case 3:
        return rejectedMandateList;
      default:
        return [];
    }
  };

  return (
    <>
      <div className="px-5 py-5">
        <h2 className="text-2xl font-semibold">Requests</h2>
        <div className="mt-5 rounded-lg bg-white px-5 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-10">
              <Tab
                label="Pending"
                count={20}
                isActive={tab === 1}
                onClick={() => setTab(1)}
                inactiveColor="text-yellow-500"
              />
              <Tab
                label="Approved"
                count={20}
                isActive={tab === 2}
                onClick={() => setTab(2)}
                inactiveColor="text-green-500"
              />
              <Tab
                label="Rejected"
                count={20}
                isActive={tab === 3}
                onClick={() => setTab(3)}
                inactiveColor="text-red-500"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="flex cursor-pointer items-center gap-3 rounded-lg border border-lightPurple px-4 py-2 text-lightPurple">
                <p>Filter by</p>
                <FilterIcon />
              </button>
              <div className="flex w-[309px] cursor-pointer items-center gap-2 rounded-lg border border-lightPurple px-4 py-2">
                <SearchIcon />
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
            {getCurrentMandateList()?.length > 0 ? (
              <CustomTable
                tableData={getCurrentMandateList()}
                columns={MandateTableColumn}
                rowCount={20}
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
