export enum UserLoginRoles {
  Admin = 'Admin',
  Merchant = 'Merchant',
}
export enum AdminUserRoles {
  Admin = 'Admin Role',
  Onboarding = 'Onboarding Role',
  Audit = 'Audit Role',
  Reporting = 'Reporting Role',
}

export enum RequestTypes {
  Creation = 'Creation',
  Deletion = 'Deletion',
  Update = 'Update',
  Disable = 'Disable',
  Enable = 'Enable',
}
export enum TabsListTabNames {
  Approved = 'Approved',
  Pending = 'Pending',
  Rejected = 'Rejected',
  Declined = 'Declined',
}

export enum AdminDashboardPageType {
  DashboardIndex = 'DashboardIndex',
  ViewMerchantDetails = 'ViewMerchantDetails',
  EditMerchantDetails = 'EditMerchantDetails',
}

export enum RequestType {
  Creation = 'Creation',
  Update = 'Update',
  Disable = 'Disable',
  Deletion = 'Deletion',
  Enable = 'Enable',
  Disabled = 'Disabled',
}

export enum ReportsType {
  TransactionReports = 'Transaction Reports',
  MandateStatusReports = 'Mandate Status Report',
}

export enum MandateRequestStatus {
  Approved = 'Approved',
  Declined = 'Declined',
  Pending = 'Pending',
}

export enum RequestStatus {
  Approved = 'Approved',
  Declined = 'Declined',
  Pending = 'Pending',
}
