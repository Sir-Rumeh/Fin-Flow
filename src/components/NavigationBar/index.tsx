import { FiAlignJustify } from "react-icons/fi";
import { ReactComponent as ProfileIcon } from "assets/icons/ProfileIcon.svg";
import dayjs from "dayjs";
import LocalizedTime from "dayjs/plugin/localizedFormat";

const Navbar = (props: { onOpenSidenav: () => void }) => {
	dayjs.extend(LocalizedTime);

	// const { userName } = useAppSelector((state:RootState) => state.auth);

	const { onOpenSidenav } = props;

	return (
		<header className="z-40 py-4 bg-other-background shadow-bottom font-circular-std">
			<div className="container flex items-center justify-between h-full  mx-auto text-blackPrimary">
				<span className="flex cursor-pointer text-xl text-gray-600 xl:hidden" onClick={onOpenSidenav}>
					<FiAlignJustify className="h-5 w-5" />
				</span>
				<div className="hidden md:flex justify-start flex-1 lg:mr-32 text-sm font-normal">
					{/* Friday, 4 Oct, 2023 */}
					{dayjs()
						.format("LLLL")
						.replace(/\d{1,2}:\d{1,2}(\s)?.*/gm, "")}
				</div>
				<ul className="flex items-center flex-shrink-0 space-x-6">
					<li className="flex">
						<div className="justify-center flex items-center pr-6">
							<ProfileIcon />
							<p className="font-normal text-sm text-blackPrimary pl-4">Firstname Lastname</p>
							{/* <p className="font-normal text-sm text-blackPrimary pl-4">{userName}</p> */}
						</div>
					</li>
				</ul>
			</div>
		</header>
	);
};

export default Navbar;
