import { TabsListTabNames } from './enums';

export interface TabsProps {
  tabIndex: number;
  tabName: TabsListTabNames | string;
  tabTotal?: number;
}

export interface MerchantDataRow {
  id: number;
  merchantName: string;
  cifNumber: string;
  status: string;
  dateRequested: string;
  total?: number;
  action?: any;
}

export interface DashboardMerchantDataRow {
  id: any;
  merchantName: string;
  accountNumber: string;
  phoneNumber: string;
  dateRequested: string;
  dateCreated?: string;
  dateUpdated: string;
  status: string;
  requestType: string;
  cif: string;
}

export interface AccountDataRow {
  id: number;
  merchantId: string;
  accountNumber: string;
  cif: string;
  status?: string;
  requestType: string;
  dateRequested: string;
}
export interface ProfileDataRow {
  id: number;
  accountId: string;
  userName: string;
  email: string;
  requestType: string;
  dateRequested: string;
}

export interface MandateDataRow {
  id: number;
  accountId: number;
  merchantId: number;
  mandateCode: number;
  mandateType: string;
  status?: string;
  requestType: string;
  dateRequested: string;
}

export interface UserDataRow {
  id: number;
  accountId: number;
  username: string;
  emailAddress: string;
  status: string;
  dateCreated: string;
  dateRequested?: string;
}

export interface StaffUserDataRow {
  id: number;
  employeeId: string;
  name: string;
  email: string;
  role: string;
  status: string;
  dateCreated: string;
  dateRequested?: string;
  dateAdded: string;
}

export interface AuditDataRow {
  id: number;
  referenceNumber: number;
  accountName: string;
  module: string;
  performedAction: string;
  date: string;
}

export interface TransactionsDataRow {
  id: number;
  accountId: number;
  mandateId: number | string;
  amount: string;
  date: string;
}

export interface TransactionsReport {
  id: number;
  mandateId: number;
  amount: string;
  date: string;
}

export interface DataTableState {
  resetPaginationToggle: boolean;
  pageSize: number;
  pageNumber: number;
}
