import DashboardIcon from 'assets/icons/DashboardIcon';
import RequestIcon from 'assets/icons/RequestsIcon';
import MerchantIcon from 'assets/icons/MerchantIcon';
import MandateIcon from 'assets/icons/MandateIcon';
import ProfileIcon from 'assets/icons/ProfileIcon';
import AccountIcon from 'assets/icons/AccountIcon';
import AuditIcon from 'assets/icons/AuditIcon';
import ReportIcon from 'assets/icons/ReportIcon';
import AdminDashboard from 'pages/Admin/Dashboard';
import AdminMerchantRequests from 'pages/Admin/Requests/MerchantRequests';
import AdminMandateRequests from 'pages/Admin/Requests/MandateRequests';
import AdminAccountRequests from 'pages/Admin/Requests/AccountRequests';
import AdminProfileRequests from 'pages/Admin/Requests/ProfileRequests';
import AdminMerchantManagement from 'pages/Admin/MerchantManagement';
import AdminMandateManagement from 'pages/Admin/MandatetManagement';
import AdminProfileManagement from 'pages/Admin/ProfileManagement';
import AdminAccountManagement from 'pages/Admin/AccountManagement';
import AdminAuditTrail from 'pages/Admin/AuditTrail';
import AdminReports from 'pages/Admin/Reports';

import MerchantDashboard from 'pages/Merchant/Dashboard';
import MerchantRequests from 'pages/Merchant/Requests';
import MerchantMandateManagement from 'pages/Merchant/MandatetManagement';
import MerchantUserManagement from 'pages/Merchant/UserManagement';
import MerchantAuditTrail from 'pages/Merchant/AuditTrail';
import MerchantReports from 'pages/Merchant/Reports';
import { UserLoginRoles } from 'utils/enums';
import appRoutes, { BASE_ROUTES } from 'utils/constants/routes';
import MerchantDetails from 'pages/Admin/MerchantManagement/MerchantDetails';
import MerchantDashboardMandateDetails from 'pages/Merchant/Dashboard/MerchantDashboardMandateDetails';
import CreationRequestDetails from 'pages/Merchant/Requests/request-details/CreationRequestDetails';
import UpdateRequestDetails from 'pages/Merchant/Requests/request-details/UpdateRequestDetails';
import DisableRequestDetails from 'pages/Merchant/Requests/request-details/DisableRequestDetails';
import DeletionRequestDetails from 'pages/Merchant/Requests/request-details/DeletionRequestDetails';
import AdminDashboardMerchantDetails from 'pages/Admin/Dashboard/DashboardMerchantDetails';
import AdminDashboardEditMerchant from 'pages/Admin/Dashboard/DashboardEditMerchant';
import MerchantRequestsRoutes from 'pages/Admin/Requests/MerchantRequests/MerchantRequestsRoutes';

