import { useState } from 'react';
import TableFilter from 'components/TableFilter';
import { TabsProps } from 'utils/interfaces';
import CustomTabs from 'hoc/CustomTabs';
import { TabsListTabNames } from 'utils/enums';
import ProfileRequestsListTable from './ProfileRequestsListTable';
import { profileRequestsList } from 'utils/constants';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import appRoutes from 'utils/constants/routes';
import {
  CreationRequestIcon,
  DeleteRequestIcon,
  DisableRequestIcon,
  UpdateRequestIcon,
} from 'assets/icons';
import { ProfileDataRow } from 'utils/interfaces';
import { RequestTypes } from 'utils/enums';
import CustomTable from 'components/CustomTable';
import { useFormik } from 'formik';

const ProfileRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const total = 20;
  const [activeTab, setActiveTab] = useState(TabsListTabNames.Pending);
  const tabsList: TabsProps[] = [
    {
      tabIndex: 1,
      tabName: TabsListTabNames.Pending,
      tabTotal: total,
    },
    {
      tabIndex: 2,
      tabName: TabsListTabNames.Approved,
      tabTotal: total,
    },
    {
      tabIndex: 3,
      tabName: TabsListTabNames.Rejected,
      tabTotal: total,
    },
  ];

  const formik = useFormik({
    initialValues: {
      searchProfile: '',
      fromDateFilter: '',
      toDateFilter: '',
      statusFilter: '',
    },
    onSubmit: (values) => {
      setSearchTerm('');
    },
  });

  const columns: GridColDef[] = [
    {
      field: 'accountId',
      headerName: 'Account ID',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      sortable: false,
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
      field: 'requestType',
      headerName: 'Request Type',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      renderCell: (params: GridRenderCellParams) => {
        const renderIcon = (IconComponent: React.ComponentType, colorClass: string) => (
          <div className="flex w-full items-center gap-2 font-semibold">
            <IconComponent />
            <span className={`mb-[1px] ${colorClass}`}>{params?.row.requestType}</span>
          </div>
        );
        switch (params?.row.requestType) {
          case RequestTypes.Creation:
            return renderIcon(CreationRequestIcon, 'text-greenPrimary');
          case RequestTypes.Update:
            return renderIcon(UpdateRequestIcon, 'text-lightPurple');
          case RequestTypes.Disable:
            return renderIcon(DisableRequestIcon, 'text-yellowNeutral');
          case RequestTypes.Deletion:
            return renderIcon(DeleteRequestIcon, 'text-redSecondary');
          default:
            return <span>{params?.row.requestType}</span>;
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
      field: 'actions',
      headerName: 'Action',
      headerClassName: 'ag-thead ',
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const route =
          params?.row.requestType === RequestTypes.Creation
            ? `/${appRoutes.adminDashboard.requests.profileRequests.profileCreationRequest}`
            : params?.row.requestType === RequestTypes.Deletion
              ? `/${appRoutes.adminDashboard.requests.profileRequests.profileDeletionRequest}`
              : params?.row.requestType === RequestTypes.Update
                ? `/${appRoutes.adminDashboard.requests.profileRequests.profileUpdateRequest}`
                : params?.row.requestType === RequestTypes.Disable
                  ? `/${appRoutes.adminDashboard.requests.profileRequests.profileDisableRequest}`
                  : undefined;
        return (
          <div className="">
            <Link
              className="w-full text-start font-semibold text-lightPurple"
              to={{
                pathname: route,
                search: `?${createSearchParams({ id: params?.row.id })}`,
              }}
            >
              View Details
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <section className="p-2 md:p-4">
        <div className="fade-in-down my-2 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">Profile Requests</h1>
          </div>
        </div>
        <div className="">
          <div className="slide-down relative mt-5 flex flex-col items-center justify-center rounded-md bg-white p-2 md:p-4">
            <div className="flex w-full flex-col justify-between gap-y-4 border-b pb-3 2xl:flex-row 2xl:items-center">
              <div className="flex w-full flex-row items-center justify-start gap-6 md:gap-10 lg:w-[50%]">
                <CustomTabs tabs={tabsList} activeTab={activeTab} setActiveTab={setActiveTab} />
              </div>
              <div className="slide-down flex w-full items-center lg:w-[50%] lg:justify-end">
                <div className="">
                  <TableFilter
                    name={'searchProfile'}
                    placeholder={'Search Profile'}
                    label={'Search Profile'}
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
            </div>
            <div className="mt-6 w-full">
              <CustomTable tableData={profileRequestsList} columns={columns} rowCount={20} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileRequests;
