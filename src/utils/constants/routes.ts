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
      mandateRequests: `${BASE_ROUTES.ADMIN}/requests/mandates`,
      accountRequests: `${BASE_ROUTES.ADMIN}/requests/accounts`,
      profileRequests: `${BASE_ROUTES.ADMIN}/requests/profiles`,
    },
    merchantManagement: {
      index: `${BASE_ROUTES.ADMIN}/merchant-management`,
      merchantDetails: `${BASE_ROUTES.ADMIN}/merchant-management/merchant-details`,
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
      index: `${BASE_ROUTES.ADMIN}/mandate-management`,
    },
    userManagement: {
      index: `${BASE_ROUTES.ADMIN}/user-management`,
    },
    auditTrail: {
      index: `${BASE_ROUTES.ADMIN}/audit-trail`,
    },
    reports: {
      index: `${BASE_ROUTES.ADMIN}/reports`,
    },
  },
};

export default appRoutes;
