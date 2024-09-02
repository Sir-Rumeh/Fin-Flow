import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  UpdateRequestIcon,
  CreationRequestIcon,
  DisableRequestIcon,
  DeleteRequestIcon,
} from 'assets/icons';
import { Link } from 'react-router-dom';
import appRoutes from 'utils/constants/routes';
import TableLogo from 'assets/images/table_logo.png';
import CustomTable from 'components/CustomTable';

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
        case 'Creation':
          return renderIcon(CreationRequestIcon, 'text-greenPrimary');
        case 'Update':
          return renderIcon(UpdateRequestIcon, 'text-lightPurple');
        case 'Disable':
          return renderIcon(DisableRequestIcon, 'text-yellowNeutral');
        case 'Deletion':
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
      return (
        <Link
          to={`/${appRoutes.merchantDashboard.dashboard.mandateDetails}`}
          className="cursor-pointer font-medium text-lightPurple"
        >
          View Details
        </Link>
      );
    },
  },
];

const data = [
  {
    id: 1,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Creation',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 2,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Update',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 3,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Disable',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 4,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Deletion',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 5,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Disable',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 6,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Disable',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 7,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Disable',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 8,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Disable',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 9,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Disable',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 10,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Disable',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 11,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Disable',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 12,
    accountId: 126473,
    merchantId: 123455,
    mandateCode: 123890,
    mandateType: 'Variable',
    requestType: 'Disable',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
];

const MandateList = () => {
  return (
    <>
      {data?.length > 0 ? (
        <CustomTable tableData={data} columns={MandateTableColumn} rowCount={20} />
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
    </>
  );
};

export default MandateList;
