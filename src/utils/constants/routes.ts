export const BASE_ROUTES = {
  LOGIN: '/',
  ADMINLOGIN: 'admin-login',
  MERCHANTLOGIN: 'merchant-login',
  ADMIN: 'admin',
  MERCHANT: 'merchant',
};

export const appRoutes = {
  login: BASE_ROUTES.LOGIN,
  adminLogin: BASE_ROUTES.ADMINLOGIN,
  merchantLogin: BASE_ROUTES.MERCHANTLOGIN,
  adminDashboard: {
    dashboard: {
      index: `${BASE_ROUTES.ADMIN}`,
      merchantDetails: `${BASE_ROUTES.ADMIN}/dashboard/merchant-details`,
      editMerchant: `${BASE_ROUTES.ADMIN}/dashboard/edit-merchant`,
    },
    requests: {
      index: `${BASE_ROUTES.ADMIN}/requests/merchants`,
      merchantRequests: {
        index: `${BASE_ROUTES.ADMIN}/requests/merchants`,
        merchantCreationRequest: `${BASE_ROUTES.ADMIN}/requests/merchants/creation-request-details`,
        merchantDeletionRequest: `${BASE_ROUTES.ADMIN}/requests/merchants/deletion-request-details`,
        merchantUpdateRequest: `${BASE_ROUTES.ADMIN}/requests/merchants/update-request-details`,
        merchantDisableRequest: `${BASE_ROUTES.ADMIN}/requests/merchants/disable-request-details`,
        merchantEnableRequest: `${BASE_ROUTES.ADMIN}/requests/merchants/enable-request-details`,
      },
      mandateRequests: {
        index: `${BASE_ROUTES.ADMIN}/requests/mandates`,
        mandateCreationRequest: `${BASE_ROUTES.ADMIN}/requests/mandates/creation-request-details`,
        mandateDeletionRequest: `${BASE_ROUTES.ADMIN}/requests/mandates/deletion-request-details`,
        mandateUpdateRequest: `${BASE_ROUTES.ADMIN}/requests/mandates/update-request-details`,
        mandateDisableRequest: `${BASE_ROUTES.ADMIN}/requests/mandates/disable-request-details`,
        mandateEnableRequest: `${BASE_ROUTES.ADMIN}/requests/mandates/enable-request-details`,
      },
      accountRequests: {
        index: `${BASE_ROUTES.ADMIN}/requests/accounts`,
        accountCreationRequest: `${BASE_ROUTES.ADMIN}/requests/accounts/creation-request-details`,
        accountDeletionRequest: `${BASE_ROUTES.ADMIN}/requests/accounts/deletion-request-details`,
        accountUpdateRequest: `${BASE_ROUTES.ADMIN}/requests/accounts/update-request-details`,
        accountDisableRequest: `${BASE_ROUTES.ADMIN}/requests/accounts/disable-request-details`,
        accountEnableRequest: `${BASE_ROUTES.ADMIN}/requests/accounts/enable-request-details`,
      },
      profileRequests: {
        index: `${BASE_ROUTES.ADMIN}/requests/profiles`,
        profileCreationRequest: `${BASE_ROUTES.ADMIN}/requests/profiles/creation-request-details`,
        profileDeletionRequest: `${BASE_ROUTES.ADMIN}/requests/profiles/deletion-request-details`,
        profileUpdateRequest: `${BASE_ROUTES.ADMIN}/requests/profiles/update-request-details`,
        profileDisableRequest: `${BASE_ROUTES.ADMIN}/requests/profiles/disable-request-details`,
        profileEnableRequest: `${BASE_ROUTES.ADMIN}/requests/profiles/enable-request-details`,
      },
    },
    merchantManagement: {
      index: `${BASE_ROUTES.ADMIN}/merchant-management`,
      merchantDetails: `${BASE_ROUTES.ADMIN}/merchant-management/merchant-details`,
      merchantAccounts: `${BASE_ROUTES.ADMIN}/merchant-management/merchant-details/merchant-accounts`,
      merchantProfiles: `${BASE_ROUTES.ADMIN}/merchant-management/merchant-details/merchant-profiles`,
      merchantMandates: `${BASE_ROUTES.ADMIN}/merchant-management/merchant-details/merchant-mandates`,
      createMerchant: `${BASE_ROUTES.ADMIN}/merchant-management/onboard-merchant`,
      editMerchant: `${BASE_ROUTES.ADMIN}/merchant-management/edit-merchant`,
    },
    mandateManagement: {
      index: `${BASE_ROUTES.ADMIN}/mandate-management`,
      mandateDetails: `${BASE_ROUTES.ADMIN}/mandate-management/mandate-details`,
      createMandate: `${BASE_ROUTES.ADMIN}/mandate-management/create-mandate`,
    },
    profileManagement: {
      index: `${BASE_ROUTES.ADMIN}/profile-management`,
      profileDetails: `${BASE_ROUTES.ADMIN}/profile-management/profile-details`,
      createProfile: `${BASE_ROUTES.ADMIN}/profile-management/create-profile`,
      editProfile: `${BASE_ROUTES.ADMIN}/profile-management/edit-profile`,
    },
    accountManagement: {
      index: `${BASE_ROUTES.ADMIN}/account-management`,
      accountDetails: `${BASE_ROUTES.ADMIN}/account-management/account-details`,
      createAccount: `${BASE_ROUTES.ADMIN}/account-management/create-account`,
      editAccount: `${BASE_ROUTES.ADMIN}/account-management/edit-account`,
    },
    auditTrail: {
      index: `${BASE_ROUTES.ADMIN}/audit-trail`,
    },
    reports: {
      index: `${BASE_ROUTES.ADMIN}/reports`,
    },
    staffUserManagement: {
      index: `${BASE_ROUTES.ADMIN}/staff-user-management`,
      staffUserDetails: `${BASE_ROUTES.ADMIN}/staff-user-management/staff-user-details`,
      createStaffUser: `${BASE_ROUTES.ADMIN}/staff-user-management/create-staff-user`,
      createBulkStaffUsers: `${BASE_ROUTES.ADMIN}/staff-user-management/create-bulk-staff-users`,
      editStaffUser: `${BASE_ROUTES.ADMIN}/staff-user-management/edit-staff-user`,
    },
    staffUserRequests: {
      index: `${BASE_ROUTES.ADMIN}/staff-user-requests`,
      staffUserCreationRequest: `${BASE_ROUTES.ADMIN}/staff-user-requests/creation-request-details`,
      staffUserDeletionRequest: `${BASE_ROUTES.ADMIN}/staff-user-requests/deletion-request-details`,
      staffUserUpdateRequest: `${BASE_ROUTES.ADMIN}/staff-user-requests/update-request-details`,
      staffUserDisableRequest: `${BASE_ROUTES.ADMIN}/staff-user-requests/disable-request-details`,
      staffUserEnableRequest: `${BASE_ROUTES.ADMIN}/staff-user-requests/enable-request-details`,
    },
  },
  merchantDashboard: {
    dashboard: {
      index: `${BASE_ROUTES.MERCHANT}`,
      mandateDetails: `${BASE_ROUTES.MERCHANT}/dashboard/mandate-details`,
    },
    requests: {
      index: `${BASE_ROUTES.MERCHANT}/requests`,
      createRequestDetails: `${BASE_ROUTES.MERCHANT}/requests/mandates/creation-request-details`,
      updateRequestDetails: `${BASE_ROUTES.MERCHANT}/requests/mandates/update-request-details`,
      disableRequestDetails: `${BASE_ROUTES.MERCHANT}/requests/mandates/disable-request-details`,
      deletionRequestDetails: `${BASE_ROUTES.MERCHANT}/requests/mandates/deletion-request-details`,
    },
    mandateManagement: {
      index: `${BASE_ROUTES.MERCHANT}/mandate-management`,
      mandateDetails: `${BASE_ROUTES.MERCHANT}/mandate-management/mandate-details`,
      createMandate: `${BASE_ROUTES.MERCHANT}/mandate-management/create-mandate`,
    },
    userManagement: {
      index: `${BASE_ROUTES.MERCHANT}/user-management`,
      userDetails: `${BASE_ROUTES.MERCHANT}/user-management/user-details`,
    },
    auditTrail: {
      index: `${BASE_ROUTES.MERCHANT}/audit-trail`,
    },
    reports: {
      index: `${BASE_ROUTES.MERCHANT}/reports`,
    },
  },
};

export default appRoutes;
