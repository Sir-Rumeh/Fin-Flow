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
import AdminMerchantManagement from 'pages/Admin/MerchantManagement';
import AdminMandateManagement from 'pages/Admin/MandatetManagement';
import AdminMandateDetails from 'pages/Admin/MandatetManagement/MandateDetails';
import AdminCreateMandate from 'pages/Admin/MandatetManagement/CreateMandate';
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
import { AdminUserRoles, UserLoginRoles } from 'utils/enums';
import { BASE_ROUTES } from 'utils/constants/routes';
import MerchantDetails from 'pages/Admin/MerchantManagement/MerchantDetails';
import MerchantDashboardMandateDetails from 'pages/Merchant/Dashboard/MerchantDashboardMandateDetails';
import CreationRequestDetails from 'pages/Merchant/Requests/request-details/CreationRequestDetails';
import UpdateRequestDetails from 'pages/Merchant/Requests/request-details/UpdateRequestDetails';
import DisableRequestDetails from 'pages/Merchant/Requests/request-details/DisableRequestDetails';
import DeletionRequestDetails from 'pages/Merchant/Requests/request-details/DeletionRequestDetails';
import AdminDashboardMerchantDetails from 'pages/Admin/Dashboard/DashboardMerchantDetails';
import AdminDashboardEditMerchant from 'pages/Admin/Dashboard/DashboardEditMerchant';
import MerchantRequestsRoutes from 'pages/Admin/Requests/MerchantRequests/MerchantRequestsRoutes';
import MandateRequestsRoutes from 'pages/Admin/Requests/MandateRequests/MandateRequestsRoutes';
import AccountRequestsRoutes from 'pages/Admin/Requests/AccountRequests/AccountRequestsRoutes';
import ProfileRequestsRoutes from 'pages/Admin/Requests/ProfileRequests/ProfileRequestsRoutes';
import MandateDetails from 'pages/Merchant/MandatetManagement/MandateDetails';
import CreateMandate from 'pages/Merchant/MandatetManagement/CreateMandate';
import EditMerchant from 'pages/Admin/MerchantManagement/EditMerchant';
import CreateMerchant from 'pages/Admin/MerchantManagement/CreateMerchant';
import UserDetails from 'pages/Merchant/UserManagement/UserDetails';
import UserIcon from 'assets/icons/UserIcon';
import StaffUserManagement from 'pages/Admin/StaffUserManagement';
import AdminProfileDetails from 'pages/Admin/ProfileManagement/ProfileDetails';
import AdminCreateProfile from 'pages/Admin/ProfileManagement/CreateProfile';
import AdminEditProfile from 'pages/Admin/ProfileManagement/EditProfile';
import AdminAccountDetails from 'pages/Admin/AccountManagement/AccountDetails';
import AdminCreateAccount from 'pages/Admin/AccountManagement/CreateAccount';
import AdminEditAccount from 'pages/Admin/AccountManagement/EditAccount';
import AdminAddUser from 'pages/Admin/StaffUserManagement/AddSingleUser';
import AdminAddBulkUsers from 'pages/Admin/StaffUserManagement/AddBulkUsers';
import AdminEditUser from 'pages/Admin/StaffUserManagement/EditUser';
import AdminStaffUserDetails from 'pages/Admin/StaffUserManagement/UserDetails';
import StaffUserRequests from 'pages/Admin/Requests/StaffUserRequests';
import StaffUserCreationRequestDetails from 'pages/Admin/Requests/StaffUserRequests/StaffUserCreationRequestDetails';
import StaffUserDeletionRequestDetails from 'pages/Admin/Requests/StaffUserRequests/StaffUserDeletionRequestDetails';
import StaffUserUpdateRequestDetails from 'pages/Admin/Requests/StaffUserRequests/StaffUserUpdateRequestDetails';
import StaffUserDisableRequestDetails from 'pages/Admin/Requests/StaffUserRequests/StaffUserDisableRequestDetails';
import UserRequestsIcon from 'assets/icons/UserRequestsIcon';
import StaffUserEnableRequestDetails from 'pages/Admin/Requests/StaffUserRequests/StaffUserEnableRequestDetails';
import MerchantDetailsRoutes from 'pages/Admin/MerchantManagement/MerchantDetails/MerchantDetailsRoutes';
import AccountDetailsRoutes from 'pages/Admin/AccountManagement/AccountDetails/AccountDetailsRoutes';

