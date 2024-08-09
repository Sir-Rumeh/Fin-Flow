import { ReactComponent as DashboardIcon } from "assets/icons/DashboardIcon.svg";
import { ReactComponent as RequestIcon } from "assets/icons/RequestsIcon.svg";
import { ReactComponent as MerchantIcon } from "assets/icons/MerchantIcon.svg";
import { ReactComponent as MandateIcon } from "assets/icons/MandateIcon.svg";
import { ReactComponent as ProfileIcon } from "assets/icons/ProfileIcon.svg";
import { ReactComponent as AccountIcon } from "assets/icons/AccountIcon.svg";
import { ReactComponent as AuditIcon } from "assets/icons/AuditIcon.svg";
import { ReactComponent as ReportIcon } from "assets/icons/ReportIcon.svg";
import AdminDashboard from "pages/Admin/Dashboard";
import AdminRequests from "pages/Admin/Requests";
import AdminMerchantManagement from "pages/Admin/MerchantManagement";
import AdminMandateManagement from "pages/Admin/MandatetManagement";
import AdminProfileManagement from "pages/Admin/ProfileManagement";
import AdminAccountManagement from "pages/Admin/AccountManagement";
import AdminAuditTrail from "pages/Admin/AuditTrail";
import AdminReports from "pages/Admin/Reports";

import MerchantDashboard from "pages/Merchant/Dashboard";
import MerchantRequests from "pages/Merchant/Requests";
import MerchantMandateManagement from "pages/Merchant/MandatetManagement";
import MerchantUserManagement from "pages/Merchant/UserManagement";
import MerchantAuditTrail from "pages/Merchant/AuditTrail";
import MerchantReports from "pages/Merchant/Reports";

import { BASE_ROUTES } from "utils/constants/routes";

const adminRoutes = [
	{
		name: "Dashboard",
		layout: `/${BASE_ROUTES.ADMIN}`,
		path: "dashboard",
		icon: <DashboardIcon className="h-6 w-6" />,
		component: <AdminDashboard />,
	},
	{
		name: "Requests",
		layout: `/${BASE_ROUTES.ADMIN}`,
		path: "requests",
		icon: <RequestIcon className="h-6 w-6" />,
		component: <AdminRequests />,
		hasChildren: true,
		children: [
			{
				name: "Merchant Requests",
				path: "requests/merchants",
				component: <AdminRequests />,
			},
			{
				name: "Mandate Requests",
				path: "requests/mandates",
				component: <AdminRequests />,
			},
			{
				name: "Profile Requests",
				path: "requests/profiles",
				component: <AdminRequests />,
			},
			{
				name: "Account Requests",
				path: "requests/accounts",
				component: <AdminRequests />,
			},
		],
	},
	{
		name: "Merchant Management",
		layout: `/${BASE_ROUTES.ADMIN}`,
		path: "merchant-management",
		icon: <MerchantIcon className="h-6 w-6" />,
		component: <AdminMerchantManagement />,
	},
	{
		name: "Mandate Management",
		layout: `/${BASE_ROUTES.ADMIN}`,
		path: "mandate-management",
		icon: <MandateIcon className="h-6 w-6" />,
		component: <AdminMandateManagement />,
	},
	{
		name: "Profile Management",
		layout: `/${BASE_ROUTES.ADMIN}`,
		path: "mandate-management",
		icon: <ProfileIcon className="h-6 w-6" />,
		component: <AdminProfileManagement />,
	},
	{
		name: "Account Management",
		layout: `/${BASE_ROUTES.ADMIN}`,
		path: "account-management",
		icon: <AccountIcon className="h-6 w-6" />,
		component: <AdminAccountManagement />,
	},
	{
		name: "Audit Trail",
		layout: `/${BASE_ROUTES.ADMIN}`,
		path: "audit-trail",
		icon: <AuditIcon className="h-6 w-6" />,
		component: <AdminAuditTrail />,
	},
	{
		name: "Reports",
		layout: `/${BASE_ROUTES.ADMIN}`,
		path: "reports",
		icon: <ReportIcon className="h-6 w-6" />,
		component: <AdminReports />,
	},
];

const merchantRoutes = [
	{
		name: "Dashboard",
		layout: `/${BASE_ROUTES.MERCHANT}`,
		path: "dashboard",
		icon: <DashboardIcon className="h-6 w-6" />,
		component: <MerchantDashboard />,
	},
	{
		name: "Requests",
		layout: `/${BASE_ROUTES.MERCHANT}`,
		path: "requests",
		icon: <RequestIcon className="h-6 w-6" />,
		component: <MerchantRequests />,
	},
	{
		name: "Mandate Management",
		layout: `/${BASE_ROUTES.MERCHANT}`,
		path: "mandate-management",
		icon: <MandateIcon className="h-6 w-6" />,
		component: <MerchantMandateManagement />,
	},
	{
		name: "User Management",
		layout: `/${BASE_ROUTES.MERCHANT}`,
		path: "user-management",
		icon: <ProfileIcon className="h-6 w-6" />,
		component: <MerchantUserManagement />,
	},
	{
		name: "Audit Trail",
		layout: `/${BASE_ROUTES.MERCHANT}`,
		path: "audit-trail",
		icon: <AuditIcon className="h-6 w-6" />,
		component: <MerchantAuditTrail />,
	},
	{
		name: "Reports",
		layout: `/${BASE_ROUTES.MERCHANT}`,
		path: "reports",
		icon: <ReportIcon className="h-6 w-6" />,
		component: <MerchantReports />,
	},
];

export { adminRoutes, merchantRoutes };
