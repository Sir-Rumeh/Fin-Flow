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
}

export interface DataTableState {
  resetPaginationToggle: boolean;
  pageSize: number;
  pageNumber: number;
}
