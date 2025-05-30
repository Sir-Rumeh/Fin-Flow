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
  requestType: string;
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

export interface MandateRequest {
  mandateId: string;
  mandateCode?: string | undefined;
  mandateType: string | undefined;
  merchantId: string;
  accountId: string;
  productId: string;
  amount: number;
  startDate: string;
  endDate: string;
  dayToApply: string;
  frequency: string;
  service: string;
  accountName: string;
  accountNumber: string;
  bankCode: string;
  supportingDocument: string;
  narration: string;
  payerName: string;
  payeeName: string;
  payerEmailAddress: string;
  payerPhoneNumber: string;
  payerAddress: string;
  payeeEmailAddress: string;
  payeePhoneNumber: string;
  payeeAddress: string;
  biller?: string;
  billerID?: string;
  billerCode?: string;
  billerAccountNumber?: string;
  bankName?: string;
}

export interface QueryParams {
  username?: string | undefined;
  email?: string | undefined;
  mandateCode?: string | undefined;
  status?: string | undefined;
  pageNo?: number | undefined;
  pageSize?: number | undefined;
  sortBy?: string | undefined;
  sortOrder?: string | undefined;
  searchFilter?: string | undefined;
  searchType?: string | undefined;
  requestType?: string | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
  roleName?: string | undefined;
}

export interface StaffUserRequest {
  staffId?: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  branch: string | undefined;
  role: string | undefined;
  address: string | undefined;
}

export interface ProfileRequest {
  profileID?: string | undefined;
  merchantID: string | undefined;
  accountID: string | undefined;
  userName: string | undefined;
  role: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
}

export interface MerchantRequest {
  merchantId?: string | undefined;
  name: string | undefined;
  accountNumber: string | undefined;
  rcNumber: string | undefined;
  address: string | undefined;
  InternalChargeFee?: number | undefined;
  cif?: string | undefined;
}

export interface AccountRequest {
  accountId?: string | undefined;
  accountName: string | undefined;
  accountNumber: string | undefined;
  merchantName?: string | undefined;
  merchantId: string | undefined;
}
export interface UpdateRequestDisplay {
  name: string | undefined;
  oldValue: string | number | undefined;
  newValue: string | number | undefined;
}

export interface RoleType {
  id: number;
  roleName: string;
  roleDescription: string;
  designator: string;
  dateCreated: string;
}

export interface RoleRequest {
  name: string | undefined;
  description: string | undefined;
  designation: string | undefined;
}
export interface AssignRoleRequest {
  userId: string | undefined;
  roleId: string | undefined;
}

export interface PermissionInterface {
  module: string;
  canList: boolean;
  canListAll?: boolean;
  canDelete: boolean;
  canRead: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canEnable: boolean;
  canDisable: boolean;
  canApprove: boolean;
}

export interface PermissionAccess {
  id: number;
  accessName: string;
  accessTag: string;
}

export interface RolePermissionRequest {
  roleId: string | undefined;
  permissions: PermissionInterface[] | undefined;
}
export interface AdminUserData {
  id: string;
  userName: string | null;
  role: string;
  firstName: string;
  lastName: string;
  middleName: string;
  employeeId: string | null;
  email: string;
  address: string;
  phoneNumber: string;
  branch: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminAuthData {
  userData: AdminUserData;
  refreshToken: string;
  roleName: string;
  token: string;
  timeStamp: string;
}

export interface MerchantUserData {
  id: string;
  merchantID: string;
  accountID: string;
  userName: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  createdBy: string;
  approvedBy: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface MerchantAuthData {
  profileData: MerchantUserData;
  refreshToken: string;
  roleName: string;
  token: string;
  timeStamp: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  designation: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  isDeleted: boolean;
  isActive: boolean;
}

export interface DoNameEnquiryRequest {
  destinationInstitutionCode: string;
  accountNumber: string;
  channelCode: string;
}
