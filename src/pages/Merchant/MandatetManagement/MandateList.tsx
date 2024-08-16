import {
  UpdateRequestIcon,
  CreationRequestIcon,
  DisableRequestIcon,
  DeleteRequestIcon,
} from 'assets/icons';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { MandateDataRow } from 'utils/interfaces';

const customStyles = {
  headCells: {
    style: {
      backgroundColor: '#F8F8F9',
      fontWeight: 'bold',
      border: 'none',
    },
  },
};

const MandateTableColumn: TableColumn<MandateDataRow>[] = [
  {
    name: 'Account ID',
    selector: (row) => row.accountId,
  },
  {
    name: 'Merchant ID',
    selector: (row) => row.merchantId,
  },
  {
    name: 'Merchant Code',
    selector: (row) => row.mandateCode,
  },
  {
    name: 'Merchant Type',
    selector: (row) => row.mandateType,
  },
  {
    name: 'Request Type',
    selector: (row) => row.requestType,
    cell: (row) => {
      const renderIcon = (IconComponent: React.ComponentType, colorClass: string) => (
        <div className="flex items-center gap-2">
          <IconComponent />
          <span className={`mb-[1px] ${colorClass}`}>{row.requestType}</span>
        </div>
      );

      switch (row.requestType) {
        case 'Creation':
          return renderIcon(CreationRequestIcon, 'text-greenPrimary');
        case 'Update':
          return renderIcon(UpdateRequestIcon, 'text-lightPurple');
        case 'Disable':
          return renderIcon(DisableRequestIcon, 'text-yellowNeutral');
        case 'Deletion':
          return renderIcon(DeleteRequestIcon, 'text-redSecondary');
        default:
          return <span>{row.requestType}</span>;
      }
    },
  },
  {
    name: 'Date Requested',
    selector: (row) => row.dateRequested,
    cell: (row) =>
      useMemo(
        () => (
          <>
            {row.dateRequested
              ? `${dayjs(row.dateRequested).format('DD/MM/YYYY')} | ${dayjs(row.dateRequested).format('hh:mm:ss A')}`
              : 'NA'}
          </>
        ),
        [row.dateRequested],
      ),
  },
  {
    name: 'Action',
    cell: (row) =>
      useMemo(
        () => (
          <Link
            to={`/merchant/dashboard/mandate-details`}
            className="cursor-pointer font-semibold text-lightPurple"
          >
            View Details
          </Link>
        ),
        [row.id],
      ),
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
    <DataTable columns={MandateTableColumn} data={data} customStyles={customStyles} pagination />
  );
};

export default MandateList;
