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
    index: `${BASE_ROUTES.ADMIN}`,
    requests: {
      index: `${BASE_ROUTES.ADMIN}/requests/merchants`,
      merchantRequests: `${BASE_ROUTES.ADMIN}/requests/merchants`,
      mandateRequests: `${BASE_ROUTES.ADMIN}/requests/mandates`,
      accountRequests: `${BASE_ROUTES.ADMIN}/requests/accounts`,
      profileRequests: `${BASE_ROUTES.ADMIN}/requests/profiles`,
    },
    merchantManagement: {
      index: `${BASE_ROUTES.ADMIN}/merchant-management`,
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
    index: `${BASE_ROUTES.MERCHANT}`,
    requests: {
      index: `${BASE_ROUTES.MERCHANT}/requests/mandates`,
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
