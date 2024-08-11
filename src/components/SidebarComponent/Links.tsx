/* eslint-disable */
import { Link, useLocation } from "react-router-dom";
import DashIcon from "assets/icons/DashIcon";

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
				if (route.hasChildren) {
					return (
						// <Link key={route.layout + route.path} to={route.layout + "/" + route.path}></Link>
						<>
							<Link
								key={route.layout + route.path}
								// onClick={(e) => {
								// 	isRouteActive = true;
								// 	isChildrenOpen = !isChildrenOpen;
								// 	console.log("isChildrenOpen", isChildrenOpen);
								// }}
								to={route.layout + "/" + route.path}
								className={`${
									isRouteActive
										? "relative mb px-2 py-4 flex hover:cursor-pointer bg-[linear-gradient(89.92deg,_#60088C_0.07%,_#A11E90_92.22%)]"
										: "relative mb-3 px-2 py-4 flex hover:cursor-pointer"
								}`}
							>
								<div className="w-full">
									<div className="my-[3px] flex cursor-pointer items-center justify-between px-5">
										<div className="flex items-center">
											<span
												className={`${
													isRouteActive
														? "font-bold text-white"
														: "font-medium text-white"
												}`}
											>
												{route.icon ? route.icon : <DashIcon />}{" "}
											</span>
											<p
												className={`leading-1 ml-4 flex ${
													isRouteActive
														? "font-bold text-white"
														: "font-medium text-white"
												}`}
											>
												{route.name}
											</p>
										</div>
										<div className="flex items-center">
											<span
												className={`${
													isRouteActive
														? "font-bold text-white"
														: "font-medium text-white"
												}`}
											>
												<DashIcon />
											</span>
										</div>
									</div>
									{isRouteActive ? (
										<div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-purpleGradient" />
									) : null}
								</div>
							</Link>
							{isRouteActive && (
								<div className="p-1 mb-3">
									<div className="p-4 bg-purpleSecondary pb-8 pl-8 mb-3 flex flex-col justify-center items-start gap-y-2">
										{route.children?.map((childRoute) => {
											const isChildRouteActive = activeRoute(childRoute.path);

											return (
												<Link
													key={childRoute.path}
													to={
														route.layout +
														"/" +
														route.path +
														"/" +
														childRoute.path
													}
													className={`${
														isChildRouteActive
															? "bg-yellowPrimary text-black"
															: "text-white"
													} w-full  p-3 hover:bg-yellowPrimary hover:text-black rounded-md`}
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
