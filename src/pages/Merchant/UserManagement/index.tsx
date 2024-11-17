import { Link } from 'react-router-dom';
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import { CreationRequestIcon, DeleteRequestIcon } from 'assets/icons';
import appRoutes from 'utils/constants/routes';
import CustomTable from 'components/CustomTable';
import TableFilter from 'components/TableFilter';
import { useFormik } from 'formik';
import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QueryParams } from 'utils/interfaces';
import { getProfiles } from 'config/actions/profile-actions';
import { SearchTypes } from 'utils/enums';

const UserManagement = () => {
  const printPdfRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [paginationData, setPaginationData] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  const formik = useFormik({
    initialValues: {
      searchUser: '',
      fromDateFilter: '',
      toDateFilter: '',
      statusFilter: '',
    },
    onSubmit: (values) => {
      setQueryParams((prev) => ({
        ...prev,
        searchFilter: formik.values.searchUser,
      }));
      refetch();
    },
  });

  const [queryParams, setQueryParams] = useState<QueryParams>({
    status: formik.values.statusFilter,
    pageNo: paginationData.pageNumber,
    pageSize: paginationData.pageSize,
    sortBy: 'asc',
    sortOrder: 'desc',
    searchFilter: formik.values.searchUser,
    searchType: SearchTypes.SearchProfiles,
    startDate: formik.values.fromDateFilter,
    endDate: formik.values.toDateFilter,
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
      renderCell: (params: GridRenderCellParams) => (
        <div>{`${params.row.firstName} ${params.row.lastName}`}</div>
      ),
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

  const { data, refetch } = useQuery({
    queryKey: ['profiles', queryParams],
    queryFn: ({ queryKey }) => getProfiles(queryKey[1] as QueryParams),
  });

  return (
    <>
      <div className="px-5 py-5">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <div className="mt-5 rounded-lg bg-white px-5 py-5">
          <div className="flex items-center justify-between">
            <div className="">
              <TableFilter
                name={'searchUser'}
                placeholder={'Search User'}
                label={'Search User Email'}
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
          <div className="mt-4 h-[2px] w-full bg-grayPrimary"></div>
          <div className="mt-6 w-full">
            <div ref={printPdfRef} className="w-full">
              <CustomTable
                tableData={data?.responseData?.items}
                columns={UserTableColumn}
                rowCount={data?.responseData?.totalCount}
                paginationData={paginationData}
                setPaginationData={setPaginationData}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
