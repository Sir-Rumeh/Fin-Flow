import { HiX } from 'react-icons/hi';
import Links from './Links';
import { adminRoutes, merchantRoutes } from 'routes/appRoutes';
import FcmbIcon from 'assets/icons//FcmbIcon';
import SignoutIcon from 'assets/icons/SignoutIcon';
import { Roles } from 'utils/enums';

const Sidebar = (props: {
  open: boolean;
  onClose: React.MouseEventHandler<HTMLSpanElement>;
  userRole: string;
}) => {
  const { open, onClose, userRole } = props;
  return (
    <div
      className={`sm:none font-circular-std duration-175 linear fixed !z-50 flex min-h-full flex-col bg-purplePrimary shadow-2xl shadow-white/5 transition-all md:!z-50 lg:!z-50 lg:w-[20vw] xl:!z-0 ${
        open ? 'translate-x-0' : '-translate-x-96'
      }`}
    >
      <span
        className="absolute right-4 top-4 block scale-[170%] cursor-pointer text-white xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>
      <div className={`mx-[25px] mt-[25px] flex items-center`}>
        <div className="flex w-full items-center pr-6">
          <FcmbIcon />
          <p className="pl-4 text-base font-medium text-white">DDI Portal</p>
        </div>
      </div>
      <div className="mb-7 mt-[40px] h-px" />
      <ul className="no-scrollbar mb-auto h-[70vh] overflow-y-scroll pt-1">
        {userRole === Roles.Admin && <Links routes={adminRoutes} />}
        {userRole === Roles.Merchant && <Links routes={merchantRoutes} />}
      </ul>
      <div className="mt-auto flex h-full flex-col">
        <ul className="mt-auto flex items-center justify-start border-t border-gray-50 pt-1">
          <div className="">
            <button className="relative mb-3 flex px-2 py-4 hover:cursor-pointer">
              <li className="my-[3px] flex w-full cursor-pointer items-center justify-center px-5">
                <span className="font-medium text-white">
                  <SignoutIcon />
                </span>
                <p className="md:font-lg ml-4 font-medium text-[#DC2626]">Sign Out</p>
              </li>
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
