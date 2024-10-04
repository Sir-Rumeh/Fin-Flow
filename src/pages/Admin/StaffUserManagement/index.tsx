import ButtonComponent from 'components/FormElements/Button';
import { useEffect, useRef, useState } from 'react';
import TableFilter from 'components/TableFilter';
import CustomTable from 'components/CustomTable';
import appRoutes from 'utils/constants/routes';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { CreationRequestIcon, DeleteRequestIcon } from 'assets/icons';
import { staffUsersList } from 'utils/constants';
import CustomPopover from 'hoc/PopOverWrapper';
import PopoverTitle from 'components/common/PopoverTitle';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import ExportBUtton from 'components/FormElements/ExportButton';
import { useFormik } from 'formik';
import { useMediaQuery } from '@mui/material';
import { QueryParams } from 'utils/interfaces';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteStaffUser,
  disableStaffUser,
  enableStaffUser,
  getStaffUsers,
} from 'config/actions/staff-user-actions';
import { capitalize, notifyError } from 'utils/helpers';

const StaffUserManagement = () => {
  const printPdfRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [paginationData, setPaginationData] = useState({
    pageNumber: 1,
    pageSize: 10,
  });
  const [selectedUserId, setSelectedUserId] = useState('');

  const [modals, setModals] = useState({
    confirmDisable: false,
    disableSuccessful: false,
    confirmEnable: false,
    enableSuccessful: false,
    confirmDelete: false,
    deleteSuccessful: false,
  });

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const formik = useFormik({
    initialValues: {
      searchStaffUser: '',
      fromDateFilter: '',
      toDateFilter: '',
      statusFilter: '',
    },
    onSubmit: (values) => {
      setSearchTerm('');
    },
  });

  const [queryParams, setQueryParams] = useState<QueryParams>({
    status: formik.values.statusFilter,
    pageNo: paginationData.pageNumber,
    pageSize: paginationData.pageSize,
    sortBy: 'asc',
    sortOrder: 'desc',
    searchFilter: formik.values.searchStaffUser,
    startDate: formik.values.fromDateFilter,
    endDate: formik.values.toDateFilter,
  });

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      status: formik.values.statusFilter,
      pageNo: paginationData.pageNumber,
      pageSize: paginationData.pageSize,
      searchFilter: formik.values.searchStaffUser,
      startDate: formik.values.fromDateFilter,
      endDate: formik.values.toDateFilter,
    }));
  }, [paginationData]);

  const handleOptionsFilter = () => {
    setQueryParams((prev) => ({
      ...prev,
      status: formik.values.statusFilter,
      startDate: formik.values.fromDateFilter,
      endDate: formik.values.toDateFilter,
    }));
  };

  const columns: GridColDef[] = [
    {
      field: 'staffId',
      headerName: 'Employee ID',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'name',
      headerName: 'Name',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      renderCell: (params: GridRenderCellParams) => {
        return (
          <span>{`${capitalize(params?.row?.firstName)} ${capitalize(params?.row?.lastName)}`}</span>
        );
      },
    },
    {
      field: 'email',
      headerName: 'Email',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      sortable: false,
    },
    {
      field: 'role',
      headerName: 'Role',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      valueGetter: (params: any) => capitalize(params),
      sortable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      renderCell: (params: GridRenderCellParams) => {
        const renderIcon = (
          IconComponent: React.ComponentType,
          colorClass: string,
          title: string,
        ) => (
          <div className="flex w-full items-center gap-2 font-semibold">
            <IconComponent />
            <span className={`mb-[1px] ${colorClass}`}>{title}</span>
          </div>
        );
        switch (params?.row.isActive) {
          case true:
            return renderIcon(CreationRequestIcon, 'text-greenPrimary', 'Enabled');
          case false:
            return renderIcon(DeleteRequestIcon, 'text-redSecondary', 'Disabled');
          default:
            return <span>{params?.row.isActive ? 'Enabled' : 'Disabled'}</span>;
        }
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
                      pathname: `/${appRoutes.adminDashboard.staffUserManagement.staffUserDetails}`,
                      search: `?${createSearchParams({ id: params?.row.id })}`,
                    })
                  }
                  type="button"
                  className="w-full px-3 py-2 text-start font-[600] hover:bg-purpleSecondary"
                >
                  View Details
                </button>
                <button
                  onClick={() =>
                    navigate({
                      pathname: `/${appRoutes.adminDashboard.staffUserManagement.editStaffUser}`,
                      search: `?${createSearchParams({ id: params?.row.id })}`,
                    })
                  }
                  type="button"
                  className="w-full px-3 py-2 text-start font-[600] hover:bg-purpleSecondary"
                >
                  Edit User
                </button>
                {params?.row.isActive ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedUserId(params?.row.id);
                      openModal('confirmDisable');
                    }}
                    className="w-full px-3 py-2 text-start font-[600] text-red-400 hover:bg-purpleSecondary"
                  >
                    Disable
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedUserId(params?.row.id);
                      openModal('confirmEnable');
                    }}
                    className="w-full px-3 py-2 text-start font-[600] text-green-400 hover:bg-purpleSecondary"
                  >
                    Enable
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedUserId(params?.row.id);
                    openModal('confirmDelete');
                  }}
                  className="w-full px-3 py-2 text-start font-[600] text-red-400 hover:bg-purpleSecondary"
                >
                  Delete User
                </button>
              </div>
            </CustomPopover>
          </div>
        );
      },
    },
  ];

  const isSmallWidth = useMediaQuery('(max-width:370px)');

  const excelHeaders = [
    { label: 'employee ID', key: 'employeeId' },
    { label: 'Name', key: 'userName' },
    { label: 'Email', key: 'email' },
    { label: 'Role', key: 'role' },
    { label: 'Active Status', key: 'isActive' },
    { label: 'Date Requested', key: 'createdAt' },
  ];

  const { data, refetch } = useQuery({
    queryKey: ['users', queryParams],
    queryFn: ({ queryKey }) => getStaffUsers(queryKey[1] as QueryParams),
  });

  const enableStaffUserMutation = useMutation({
    mutationFn: (requestId: string | undefined) => enableStaffUser(requestId),
    onSuccess: () => {
      closeModal('confirmEnable');
      openModal('enableSuccessful');
    },
    onError: (error) => {
      closeModal('confirmEnable');
      notifyError(error?.message);
    },
  });
  const disableStaffUserMutation = useMutation({
    mutationFn: (requestId: string | undefined) => disableStaffUser(requestId),
    onSuccess: () => {
      closeModal('confirmDisable');
      openModal('disableSuccessful');
    },
    onError: (error) => {
      closeModal('confirmDisable');
      notifyError(error?.message);
    },
  });

  const deleteStaffUserMutation = useMutation({
    mutationFn: (requestId: string | undefined) => deleteStaffUser(requestId),
    onSuccess: () => {
      closeModal('confirmDelete');
      openModal('deleteSuccessful');
    },
    onError: (error) => {
      closeModal('confirmDelete');
      notifyError(error?.message);
    },
  });

  return (
    <>
      <section className="p-2 md:p-4">
        <div className="fade-in-down my-2 flex items-center justify-between">
          <div className="w-full">
            <h1 className="text-lg font-semibold md:text-2xl">Staff User Management</h1>
          </div>
          <div className="flex w-full flex-col items-end justify-between gap-5 sm:flex-row sm:items-center sm:justify-end">
            <ButtonComponent
              color="#5C068C"
              borderColor="#5C068C"
              border={0.5}
              width="9rem"
              title="Bulk Upload"
              fontWeight={900}
              onClick={() => {
                navigate({
                  pathname: `/${appRoutes.adminDashboard.staffUserManagement.createBulkStaffUsers}`,
                });
              }}
            />
            <ButtonComponent
              variant="contained"
              color="white"
              backgroundColor="#5C068C"
              hoverBackgroundColor="#2F0248"
              type="button"
              title="Add New User"
              width="9rem"
              onClick={() => {
                navigate({
                  pathname: `/${appRoutes.adminDashboard.staffUserManagement.createStaffUser}`,
                });
              }}
            />
          </div>
        </div>
        <div className="mt-5">
          <div className="slide-down relative mt-5 flex flex-col items-center justify-center rounded-md bg-white p-2 md:p-4">
            <div className="flex w-full flex-col gap-y-4 border-b pb-3 lg:flex-row lg:items-center">
              <div className="slide-down flex w-full items-center lg:w-[50%] lg:justify-start">
                <div className="">
                  <TableFilter
                    name={'searchStaffUser'}
                    placeholder={'Search Staff User'}
                    label={'Search Staff User'}
                    value={searchTerm}
                    setSearch={setSearchTerm}
                    handleOptionsFilter={handleOptionsFilter}
                    formik={formik}
                    fromDateName={'fromDateFilter'}
                    toDateName={'toDateFilter'}
                    selectName={'statusFilter'}
                  />
                </div>
              </div>
              <div className="flex w-full items-center lg:w-[50%] lg:justify-end">
                <ExportBUtton
                  data={data?.responseData?.items}
                  printPdfRef={printPdfRef}
                  headers={excelHeaders}
                  fileName="staff_users.csv"
                />
              </div>
            </div>

            <div className="mt-6 w-full">
              <div className="w-full">
                <CustomTable
                  tableData={data?.responseData?.items}
                  columns={columns}
                  rowCount={data?.responseData?.totalCount}
                  paginationData={paginationData}
                  setPaginationData={setPaginationData}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {modals.confirmDisable && (
        <ModalWrapper
          isOpen={modals.confirmDisable}
          setIsOpen={() => closeModal('confirmDisable')}
          title={'Disable User?'}
          info={'You are about to disable this user, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            disableStaffUserMutation.mutate(selectedUserId);
          }}
        />
      )}
      {modals.disableSuccessful && (
        <ModalWrapper
          isOpen={modals.disableSuccessful}
          setIsOpen={() => closeModal('disableSuccessful')}
          title={'Success!!'}
          info={'You have successfully disabled this user'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            refetch();
            closeModal('disableSuccessful');
          }}
        />
      )}

      {modals.confirmEnable && (
        <ModalWrapper
          isOpen={modals.confirmEnable}
          setIsOpen={() => closeModal('confirmEnable')}
          title={'Enable User?'}
          info={'You are about to enable this user, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            enableStaffUserMutation.mutate(selectedUserId);
          }}
        />
      )}
      {modals.enableSuccessful && (
        <ModalWrapper
          isOpen={modals.enableSuccessful}
          setIsOpen={() => closeModal('enableSuccessful')}
          title={'Success!!'}
          info={'You have successfully enabled this user'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            refetch();
            closeModal('enableSuccessful');
          }}
        />
      )}
      {modals.confirmDelete && (
        <ModalWrapper
          isOpen={modals.confirmDelete}
          setIsOpen={() => closeModal('confirmDelete')}
          title={'Delete User?'}
          info={'You are about to delete this user, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            deleteStaffUserMutation.mutate(selectedUserId);
          }}
        />
      )}
      {modals.deleteSuccessful && (
        <ModalWrapper
          isOpen={modals.deleteSuccessful}
          setIsOpen={() => closeModal('deleteSuccessful')}
          title={'Success!!'}
          info={'You have successfully deleted this user'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            refetch();
            closeModal('deleteSuccessful');
          }}
        />
      )}
    </>
  );
};

export default StaffUserManagement;
