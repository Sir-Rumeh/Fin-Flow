import { Link } from 'react-router-dom';
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import { CreationRequestIcon, DeleteRequestIcon, FilterIcon, SearchIcon } from 'assets/icons';
import appRoutes from 'utils/constants/routes';
import TableLogo from 'assets/images/table_logo.png';
import CustomTable from 'components/CustomTable';
import TableFilter from 'components/TableFilter';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QueryParams } from 'utils/interfaces';
import { getProfiles } from 'config/actions/dashboard-actions';
import { Box, CircularProgress } from '@mui/material';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [queryParams, setQueryParams] = useState<QueryParams>({
    username: '',
    email: '',
    pageNo: 1,
    pageSize: 10,
    sortBy: 'asc',
    sortOrder: 'desc',
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

  const UserTableColumn: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Account ID',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'userName',
      headerName: 'User Name',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'email',
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
        const renderIcon = (IconComponent: any, colorClass: string, text: string) => (
          <div className="flex items-center gap-2">
            <IconComponent />
            <span className={`mb-0 ${colorClass}`}>{text}</span>
          </div>
        );

        const getIconAndColor = (
          requestType: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>,
          isActive: boolean,
        ) => {
          if (isActive) {
            return {
              IconComponent: CreationRequestIcon,
              colorClass: 'text-greenPrimary font-semibold',
              text: 'Enabled',
            };
          } else {
            return {
              IconComponent: DeleteRequestIcon,
              colorClass: 'text-redSecondary font-semibold',
              text: 'Disabled',
            };
          }
        };

        const isActive = params?.row?.isActive;
        const iconAndColor = getIconAndColor(params.value, isActive);

        return renderIcon(iconAndColor.IconComponent, iconAndColor.colorClass, iconAndColor.text);
      },
    },
    {
      field: 'createdAt',
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
      renderCell: (params: GridRenderCellParams) => (
        <Link
          to={`/${appRoutes.merchantDashboard.userManagement.userDetails}/${params.id}`}
          className="cursor-pointer font-semibold text-lightPurple"
        >
          View Details
        </Link>
      ),
    },
  ];

  const { isLoading, data } = useQuery({
    queryKey: ['profiles', queryParams],
    queryFn: ({ queryKey }) => getProfiles(queryKey[1] as QueryParams),
  });

  console.log(data);

  return (
    <>
      <div className="px-5 py-5">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <div className="mt-5 rounded-lg bg-white px-5 py-5">
          <div className="flex items-center justify-between">
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
          <div className="mt-4 h-[2px] w-full bg-grayPrimary"></div>
          <div className="mt-6 w-full">
            {isLoading ? (
              <div className="flex h-[50vh] flex-col items-center justify-center">
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
              </div>
            ) : data?.responseData?.items?.length > 0 ? (
              <CustomTable
                tableData={data.responseData.items}
                columns={UserTableColumn}
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

export default UserManagement;
