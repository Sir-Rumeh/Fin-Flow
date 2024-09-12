import Links from './Links';
import { adminRoutes, merchantRoutes } from 'routes/appRoutes';
import FcmbIcon from 'assets/icons//FcmbIcon';
import SignoutIcon from 'assets/icons/SignoutIcon';
import { UserLoginRoles } from 'utils/enums';
import { useNavigate } from 'react-router-dom';
import { BASE_ROUTES } from 'utils/constants/routes';
import WhiteClose from 'assets/icons/WhiteClose';

const Sidebar = (props: {
  open: boolean;
  onClose: React.MouseEventHandler<HTMLSpanElement>;
  userRole: string;
}) => {
  const navigate = useNavigate();
  const { open, onClose, userRole } = props;
  return (
    <div
      className={`sm:none font-circular-std duration-175 linear fixed !z-50 flex min-h-full flex-col bg-purplePrimary shadow-2xl shadow-white/5 transition-all md:!z-50 md:w-[20vw] lg:!z-50 xl:!z-0 ${
        open ? 'translate-x-0' : '-translate-x-96'
      }`}
    >
      <span
        className="absolute right-4 top-4 block scale-[170%] cursor-pointer text-white xl:hidden"
        onClick={onClose}
      >
        <WhiteClose className="" />
      </span>
      <div className={`mt-[25px] flex w-full items-center px-5 2xl:px-8`}>
        <div className="flex w-full items-center pr-6">
          <FcmbIcon />
          <p className="pl-4 text-base font-medium text-white">Easy Pay</p>
        </div>
      </div>
      <div className="mb-7 mt-[10px]" />
      <ul className="no-scrollbar mb-auto h-[75vh] overflow-y-scroll pt-1">
        {userRole === UserLoginRoles.Admin && <Links routes={adminRoutes} />}
        {userRole === UserLoginRoles.Merchant && <Links routes={merchantRoutes} />}
      </ul>
      <div className="mt-auto flex h-full flex-col">
        <ul className="mt-auto flex items-center justify-start border-t border-gray-50 pt-1">
          <button
            className="relative mb-3 flex px-2 py-4 hover:cursor-pointer"
            onClick={() => {
              navigate(`${BASE_ROUTES.LOGIN}`);
            }}
          >
            <li className="my-[3px] flex w-full cursor-pointer items-center justify-center px-5">
              <span className="font-medium text-white">
                <SignoutIcon />
              </span>
              <p className="md:font-lg ml-4 text-[#DC2626] 3xl:text-lg">Sign Out</p>
            </li>
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
