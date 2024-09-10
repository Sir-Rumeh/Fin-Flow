import { Link } from 'react-router-dom';
import { GridColDef } from '@mui/x-data-grid';
import { CreationRequestIcon, DeleteRequestIcon, FilterIcon } from 'assets/icons';
import { pendingMandateList, UserManagementList } from 'utils/constants';
import appRoutes from 'utils/constants/routes';
import TableLogo from 'assets/images/table_logo.png';
import { RequestType } from 'utils/enums';
import CustomTable from 'components/CustomTable';
import SearchIcon from 'assets/icons/SearchIcon';

const UserManagement = () => {
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

  return (
    <>
      <div className="px-5 py-5">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <div className="mt-5 rounded-lg bg-white px-5 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="flex cursor-pointer items-center gap-3 rounded-lg border border-lightPurple px-4 py-2 text-lightPurple">
                <p>Filter by</p>
                <FilterIcon />
              </button>
              <div className="flex w-[309px] cursor-pointer items-center gap-2 rounded-lg border border-lightPurple px-4 py-2">
                <SearchIcon className="h-6 w-6" />
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

export default UserManagement;
