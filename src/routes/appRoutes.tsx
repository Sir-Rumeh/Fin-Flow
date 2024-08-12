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
import { Roles } from 'utils/enums';
import { BASE_ROUTES } from 'utils/constants/routes';

const adminRoutes = [
  {
    name: 'Dashboard',
    layout: `/${BASE_ROUTES.ADMIN}`,
    path: 'dashboard',
    icon: <DashboardIcon />,
    component: <AdminDashboard />,
    rolesWithAccess: [Roles.Admin],
  },
  {
    name: 'Requests',
    layout: `/${BASE_ROUTES.ADMIN}`,
    path: 'requests',
    icon: <RequestIcon />,
    component: <AdminMerchantRequests />,
    rolesWithAccess: [Roles.Admin],
    children: [
      {
        name: 'Merchant Requests',
        path: 'merchants',
        component: <AdminMerchantRequests />,
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
    rolesWithAccess: [Roles.Admin],
  },
  {
    name: 'Mandate Management',
    layout: `/${BASE_ROUTES.ADMIN}`,
    path: 'mandate-management',
    icon: <MandateIcon />,
    component: <AdminMandateManagement />,
    rolesWithAccess: [Roles.Admin],
  },
  {
    name: 'Profile Management',
    layout: `/${BASE_ROUTES.ADMIN}`,
    path: 'profile-management',
    icon: <ProfileIcon />,
    component: <AdminProfileManagement />,
    rolesWithAccess: [Roles.Admin],
  },
  {
    name: 'Account Management',
    layout: `/${BASE_ROUTES.ADMIN}`,
    path: 'account-management',
    icon: <AccountIcon />,
    component: <AdminAccountManagement />,
    rolesWithAccess: [Roles.Admin],
  },
  {
    name: 'Audit Trail',
    layout: `/${BASE_ROUTES.ADMIN}`,
    path: 'audit-trail',
    icon: <AuditIcon />,
    component: <AdminAuditTrail />,
    rolesWithAccess: [Roles.Admin],
  },
  {
    name: 'Reports',
    layout: `/${BASE_ROUTES.ADMIN}`,
    path: 'reports',
    icon: <ReportIcon />,
    component: <AdminReports />,
    rolesWithAccess: [Roles.Admin],
  },
];

const merchantRoutes = [
  {
    name: 'Dashboard',
    layout: `/${BASE_ROUTES.MERCHANT}`,
    path: 'dashboard',
    icon: <DashboardIcon />,
    component: <MerchantDashboard />,
    rolesWithAccess: [Roles.Merchant],
  },
  {
    name: 'Requests',
    layout: `/${BASE_ROUTES.MERCHANT}`,
    path: 'requests/mandates',
    icon: <RequestIcon />,
    component: <MerchantRequests />,
    rolesWithAccess: [Roles.Merchant],
  },
  {
    name: 'Mandate Management',
    layout: `/${BASE_ROUTES.MERCHANT}`,
    path: 'mandate-management',
    icon: <MandateIcon />,
    component: <MerchantMandateManagement />,
    rolesWithAccess: [Roles.Merchant],
  },
  {
    name: 'User Management',
    layout: `/${BASE_ROUTES.MERCHANT}`,
    path: 'user-management',
    icon: <ProfileIcon />,
    component: <MerchantUserManagement />,
    rolesWithAccess: [Roles.Merchant],
  },
  {
    name: 'Audit Trail',
    layout: `/${BASE_ROUTES.MERCHANT}`,
    path: 'audit-trail',
    icon: <AuditIcon />,
    component: <MerchantAuditTrail />,
    rolesWithAccess: [Roles.Merchant],
  },
  {
    name: 'Reports',
    layout: `/${BASE_ROUTES.MERCHANT}`,
    path: 'reports',
    icon: <ReportIcon />,
    component: <MerchantReports />,
    rolesWithAccess: [Roles.Merchant],
  },
];

export { adminRoutes, merchantRoutes };
