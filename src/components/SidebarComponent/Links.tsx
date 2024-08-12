/* eslint-disable */
import { Link, useLocation } from "react-router-dom";
import DashIcon from "assets/icons/DashIcon";
import { useEffect, useState } from "react";

const NestedLink = ({ route }: { route: RoutesType }) => {
	const [isChildrenOpen, setIsChildrenOpen] = useState(false);

	const activeRoute = (routeName: string) => {
		return location.pathname.includes(routeName);
	};
	const isParentRouteActive = activeRoute(route.path);

	useEffect(() => {
		if (!location.pathname.includes(route.path)) {
			setIsChildrenOpen(false);
		}
	}, [location.pathname]);

	return (
		<>
			<Link
				key={route.layout + route.path}
				to={route.layout + "/" + route.path}
				onClick={() => {
					setIsChildrenOpen(!isChildrenOpen);
				}}
				className={`${isParentRouteActive && !isChildrenOpen ? "mb-3" : ""} ${
					isParentRouteActive
						? "relative px-2 py-4 flex hover:cursor-pointer bg-[linear-gradient(89.92deg,_#60088C_0.07%,_#A11E90_92.22%)]"
						: "relative mb-3 px-2 py-4 flex hover:cursor-pointer"
				}`}
			>
				<div className="w-full">
					<div className="my-[3px] flex cursor-pointer items-center justify-between px-5">
						<div className="flex items-center">
							<span
								className={`${
									isParentRouteActive ? "font-bold text-white" : "font-medium text-white"
								}`}
							>
								{route.icon ? route.icon : <DashIcon />}{" "}
							</span>
							<p
								className={`leading-1 ml-4 flex ${
									isParentRouteActive ? "font-bold text-white" : "font-medium text-white"
								}`}
							>
								{route.name}
							</p>
						</div>
						<div className="flex items-center">
							<span
								className={`${
									isParentRouteActive ? "font-bold text-white" : "font-medium text-white"
								}`}
							>
								<DashIcon />
							</span>
						</div>
					</div>
					{isParentRouteActive ? (
						<div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-purpleGradient" />
					) : null}
				</div>
			</Link>
			{isChildrenOpen && isParentRouteActive && (
				<div className="p-1 mb-3">
					<div className="pt-4 bg-purpleSecondary pb-8 px-6 mb-3 flex flex-col justify-center items-start gap-y-2">
						{route.children?.map((childRoute: any) => {
							const isChildRouteActive = activeRoute(childRoute.path);

							return (
								<Link
									key={childRoute.path}
									to={route.layout + "/" + route.path + "/" + childRoute.path}
									className={`${
										isChildRouteActive ? "bg-yellowPrimary text-black" : "text-white"
									} w-full p-3 pl-6 hover:bg-yellowPrimary hover:text-black rounded-md`}
								>
									{childRoute.name}
								</Link>
							);
						})}
					</div>
				</div>
			)}
		</>
	);
};

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
				if (route.children && route.children.length > 0) {
					return (
						<>
							<NestedLink route={route} />
						</>
					);
				} else {
					return (
						<Link key={route.layout + route.path} to={route.layout + "/" + route.path}>
							<div
								className={`${
									isRouteActive
										? "relative mb-3 px-2 py-4 flex hover:cursor-pointer bg-[linear-gradient(89.92deg,_#60088C_0.07%,_#A11E90_92.22%)]"
										: "relative mb-3 px-2 py-4 flex hover:cursor-pointer"
								}`}
							>
								<li className="my-[3px] flex cursor-pointer items-center px-5">
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
			}
		});
	};

	return <>{createLinks(routes)}</>;
};

export default SidebarLinks;
