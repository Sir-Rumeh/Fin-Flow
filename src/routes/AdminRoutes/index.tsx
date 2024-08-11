import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboardLayout from "layouts/AdminLayout";
import { adminRoutes } from "routes/appRoutes";

function AdminRoutes() {
	const getAdminRoutes = (adminRoutes: RoutesType[]) => {
		return adminRoutes.map((route) => {
			if (route.layout === "/admin") {
				if (route.hasChildren) {
					return (
						<Route>
							{route.children?.map((child) => {
								return (
									<Route
										path={`/${route.path}/${child.path}`}
										element={child.component}
										key={route.layout + route.path + child.path}
									/>
								);
							})}
						</Route>
					);
				} else {
					return (
						<Route
							path={`/${route.path}`}
							element={route.component}
							key={route.layout + route.path}
						/>
					);
				}
			} else {
				return null;
			}
		});
	};
	return (
		<Routes>
			<Route element={<AdminDashboardLayout />}>
				<Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
				{getAdminRoutes(adminRoutes)}
			</Route>
		</Routes>
	);
}
export default AdminRoutes;
