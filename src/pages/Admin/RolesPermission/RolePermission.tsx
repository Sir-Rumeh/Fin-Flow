import { useMediaQuery } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import PopoverTitle from 'components/common/PopoverTitle';
import CustomTable from 'components/CustomTable';
import ButtonComponent from 'components/FormElements/Button';
import { getRolePermissions, getRoles } from 'config/actions/role-permission-actions';
import CustomPopover from 'hoc/PopOverWrapper';
import { useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import appRoutes from 'utils/constants/routes';
import { capitalize } from 'utils/helpers';
import { PermissionInterface, QueryParams } from 'utils/interfaces';

const RolePermission = () => {
  const navigate = useNavigate();
  const isSmallWidth = useMediaQuery('(max-width:370px)');
  const [searchTerm, setSearchTerm] = useState('');
  const [allRoles, setAllRoles] = useState<any[]>([]);
  const [paginationData, setPaginationData] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  const [queryParams, setQueryParams] = useState<QueryParams>({
    pageNo: paginationData.pageNumber,
    pageSize: paginationData.pageSize,
    sortBy: 'asc',
    sortOrder: 'desc',
  });
  const [roleQueryParams, setRoleQueryParams] = useState<QueryParams>({
    pageSize: 100,
    sortBy: 'asc',
    sortOrder: 'desc',
  });

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      pageNo: paginationData.pageNumber,
      pageSize: paginationData.pageSize,
    }));
  }, [paginationData]);

  const { data: roles } = useQuery({
    queryKey: ['roles', roleQueryParams],
    queryFn: ({ queryKey }) => getRoles(queryKey[1] as QueryParams),
  });

  const { data, refetch } = useQuery({
    queryKey: ['role-permissions', queryParams],
    queryFn: ({ queryKey }) => getRolePermissions(queryKey[1] as QueryParams),
  });

  useEffect(() => {
    setAllRoles(roles?.responseData?.items);
  }, [roles]);

  const getRoleGroupName = (roleId: string) => {
    return capitalize(allRoles?.find((role) => role.id === roleId)?.name);
  };

  const rolePermissionColumns: GridColDef[] = [
    {
      field: 'roleId',
      headerName: 'Role Name',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      renderCell: (params: GridRenderCellParams) => {
        return <p className="w-full">{getRoleGroupName(params.row.roleId)}</p>;
      },
    },
    {
      field: 'groupRoleId',
      headerName: 'Role ID',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      renderCell: (params: GridRenderCellParams) => {
        return <p className="w-full">{params.row.roleId}</p>;
      },
    },
    {
      field: 'permissions',
      headerName: 'Has Access to',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div className="w-full flex-wrap whitespace-normal text-wrap break-words">
            {params.row.permissions?.map((permission: PermissionInterface, index: number) => {
              return (
                <span className={`mr-2`} key={`${params.row.roleId}${permission.module}`}>
                  {permission.module}
                  {index !== params.row.permissions.length - 1 ? ',' : ''}
                </span>
              );
            })}
          </div>
        );
      },
    },
    {
      field: 'dateCreated',
      headerName: 'Date Created',
      width: screen.width < 1000 ? 50 : 50,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div className="w-full">
            {new Date(params.row.permissions?.[0]?.createdAt).toLocaleDateString()}
          </div>
        );
      },
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
              popoverId={params?.row.roleId}
              buttonIcon={<PopoverTitle title="Actions" />}
              translationX={-10}
              translationY={45}
            >
              <div className="flex flex-col rounded-md p-1">
                <button
                  onClick={() =>
                    navigate({
                      pathname: `/${appRoutes.adminDashboard.rolesPermission.rolePermissionDetails}`,
                      search: `?${createSearchParams({ id: params?.row.roleId })}`,
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
            title="Add Role Permission"
            customPaddingX="1.4rem"
            width={isSmallWidth ? '10rem' : undefined}
            onClick={() => {
              navigate({
                pathname: `/${appRoutes.adminDashboard.rolesPermission.addRolePermission}`,
              });
            }}
          />
        </div>
      </div>
      <div className="slide-downward relative mt-8 flex flex-col items-center justify-center rounded-md bg-white p-2 md:p-5">
        <div className="flex w-full flex-col justify-between gap-y-4 pb-3 lg:flex-row lg:items-center">
          <h2 className="text-xl font-bold">{`Role Permissions (${data?.responseData?.totalCount ?? 0})`}</h2>
          <div></div>
        </div>
        <div className="mt-1 w-full rounded-md border px-3 pt-2">
          <div className="mt-4 w-full">
            <CustomTable
              tableData={data?.responseData?.items}
              columns={rolePermissionColumns}
              rowCount={data?.responseData?.totalCount}
              paginationData={paginationData}
              setPaginationData={setPaginationData}
              getRowId={(row) => row.roleId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolePermission;
