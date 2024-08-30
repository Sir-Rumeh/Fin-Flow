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
      },
      mandateRequests: {
        index: `${BASE_ROUTES.ADMIN}/requests/mandates`,
        mandateCreationRequest: `${BASE_ROUTES.ADMIN}/requests/mandates/creation-request-details`,
        mandateDeletionRequest: `${BASE_ROUTES.ADMIN}/requests/mandates/deletion-request-details`,
        mandateUpdateRequest: `${BASE_ROUTES.ADMIN}/requests/mandates/update-request-details`,
        mandateDisableRequest: `${BASE_ROUTES.ADMIN}/requests/mandates/disable-request-details`,
      },
      accountRequests: {
        index: `${BASE_ROUTES.ADMIN}/requests/accounts`,
        accountCreationRequest: `${BASE_ROUTES.ADMIN}/requests/accounts/creation-request-details`,
        accountDeletionRequest: `${BASE_ROUTES.ADMIN}/requests/accounts/deletion-request-details`,
        accountUpdateRequest: `${BASE_ROUTES.ADMIN}/requests/accounts/update-request-details`,
        accountDisableRequest: `${BASE_ROUTES.ADMIN}/requests/accounts/disable-request-details`,
      },
      profileRequests: {
        index: `${BASE_ROUTES.ADMIN}/requests/profiles`,
        profileCreationRequest: `${BASE_ROUTES.ADMIN}/requests/profiles/creation-request-details`,
        profileDeletionRequest: `${BASE_ROUTES.ADMIN}/requests/profiles/deletion-request-details`,
        profileUpdateRequest: `${BASE_ROUTES.ADMIN}/requests/profiles/update-request-details`,
        profileDisableRequest: `${BASE_ROUTES.ADMIN}/requests/profiles/disable-request-details`,
      },
    },
    merchantManagement: {
      index: `${BASE_ROUTES.ADMIN}/merchant-management`,
      merchantDetails: `${BASE_ROUTES.ADMIN}/merchant-management/merchant-details`,
      createMerchant: `${BASE_ROUTES.ADMIN}/merchant-management/create-merchant`,
      editMerchant: `${BASE_ROUTES.ADMIN}/merchant-management/edit-merchant`,
    },
    mandateManagement: {
      index: `${BASE_ROUTES.ADMIN}/mandate-management`,
    },
    profileManagement: {
      index: `${BASE_ROUTES.ADMIN}/profile-management`,
    },
    accountManagement: {
      index: `${BASE_ROUTES.ADMIN}/account-management`,
    },
    auditTrail: {
      index: `${BASE_ROUTES.ADMIN}/audit-trail`,
    },
    reports: {
      index: `${BASE_ROUTES.ADMIN}/reports`,
    },
  },
  merchantDashboard: {
    dashboard: {
      index: `${BASE_ROUTES.MERCHANT}`,
      mandateDetails: `${BASE_ROUTES.MERCHANT}/dashboard/mandate-details`,
    },
    requests: {
      index: `${BASE_ROUTES.MERCHANT}/requests/mandates`,
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
