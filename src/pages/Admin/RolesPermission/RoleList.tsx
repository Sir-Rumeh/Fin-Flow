import { useMediaQuery } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import PopoverTitle from 'components/common/PopoverTitle';
import CustomTable from 'components/CustomTable';
import ButtonComponent from 'components/FormElements/Button';
import CustomPopover from 'hoc/PopOverWrapper';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { roleList } from 'utils/constants';
import appRoutes from 'utils/constants/routes';

const RoleList = () => {
  const navigate = useNavigate();
  const isSmallWidth = useMediaQuery('(max-width:370px)');

  const roleColumns: GridColDef[] = [
    {
      field: 'roleName',
      headerName: 'Role Name',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'roleDescription',
      headerName: 'Description',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'designator',
      headerName: 'Designator',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'dateCreated',
      headerName: 'Date Created',
      width: screen.width < 1000 ? 50 : 50,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
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

  return (
    <div>
      <div className="slide-downward relative mt-8 flex flex-col items-center justify-center rounded-md bg-white p-2 md:p-5">
        <div className="flex w-full flex-col justify-between gap-y-4 pb-3 lg:flex-row lg:items-center">
          <h2 className="text-xl font-bold">Roles (5)</h2>

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
        <div className="mt-1 w-full rounded-md border px-3 pt-2">
          <div className="mt-4 w-full">
            <CustomTable
              tableData={roleList}
              columns={roleColumns}
              rowCount={73}
              defaultAnimation={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleList;
