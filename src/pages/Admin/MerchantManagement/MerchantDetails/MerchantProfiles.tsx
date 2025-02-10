import { useEffect, useRef, useState } from 'react';
import TableFilter from 'components/TableFilter';
import CustomTable from 'components/CustomTable';
import appRoutes from 'utils/constants/routes';
import ChevronRight from 'assets/icons/ChevronRight';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { CreationRequestIcon, DeleteRequestIcon } from 'assets/icons';
import CustomPopover from 'hoc/PopOverWrapper';
import PopoverTitle from 'components/common/PopoverTitle';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import ExportBUtton from 'components/FormElements/ExportButton';
import { useFormik } from 'formik';
import { QueryParams } from 'utils/interfaces';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getMerchantById } from 'config/actions/merchant-actions';
import {
  deleteProfile,
  disableProfile,
  enableProfile,
  getProfilesByMerchantId,
} from 'config/actions/profile-actions';
import { statusDropdownOptions } from 'utils/constants';

const MerchantProfiles = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const merchantId = searchParams?.get('id') || '';
  const printPdfRef = useRef(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [paginationData, setPaginationData] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  const [selectedProfileId, setSelectedProfileId] = useState('');

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
      searchProfile: '',
      fromDateFilter: '',
      toDateFilter: '',
      statusFilter: '',
    },
    onSubmit: (values) => {
      setPaginationData((prev) => {
        return {
          ...prev,
          pageNumber: 1,
        };
      });
      setQueryParams((prev) => ({
        ...prev,
        pageNo: 1,
        searchFilter: formik.values.searchProfile,
      }));
    },
  });

  const [queryParams, setQueryParams] = useState<QueryParams>({
    mandateCode: '',
    status: formik.values.statusFilter,
    pageNo: paginationData.pageNumber,
    pageSize: paginationData.pageSize,
    sortBy: 'asc',
    sortOrder: 'desc',
    searchFilter: formik.values.searchProfile,
    startDate: formik.values.fromDateFilter,
    endDate: formik.values.toDateFilter,
  });

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      pageNo: paginationData.pageNumber,
      pageSize: paginationData.pageSize,
    }));
  }, [paginationData]);

  const handleOptionsFilter = () => {
    setPaginationData((prev) => {
      return {
        ...prev,
        pageNumber: 1,
      };
    });
    setQueryParams((prev) => ({
      ...prev,
      status: formik.values.statusFilter,
      startDate: formik.values.fromDateFilter,
      endDate: formik.values.toDateFilter,
    }));
  };

  const excelHeaders = [
    { label: 'Account ID', key: 'accountId' },
    { label: 'User Name', key: 'userName' },
    { label: 'Email', key: 'email' },
    { label: 'Active Status', key: 'isActive' },
    { label: 'Date Requested', key: 'createdAt' },
  ];

  const columns: GridColDef[] = [
    {
      field: 'accountID',
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
      sortable: false,
    },
    {
      field: 'isActive',
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
      headerName: 'Date Requested',
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
                      pathname: `/${appRoutes.adminDashboard.profileManagement.profileDetails}`,
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
                      pathname: `/${appRoutes.adminDashboard.profileManagement.editProfile}`,
                      search: `?${createSearchParams({ id: params?.row.id })}`,
                    })
                  }
                  type="button"
                  className="w-full px-3 py-2 text-start font-[600] hover:bg-purpleSecondary"
                >
                  Edit Details
                </button>
                {params?.row.isActive ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProfileId(params.row.id);
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
                      setSelectedProfileId(params.row.id);
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
                    setSelectedProfileId(params.row.id);
                    openModal('confirmDelete');
                  }}
                  className="w-full px-3 py-2 text-start font-[600] text-red-400 hover:bg-purpleSecondary"
                >
                  Delete
                </button>
              </div>
            </CustomPopover>
          </div>
        );
      },
    },
  ];

  const { data, refetch } = useQuery({
    queryKey: ['profiles', queryParams],
    queryFn: ({ queryKey }) => getProfilesByMerchantId(merchantId, queryKey[1] as QueryParams),
  });

  const { data: merchantData, refetch: refetchMerchant } = useQuery({
    queryKey: ['merchants', merchantId],
    queryFn: ({ queryKey }) => getMerchantById(queryKey[1]),
  });

  const enableProfileMutation = useMutation({
    mutationFn: (requestId: string | undefined) => enableProfile(requestId),
    onSuccess: () => {
      openModal('enableSuccessful');
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
    onError: (error) => {
      closeModal('enableSuccessful');
    },
  });

  const disableProfileMutation = useMutation({
    mutationFn: (requestId: string | undefined) => disableProfile(requestId),
    onSuccess: () => {
      openModal('enableSuccessful');
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
    onError: (error) => {
      closeModal('enableSuccessful');
    },
  });

  const deleteProfileMutation = useMutation({
    mutationFn: (requestId: string | undefined) => deleteProfile(requestId),
    onSuccess: () => {
      openModal('deleteSuccessful');
      queryClient.invalidateQueries({ queryKey: ['mandates'] });
    },
    onError: (error) => {
      closeModal('deleteSuccessful');
    },
  });

  return (
    <>
      <section className="p-2 md:p-4">
        <div className="flex items-center gap-2 text-lg">
          <Link
            to={`/${appRoutes.adminDashboard.merchantManagement.index}`}
            className="cursor-pointer text-darkgray"
          >
            Merchant Management
          </Link>
          <ChevronRight />
          <Link
            to={{
              pathname: `/${appRoutes.adminDashboard.merchantManagement.merchantDetails}`,
              search: `?${createSearchParams({ id: merchantId })}`,
            }}
            className="cursor-pointer text-darkgray"
          >
            Merchant Details
          </Link>{' '}
          <ChevronRight />
          <span className="text-lightPurple">Merchant Profiles</span>
        </div>
        <div className="fade-in-down my-2 mt-6 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">{`Profiles Under Merchant: ${merchantData?.responseData?.name ? merchantData?.responseData?.name : ''}`}</h1>
          </div>
        </div>
        <div className="mt-5">
          <div className="slide-down relative mt-5 flex flex-col items-center justify-center rounded-md bg-white p-2 md:p-4">
            <div className="flex w-full flex-col gap-y-4 border-b pb-3 lg:flex-row lg:items-center">
              <div className="slide-down flex w-full items-center lg:w-[50%] lg:justify-start">
                <div className="">
                  <TableFilter
                    name={'searchProfile'}
                    placeholder={'Search Profile'}
                    label={'Search Profile'}
                    value={searchTerm}
                    setSearch={setSearchTerm}
                    handleOptionsFilter={handleOptionsFilter}
                    formik={formik}
                    fromDateName={'fromDateFilter'}
                    toDateName={'toDateFilter'}
                    selectName={'statusFilter'}
                    dropdownOptions={statusDropdownOptions}
                  />
                </div>
              </div>
              <div className="flex w-full items-center lg:w-[50%] lg:justify-end">
                <ExportBUtton
                  data={data?.responseData?.items}
                  printPdfRef={printPdfRef}
                  headers={excelHeaders}
                  fileName="Profiles.csv"
                />
              </div>
            </div>

            <div className="mt-6 w-full">
              <div ref={printPdfRef} className="w-full">
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
          title={'Disable Profile?'}
          info={'You are about to disable this profile, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          loading={disableProfileMutation.isPending}
          proceedAction={() => {
            closeModal('confirmDisable');
            disableProfileMutation.mutate(selectedProfileId);
          }}
        />
      )}
      {modals.disableSuccessful && (
        <ModalWrapper
          isOpen={modals.disableSuccessful}
          setIsOpen={() => closeModal('disableSuccessful')}
          title={'Success!!'}
          info={'You have successfully disabled this profile and your request is pending approval'}
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
          title={'Enable Profile?'}
          info={'You are about to enable this profile, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          loading={enableProfileMutation.isPending}
          proceedAction={() => {
            closeModal('confirmEnable');
            enableProfileMutation.mutate(selectedProfileId);
          }}
        />
      )}
      {modals.enableSuccessful && (
        <ModalWrapper
          isOpen={modals.enableSuccessful}
          setIsOpen={() => closeModal('enableSuccessful')}
          title={'Success!!'}
          info={'You have successfully enabled this profile and your request is pending approval'}
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
          title={'Delete Profile?'}
          info={'You are about to delete this profile, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          loading={deleteProfileMutation.isPending}
          proceedAction={() => {
            closeModal('confirmDelete');
            deleteProfileMutation.mutate(selectedProfileId);
          }}
        />
      )}
      {modals.deleteSuccessful && (
        <ModalWrapper
          isOpen={modals.deleteSuccessful}
          setIsOpen={() => closeModal('deleteSuccessful')}
          title={'Success!!'}
          info={'You have successfully deleted this profile and your request is pending approval'}
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

export default MerchantProfiles;
