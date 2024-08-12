import { FiAlignJustify } from "react-icons/fi";
import ProfileIcon from "assets/icons/ProfileIcon";
import dayjs from "dayjs";
import LocalizedTime from "dayjs/plugin/localizedFormat";

const Navbar = (props: { onOpenSidenav: () => void }) => {
	dayjs.extend(LocalizedTime);

	// const { userName } = useAppSelector((state:RootState) => state.auth);

	const { onOpenSidenav } = props;

	return (
		<header className="z-40 py-4 shadow-bottom ">
			<div className="container flex items-center justify-between h-full  mx-auto text-blackPrimary">
				<span
					className="flex items-center cursor-pointer text-xl xl:hidden text-blackInput"
					onClick={onOpenSidenav}
				>
					<FiAlignJustify className="h-5 w-5 text-blackSecondary" />
				</span>
				<div className="hidden md:flex justify-start flex-1 lg:mr-32 text-sm font-normal">
					{dayjs()
						.format("LLLL")
						.replace(/\d{1,2}:\d{1,2}(\s)?.*/gm, "")}
				</div>
				<div className="flex items-center flex-shrink-0 space-x-6">
					<div className="flex">
						<div className="flex justify-center items-center p-1 pr-6 bg-grayText">
							<ProfileIcon />
							<p className="font-normal text-sm text-blackPrimary pl-4">Firstname Lastname</p>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
