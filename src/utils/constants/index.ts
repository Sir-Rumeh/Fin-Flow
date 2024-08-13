import { MandateDataRow, MerchantDataRow } from 'utils/interfaces';

export const merchantsList: MerchantDataRow[] = [
  {
    id: 1,
    merchantName: 'string',
    cifNumber: 'string',
    status: 'string',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 2,
    merchantName: 'string',
    cifNumber: 'string',
    status: 'string',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 3,
    merchantName: 'string',
    cifNumber: 'string',
    status: 'string',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
  {
    id: 4,
    merchantName: 'string',
    cifNumber: 'string',
    status: 'string',
    dateRequested: '2015-03-25T12:00:00-06:30',
  },
];

export const mandateList: MandateDataRow[] = [
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
];
