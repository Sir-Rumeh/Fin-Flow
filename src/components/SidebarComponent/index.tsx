import { HiX } from "react-icons/hi";
import Links from "./Links";
import { adminRoutes, merchantRoutes } from "routes/appRoutes";
import FcmbIcon from "assets/icons//FcmbIcon";
import SignoutIcon from "assets/icons/SignoutIcon";
import { Roles } from "utils/enums";

const Sidebar = (props: { open: boolean; onClose: React.MouseEventHandler<HTMLSpanElement>; userRole: string }) => {
	const { open, onClose, userRole } = props;

	// const navigate = useNavigate();
	// const dispatch = useAppDispatch();

	return (
		<div
			className={`sm:none font-circular-std lg:w-[20vw] duration-175 linear fixed !z-50 flex min-h-full flex-col bg-purplePrimary shadow-2xl shadow-white/5 transition-all md:!z-50 lg:!z-50 xl:!z-0 ${
				open ? "translate-x-0" : "-translate-x-96"
			}`}
		>
			<span
				className="text-white scale-[170%] absolute top-4 right-4 block cursor-pointer xl:hidden"
				onClick={onClose}
			>
				<HiX />
			</span>

			<div className={`mx-[25px] mt-[25px] flex items-center`}>
				<div className="w-full flex items-center pr-6">
					<FcmbIcon />
					<p className="pl-4 font-medium text-white text-base">DDI Portal</p>
				</div>
			</div>
			<div className="mt-[40px] mb-7 h-px" />
			{/* Nav item */}
			{/* <div className="flex flex-col items-center justify-between"> */}
			<ul className="mb-auto pt-1">
				{userRole === Roles.Admin && <Links routes={adminRoutes} />}
				{userRole === Roles.Merchant && <Links routes={merchantRoutes} />}
			</ul>
			<ul className="mt-auto pt-1 border-t border-gray-50 flex items-center justify-start">
				<div className="">
					<button className="relative px-2 mb-3 py-4 flex hover:cursor-pointer">
						<li className="my-[3px] flex cursor-pointer items-center justify-center px-5 w-full">
							<span className="font-medium text-white">
								<SignoutIcon />
							</span>
							<p className="font-medium md:font-lg text-[#DC2626] ml-4">Sign Out</p>
						</li>
					</button>
				</div>
			</ul>
			{/* </div> */}
		</div>
	);
};

export default Sidebar;
