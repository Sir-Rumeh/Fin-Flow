import NotificationIcon from 'assets/icons/NotificationIcon';
import dayjs from 'dayjs';
import LocalizedTime from 'dayjs/plugin/localizedFormat';
import Hamburger from 'assets/icons/Hamburger';
import {
  capitalize,
  getUserFromLocalStorage,
  isAdminAuthData,
  isMerchantAuthData,
} from 'utils/helpers';
import { useEffect, useState } from 'react';

const Navbar = (props: { onOpenSidenav: () => void }) => {
  dayjs.extend(LocalizedTime);

  const { onOpenSidenav } = props;
  const user = getUserFromLocalStorage();

  const [username, setUsername] = useState('');
  useEffect(() => {
    if (isAdminAuthData(user)) {
      const { userData } = user;
      setUsername(`${userData.firstName} ${userData.lastName}`);
    } else if (isMerchantAuthData(user)) {
      const { profileData } = user;
      setUsername(`${profileData.firstName} ${profileData.lastName}`);
    }
  }, []);

  return (
    <header className="shadow-bottom z-40 bg-white px-2 py-3 xl:px-3">
      <div className="container mx-auto flex h-full items-center justify-between text-blackPrimary">
        <span
          className="flex cursor-pointer items-center text-xl text-blackInput xl:hidden"
          onClick={onOpenSidenav}
        >
          <Hamburger className="" />
        </span>
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start justify-between text-sm font-semibold">
            <p className="text-lightPurple">{`${username}`}</p>

            <p className="hidden flex-1 justify-start text-[#78350F] md:flex lg:mr-32">
              {dayjs()
                .format('LLLL')
                .replace(/\d{1,2}:\d{1,2}(\s)?.*/gm, '')}{' '}
              | {dayjs().format('hh:mm:ss A')}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start justify-between text-sm font-semibold">
            <p className="flex flex-1 justify-start md:flex">User Role</p>
            <p className="flex flex-1 justify-start text-[#78350F] md:flex">
              {user?.roleName && capitalize(user?.roleName)}
            </p>
          </div>
        </div>

        {/* <div className="flex flex-shrink-0 items-center space-x-6">
          <div className="flex h-full justify-start bg-green-400">
            <p className="flex flex-1 justify-start text-[#78350F] md:flex">{user?.roleName}</p>
            <div className="relative flex items-center justify-center p-1">
              <NotificationIcon />
              <span className="absolute -right-2 -top-2 hidden w-8 scale-75 rounded-3xl bg-lightRed p-1 text-center font-semibold text-red-400">
                50
              </span>
            </div>
          </div>
        </div> */}
      </div>
    </header>
  );
};

export default Navbar;
