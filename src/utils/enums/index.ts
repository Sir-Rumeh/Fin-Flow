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
}
export enum TabsListTabNames {
  Approved = 'Approved',
  Pending = 'Pending',
  Rejected = 'Rejected',
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
  Enabled = 'Enabled',
  Disabled = 'Disabled',
}

export enum ReportsType {
  TransactionReports = 'Transaction Reports',
  MandateStatusReports = 'Mandate Status Report',
}
