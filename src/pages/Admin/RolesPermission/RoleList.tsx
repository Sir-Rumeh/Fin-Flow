import { useMediaQuery } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import PopoverTitle from 'components/common/PopoverTitle';
import CustomTable from 'components/CustomTable';
import ButtonComponent from 'components/FormElements/Button';
import TableFilter from 'components/TableFilter';
import { getRoles } from 'config/actions/role-permission-actions';
import { useFormik } from 'formik';
import CustomPopover from 'hoc/PopOverWrapper';
import { useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { statusDropdownOptions } from 'utils/constants';
import appRoutes from 'utils/constants/routes';
import { SearchTypes } from 'utils/enums';
import { capitalize } from 'utils/helpers';
import { QueryParams } from 'utils/interfaces';

const RoleList = () => {
  const navigate = useNavigate();
  const isSmallWidth = useMediaQuery('(max-width:370px)');
  const [searchTerm, setSearchTerm] = useState('');
  const [paginationData, setPaginationData] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  const formik = useFormik({
    initialValues: {
      searchRole: '',
    },
    onSubmit: (values) => {
      setQueryParams((prev) => ({
        ...prev,
        searchFilter: formik.values.searchRole,
      }));
      refetch();
    },
  });

  const [queryParams, setQueryParams] = useState<QueryParams>({
    pageNo: paginationData.pageNumber,
    pageSize: paginationData.pageSize,
    sortBy: 'asc',
    sortOrder: 'desc',
    searchFilter: formik.values.searchRole,
    searchType: SearchTypes.SearchRoles,
  });

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      pageNo: paginationData.pageNumber,
      pageSize: paginationData.pageSize,
    }));
  }, [paginationData]);

  const roleColumns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Role Name',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      renderCell: (params: GridRenderCellParams) => {
        return <span>{`${capitalize(params?.row?.name)}`}</span>;
      },
    },
    {
      field: 'id',
      headerName: 'Role ID',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'description',
      headerName: 'Description',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'designation',
      headerName: 'Designation',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
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
      field: 'actions',
      headerName: 'Action',
      headerClassName: 'ag-thead ',
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div className="h-full border-none">
            <CustomPopover
              popoverId={params?.row.id}
              buttonIcon={<PopoverTitle title="Actions" />}
              translationX={-10}
              translationY={45}
            >
              <div className="flex flex-col rounded-md p-1">
                <button
                  onClick={() =>
                    navigate({
                      pathname: `/${appRoutes.adminDashboard.rolesPermission.roleDetails}`,
                      search: `?${createSearchParams({ id: params?.row.id })}`,
                    })
                  }
                  type="button"
                  className="w-full px-3 py-2 text-start font-[600] hover:bg-purpleSecondary"
                >
                  View Details
                </button>
              </div>
            </CustomPopover>
          </div>
        );
      },
    },
  ];

  const { data, refetch } = useQuery({
    queryKey: ['roles', queryParams],
    queryFn: ({ queryKey }) => getRoles(queryKey[1] as QueryParams),
  });

  return (
    <div>
      <div className="flex w-full items-center justify-end">
        <div className="w-auto">
          <ButtonComponent
            variant="contained"
            color="white"
            backgroundColor="#5C068C"
            hoverBackgroundColor="#2F0248"
            type="button"
            title="Add New Role"
            customPaddingX="1.4rem"
            width={isSmallWidth ? '10rem' : undefined}
            onClick={() => {
              navigate({
                pathname: `/${appRoutes.adminDashboard.rolesPermission.addRole}`,
              });
            }}
          />
        </div>
      </div>
      <div className="slide-downward relative mt-8 flex flex-col items-center justify-center rounded-md bg-white p-2 md:p-5">
        <div className="flex w-full flex-col justify-between gap-y-4 pb-3 lg:flex-row lg:items-center">
          <h2 className="text-xl font-bold">{`Roles (${data?.responseData?.totalCount ?? 0})`}</h2>
          <div>
            <TableFilter
              name={'searchRole'}
              placeholder={'Search Role Name'}
              label={'Search Role'}
              value={searchTerm}
              setSearch={setSearchTerm}
              handleOptionsFilter={() => {}}
              formik={formik}
              fromDateName={'fromDateFilter'}
              toDateName={'toDateFilter'}
              selectName={'statusFilter'}
              showOptionsFilter={false}
              dropdownOptions={statusDropdownOptions}
            />
          </div>
        </div>
        <div className="mt-1 w-full rounded-md border px-3 pt-2">
          <div className="mt-4 w-full">
            <CustomTable
              tableData={data?.responseData?.items}
              columns={roleColumns}
              rowCount={data?.responseData?.totalCount}
              paginationData={paginationData}
              setPaginationData={setPaginationData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleList;
