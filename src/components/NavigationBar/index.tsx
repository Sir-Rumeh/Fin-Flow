import { FiAlignJustify } from 'react-icons/fi';
import NotificationIcon from 'assets/icons/NotificationIcon';
import dayjs from 'dayjs';
import LocalizedTime from 'dayjs/plugin/localizedFormat';

const Navbar = (props: { onOpenSidenav: () => void }) => {
  dayjs.extend(LocalizedTime);

  const { onOpenSidenav } = props;

  return (
    <header className="shadow-bottom z-40 bg-white py-3 pl-8 pr-4">
      <div className="container mx-auto flex h-full items-center justify-between text-blackPrimary">
        <span
          className="flex cursor-pointer items-center text-xl text-blackInput xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5 text-blackSecondary" />
        </span>
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start text-lg font-semibold">
            <p className="text-lightPurple">First name, Last Name (1209)</p>

            <p className="hidden flex-1 justify-start text-[#78350F] md:flex lg:mr-32">
              {dayjs()
                .format('LLLL')
                .replace(/\d{1,2}:\d{1,2}(\s)?.*/gm, '')}
            </p>
          </div>
        </div>

        <div className="flex flex-shrink-0 items-center space-x-6">
          <div className="flex">
            <div className="relative flex items-center justify-center p-1">
              <NotificationIcon />
              <span className="bg-lightRed absolute -right-2 -top-2 w-8 scale-75 rounded-3xl p-1 text-center font-semibold text-red-400">
                50
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
