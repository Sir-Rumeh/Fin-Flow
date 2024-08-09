/* eslint-disable */
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as DashIcon } from "assets/icons/DashIcon.svg";

export const SidebarLinks = (props: { routes: RoutesType[] }): JSX.Element => {
	// Chakra color mode
	let location = useLocation();

	const { routes } = props;

	// verifies if routeName is the one active (in browser input)
	const activeRoute = (routeName: string) => {
		return location.pathname.includes(routeName);
	};

	const createLinks = (routes: RoutesType[]) => {
		return routes.map((route) => {
			const isRouteValid = route.layout === "/admin" || route.layout === "/merchant";
			const isRouteActive = activeRoute(route.path);

			if (isRouteValid) {
				return (
					<Link key={route.layout + route.path} to={route.layout + "/" + route.path}>
						<div
							className={`${
								isRouteActive
									? "relative mb-3 px-2 py-4 flex hover:cursor-pointer bg-[linear-gradient(89.92deg,_#60088C_0.07%,_#A11E90_92.22%)]"
									: "relative mb-3 px-2 py-4 flex hover:cursor-pointer"
							}`}
						>
							<li className="my-[3px] flex cursor-pointer items-center px-8">
								<span
									className={`${
										isRouteActive ? "font-bold text-white" : "font-medium text-white"
									}`}
								>
									{route.icon ? route.icon : <DashIcon />}{" "}
								</span>
								<p
									className={`leading-1 ml-4 flex ${
										isRouteActive ? "font-bold text-white" : "font-medium text-white"
									}`}
								>
									{route.name}
								</p>
							</li>
							{isRouteActive ? (
								<div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-purpleGradient" />
							) : null}
						</div>
					</Link>
				);
			}
		});
	};

	return <>{createLinks(routes)}</>;
};

export default SidebarLinks;