const adminRoutes: RoutesType[] = [
  {
    name: 'Dashboard',
    layout: `/${BASE_ROUTES.ADMIN}`,
    path: 'dashboard',
    icon: <DashboardIcon />,
    component: <AdminDashboard />,
    rolesWithAccess: [AdminUserRoles.Onboarding],
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
    rolesWithAccess: [AdminUserRoles.Onboarding],
    willChildLinkShow: true,
    children: [
      {
        name: 'Merchant Requests',
        path: `merchants/*`,
        component: <MerchantRequestsRoutes />,
      },
      {
        name: 'Mandate Requests',
        path: 'mandates/*',
        component: <MandateRequestsRoutes />,
      },
      {
        name: 'Profile Requests',
        path: 'profiles/*',
        component: <ProfileRequestsRoutes />,
      },
      {
        name: 'Account Requests',
        path: 'accounts/*',
        component: <AccountRequestsRoutes />,
      },
    ],
  },
  {
    name: 'Merchant Management',
    layout: `/${BASE_ROUTES.ADMIN}`,
    path: 'merchant-management',
    icon: <MerchantIcon />,
    component: <AdminMerchantManagement />,
    rolesWithAccess: [AdminUserRoles.Onboarding],
    willChildLinkShow: false,
    children: [
      {
        name: 'Merchant Details',
        path: 'merchant-details/*',
        component: <MerchantDetailsRoutes />,
      },
      {
        name: 'Onboard Merchant',
        path: 'onboard-merchant',
        component: <CreateMerchant />,
      },
      {
        name: 'Edit Merchant',
        path: 'edit-merchant',
        component: <EditMerchant />,
      },
    ],
  },
  {
    name: 'Mandate Management',
    layout: `/${BASE_ROUTES.ADMIN}`,
    path: 'mandate-management',
    icon: <MandateIcon />,
    component: <AdminMandateManagement />,
    rolesWithAccess: [AdminUserRoles.Onboarding],
    willChildLinkShow: false,
    children: [
      {
        name: 'Mandate Details',
        path: 'mandate-details',
        component: <AdminMandateDetails />,
      },

      {
        name: 'Create Mandate',
        path: 'create-mandate',
        component: <AdminCreateMandate />,
      },
    ],
  },
  {
    name: 'Profile Management',
    layout: `/${BASE_ROUTES.ADMIN}`,
    path: 'profile-management',
    icon: <ProfileIcon />,
    component: <AdminProfileManagement />,
    rolesWithAccess: [AdminUserRoles.Onboarding],
    willChildLinkShow: false,
    children: [
      {
        name: 'Profile Details',
        path: 'profile-details',
        component: <AdminProfileDetails />,
      },
      {
        name: 'Create Profile',
        path: 'create-profile',
        component: <AdminCreateProfile />,
      },
      {
        name: 'Edit Profile',
        path: 'edit-profile',
        component: <AdminEditProfile />,
      },
    ],
  },
  {
    name: 'Account Management',
    layout: `/${BASE_ROUTES.ADMIN}`,
    path: 'account-management',
    icon: <AccountIcon />,
    component: <AdminAccountManagement />,
    rolesWithAccess: [AdminUserRoles.Onboarding],
    willChildLinkShow: false,
    children: [
      {
        name: 'Account Details',
        path: 'account-details/*',
        component: <AccountDetailsRoutes />,
      },
      {
        name: 'Create Account',
        path: 'create-account',
        component: <AdminCreateAccount />,
      },
      {
        name: 'Edit Account',
        path: 'edit-account',
        component: <AdminEditAccount />,
      },
    ],
  },
  {
    name: 'Audit Trail',
    layout: `/${BASE_ROUTES.ADMIN}`,
    path: 'audit-trail',
    icon: <AuditIcon />,
    component: <AdminAuditTrail />,
    rolesWithAccess: [AdminUserRoles.Audit],
    willChildLinkShow: false,
  },
  {
    name: 'Reports',
    layout: `/${BASE_ROUTES.ADMIN}`,
    path: 'reports',
    icon: <ReportIcon />,
    component: <AdminReports />,
    rolesWithAccess: [AdminUserRoles.Reporting],
    willChildLinkShow: false,
  },
  {
    name: 'Staff User Management',
    layout: `/${BASE_ROUTES.ADMIN}`,
    path: 'staff-user-management',
    icon: <UserIcon />,
    component: <StaffUserManagement />,
    rolesWithAccess: [AdminUserRoles.Admin],
    willChildLinkShow: false,
    children: [
      {
        name: 'Staff User Details',
        path: 'staff-user-details',
        component: <AdminStaffUserDetails />,
      },
      {
        name: 'Create Staff User',
        path: 'create-staff-user',
        component: <AdminAddUser />,
      },
      {
        name: 'Create Bulk Staff Users',
        path: 'create-bulk-staff-users',
        component: <AdminAddBulkUsers />,
      },
      {
        name: 'Edit Staff User',
        path: 'edit-staff-user',
        component: <AdminEditUser />,
      },
    ],
  },
  {
    name: 'User Requests',
    layout: `/${BASE_ROUTES.ADMIN}`,
    path: 'staff-user-requests',
    icon: <UserRequestsIcon />,
    component: <StaffUserRequests />,
    rolesWithAccess: [AdminUserRoles.Admin],
    willChildLinkShow: false,
    children: [
      {
        name: 'Creation Request Details',
        path: 'creation-request-details',
        component: <StaffUserCreationRequestDetails />,
      },
      {
        name: 'Deletion Request Details',
        path: 'deletion-request-details',
        component: <StaffUserDeletionRequestDetails />,
      },
      {
        name: 'Update Request Details',
        path: 'update-request-details',
        component: <StaffUserUpdateRequestDetails />,
      },
      {
        name: 'Enable Request Details',
        path: 'enable-request-details',
        component: <StaffUserEnableRequestDetails />,
      },
      {
        name: 'Disable Request Details',
        path: 'disable-request-details',
        component: <StaffUserDisableRequestDetails />,
      },
    ],
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
    path: 'requests',
    icon: <RequestIcon />,
    component: <MerchantRequests />,
    rolesWithAccess: [UserLoginRoles.Merchant],
    willChildLinkShow: false,
    children: [
      {
        name: 'Create Request Details',
        path: 'mandates/creation-request-details/:id',
        component: <CreationRequestDetails />,
      },
      {
        name: 'Update Request Details',
        path: 'mandates/update-request-details/:id',
        component: <UpdateRequestDetails />,
      },
      {
        name: 'Disable Request Details',
        path: 'mandates/disable-request-details/:id',
        component: <DisableRequestDetails />,
      },
      {
        name: 'Deletion Request Details',
        path: 'mandates/deletion-request-details/:id',
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
    children: [
      {
        name: 'Mandate Details',
        path: 'mandate-details/:id',
        component: <MandateDetails />,
      },
      {
        name: 'Create Mandate',
        path: 'create-mandate',
        component: <CreateMandate />,
      },
    ],
  },
  {
    name: 'User Management',
    layout: `/${BASE_ROUTES.MERCHANT}`,
    path: 'user-management',
    icon: <ProfileIcon />,
    component: <MerchantUserManagement />,
    rolesWithAccess: [UserLoginRoles.Merchant],
    willChildLinkShow: false,
    children: [
      {
        name: 'User Details',
        path: 'user-details/:id',
        component: <UserDetails />,
      },
    ],
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
