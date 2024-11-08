import Links from './Links';
import { adminRoutes, merchantRoutes } from 'routes/appRoutes';
import FcmbIcon from 'assets/icons//FcmbIcon';
import SignoutIcon from 'assets/icons/SignoutIcon';
import { UserLoginRoles } from 'utils/enums';
import { useNavigate } from 'react-router-dom';
import WhiteClose from 'assets/icons/WhiteClose';
import { useEffect, useRef, useState } from 'react';
import { getUserFromLocalStorage, isAdminAuthData, isMerchantAuthData } from 'utils/helpers';
import { logoutMerchant, logoutStaff } from 'config/actions/authentication-actions';
import { AdminAuthData, MerchantAuthData } from 'utils/interfaces';

const Sidebar = (props: { open: boolean; onClose: any; userRole: string }) => {
  const navigate = useNavigate();
  const { open, onClose, userRole } = props;
  const [userEmail, setUserEmail] = useState('');
  const [userRefreshToken, setUserRefreshToken] = useState('');

  const user = getUserFromLocalStorage();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        window.innerWidth < 1200 && onClose(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarRef]);

  const getUserEmail = (user: AdminAuthData | MerchantAuthData) => {
    if (isAdminAuthData(user)) {
      return user.userData.email;
    } else if (isMerchantAuthData(user)) {
      return user.profileData.email;
    }
    return '';
  };

  useEffect(() => {
    if (user) {
      setUserRefreshToken(user.refreshToken);
      setUserEmail(getUserEmail(user));
    }
  }, [user]);

  const logoutUser = async () => {
    if (user && userEmail && userRefreshToken) {
      try {
        const isAdmin = isAdminAuthData(user);
        const isMerchant = isMerchantAuthData(user);
        const logoutResponse = isAdmin
          ? await logoutStaff({ email: userEmail, refreshToken: userRefreshToken })
          : isMerchant
            ? await logoutMerchant({ email: userEmail, refreshToken: userRefreshToken })
            : null;

        if (logoutResponse && logoutResponse.responseCode === 200) {
          navigate('/');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div
      ref={sidebarRef}
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
        {userRole === UserLoginRoles.Admin && <Links routes={adminRoutes} closeSidebar={onClose} />}
        {userRole === UserLoginRoles.Merchant && (
          <Links routes={merchantRoutes} closeSidebar={onClose} />
        )}
      </ul>
      <div className="mt-auto flex h-full flex-col">
        <ul className="mt-auto flex items-center justify-start border-t border-gray-50 pt-1">
          <button
            className="relative mb-3 flex px-2 py-4 hover:cursor-pointer"
            onClick={() => logoutUser()}
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
