import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "components/NavigationBar";
import AdminSidebar from "components/SidebarComponent";
import { adminRoutes } from "routes/appRoutes";

export default function AdminLayout() {
	const [open, setOpen] = useState(true);

	useEffect(() => {
		window.addEventListener("resize", () => (window.innerWidth < 1200 ? setOpen(false) : setOpen(true)));

		return () => {
			window.removeEventListener("resize", () => (window.innerWidth < 1200 ? setOpen(false) : setOpen(true)));
		};
	}, []);

	const getAdminRoutes = (adminRoutes: RoutesType[]) => {
		return adminRoutes.map((prop) => {
			if (prop.layout === "/admin") {
				return <Route path={`/${prop.path}`} element={prop.component} key={prop.layout + prop.path} />;
			} else {
				return null;
			}
		});
	};

	// const { userRole } = useAppSelector((state) => state.auth);
	const userRole = "Admin";

	return (
		<div className="flex h-screen w-full font-circular-std overflow-hidden">
			<AdminSidebar open={open} onClose={() => setOpen(false)} userRole={userRole} />
			{/* Navbar & Main Content */}
			<div className="w-full bg-backgroundColor dark:!bg-navy-900 overflow-y-scroll">
				{/* Main Content */}
				<main className={`mx-[12px] flex-none transition-all md:pr-2 xl:ml-[313px]`}>
					{/* Routes */}
					<div className="">
						<Navbar onOpenSidenav={() => setOpen(true)} />
						<div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
							<Routes>
								{getAdminRoutes(adminRoutes)}
								<Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
							</Routes>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
