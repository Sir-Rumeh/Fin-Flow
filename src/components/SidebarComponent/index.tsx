/* eslint-disable */
import { HiX } from "react-icons/hi";
import Links from "./Links";
import { adminRoutes, merchantRoutes } from "routes/appRoutes";
import { ReactComponent as FcmbIcon } from "assets/icons/FcmbIcon.svg";
import { ReactComponent as SignoutIcon } from "assets/icons/SignoutIcon.svg";
import { Role } from "utils/enums";

const Sidebar = (props: { open: boolean; onClose: React.MouseEventHandler<HTMLSpanElement>; userRole: string }) => {
	const { open, onClose, userRole } = props;

	// const navigate = useNavigate();
	// const dispatch = useAppDispatch();

	return (
		<div
			className={`sm:none font-circular-std lg:w-72 duration-175 linear fixed !z-50 flex min-h-full flex-col bg-purplePrimary pb-10 shadow-2xl shadow-white/5 transition-all md:!z-50 lg:!z-50 xl:!z-0 ${
				open ? "translate-x-0" : "-translate-x-96"
			}`}
		>
			<span
				className="text-white scale-[170%] absolute top-4 right-4 block cursor-pointer xl:hidden"
				onClick={onClose}
			>
				<HiX />
			</span>

			<div className={`mx-[45px] mt-[45px] flex items-center`}>
				<div className="w-full flex items-center pr-6">
					<FcmbIcon />
					<p className="pl-4 font-medium text-white text-base">
						DDI <span className="flex">Fixed Deposit</span>
					</p>
				</div>
			</div>
			<div className="mt-[40px] mb-7 h-px" />
			{/* Nav item */}

			<ul className="mb-auto pt-1">
				{userRole === Role.Admin && <Links routes={adminRoutes} />}
				{userRole === Role.Merchant && <Links routes={merchantRoutes} />}
			</ul>
			<ul className="mb-auto pt-1 mt-6 xl:mt-10">
				<button>
					<div className="relative mb-3 px-2 py-4 flex hover:cursor-pointer">
						<li className="my-[3px] flex cursor-pointer items-center px-8">
							<span className="font-medium text-white">
								<SignoutIcon />
							</span>
							<p className="font-medium text-[#DC2626] ml-4">Sign Out</p>
						</li>
					</div>
				</button>
			</ul>
		</div>
	);
};

export default Sidebar;