const adminRoutes: RoutesType[] = [
  {
    name: 'Dashboard',
    layout: `/${BASE_ROUTES.ADMIN}`,
    path: 'dashboard',
    icon: <DashboardIcon />,
    component: <AdminDashboard />,
    rolesWithAccess: [UserLoginRoles.Admin],
    willChildLinkShow: false,
    children: [
      {
        name: 'Merchant Details',
        path: 'merchant-details',
        component: <AdminDashboardMerchantDetails />,
      },
      {
        name: 'Edit Merchant',
        path: 'edit-merchant',
        component: <AdminDashboardEditMerchant />,
      },
    ],
  },
  {
    name: 'Requests',
    layout: `/${BASE_ROUTES.ADMIN}`,
    path: 'requests',
    icon: <RequestIcon />,
    component: <AdminMerchantRequests />,
    rolesWithAccess: [UserLoginRoles.Admin],
    willChildLinkShow: true,
    children: [
      {
        name: 'Merchant Requests',
        path: `merchants/*`,
        component: <MerchantRequestsRoutes />,
      },
      {
        name: 'Mandate Requests',
        path: 'mandates',
        component: <AdminMandateRequests />,
      },
      {
        name: 'Account Requests',
        path: 'accounts',
        component: <AdminAccountRequests />,
      },
      {
        name: 'Profile Requests',
        path: 'profiles',
        component: <AdminProfileRequests />,
      },
    ],
  },
  {
    name: 'Merchant Management',
    layout: `/${BASE_ROUTES.ADMIN}`,
    path: 'merchant-management',
    icon: <MerchantIcon />,
    component: <AdminMerchantManagement />,
    rolesWithAccess: [UserLoginRoles.Admin],
    willChildLinkShow: false,
    children: [
      {
        name: 'Merchant Details',
        path: 'merchant-details',
        component: <MerchantDetails />,
      },
    ],
  },
  {
    name: 'Mandate Management',
    layout: `/${BASE_ROUTES.ADMIN}`,
    path: 'mandate-management',
    icon: <MandateIcon />,
    component: <AdminMandateManagement />,
    rolesWithAccess: [UserLoginRoles.Admin],
    willChildLinkShow: false,
  },
  {
    name: 'Profile Management',
    layout: `/${BASE_ROUTES.ADMIN}`,
    path: 'profile-management',
    icon: <ProfileIcon />,
    component: <AdminProfileManagement />,
    rolesWithAccess: [UserLoginRoles.Admin],
    willChildLinkShow: false,
  },
  {
    name: 'Account Management',
    layout: `/${BASE_ROUTES.ADMIN}`,
    path: 'account-management',
    icon: <AccountIcon />,
    component: <AdminAccountManagement />,
    rolesWithAccess: [UserLoginRoles.Admin],
    willChildLinkShow: false,
  },
  {
    name: 'Audit Trail',
    layout: `/${BASE_ROUTES.ADMIN}`,
    path: 'audit-trail',
    icon: <AuditIcon />,
    component: <AdminAuditTrail />,
    rolesWithAccess: [UserLoginRoles.Admin],
    willChildLinkShow: false,
  },
  {
    name: 'Reports',
    layout: `/${BASE_ROUTES.ADMIN}`,
    path: 'reports',
    icon: <ReportIcon />,
    component: <AdminReports />,
    rolesWithAccess: [UserLoginRoles.Admin],
    willChildLinkShow: false,
  },
];

const merchantRoutes: RoutesType[] = [
  {
    name: 'Dashboard',
    layout: `/${BASE_ROUTES.MERCHANT}`,
    path: 'dashboard',
    icon: <DashboardIcon />,
    component: <MerchantDashboard />,
    rolesWithAccess: [UserLoginRoles.Merchant],
    willChildLinkShow: false,
    children: [
      {
        name: 'Mandate Details',
        path: 'mandate-details',
        component: <MerchantDashboardMandateDetails />,
      },
    ],
  },
  {
    name: 'Requests',
    layout: `/${BASE_ROUTES.MERCHANT}`,
    path: 'requests/mandates',
    icon: <RequestIcon />,
    component: <MerchantRequests />,
    rolesWithAccess: [UserLoginRoles.Merchant],
    willChildLinkShow: false,
    children: [
      {
        name: 'Create Request Details',
        path: 'creation-request-details',
        component: <CreationRequestDetails />,
      },
      {
        name: 'Update Request Details',
        path: 'update-request-details',
        component: <UpdateRequestDetails />,
      },
      {
        name: 'Disable Request Details',
        path: 'disable-request-details',
        component: <DisableRequestDetails />,
      },
      {
        name: 'Deletion Request Details',
        path: 'deletion-request-details',
        component: <DeletionRequestDetails />,
      },
    ],
  },
  {
    name: 'Mandate Management',
    layout: `/${BASE_ROUTES.MERCHANT}`,
    path: 'mandate-management',
    icon: <MandateIcon />,
    component: <MerchantMandateManagement />,
    rolesWithAccess: [UserLoginRoles.Merchant],
    willChildLinkShow: false,
  },
  {
    name: 'User Management',
    layout: `/${BASE_ROUTES.MERCHANT}`,
    path: 'user-management',
    icon: <ProfileIcon />,
    component: <MerchantUserManagement />,
    rolesWithAccess: [UserLoginRoles.Merchant],
    willChildLinkShow: false,
  },
  {
    name: 'Audit Trail',
    layout: `/${BASE_ROUTES.MERCHANT}`,
    path: 'audit-trail',
    icon: <AuditIcon />,
    component: <MerchantAuditTrail />,
    rolesWithAccess: [UserLoginRoles.Merchant],
    willChildLinkShow: false,
  },
  {
    name: 'Reports',
    layout: `/${BASE_ROUTES.MERCHANT}`,
    path: 'reports',
    icon: <ReportIcon />,
    component: <MerchantReports />,
    rolesWithAccess: [UserLoginRoles.Merchant],
    willChildLinkShow: false,
  },
];

export { adminRoutes, merchantRoutes };
