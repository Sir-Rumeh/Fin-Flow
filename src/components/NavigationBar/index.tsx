import { FiAlignJustify } from 'react-icons/fi';
import ProfileIcon from 'assets/icons/ProfileIcon';
import dayjs from 'dayjs';
import LocalizedTime from 'dayjs/plugin/localizedFormat';

const Navbar = (props: { onOpenSidenav: () => void }) => {
  dayjs.extend(LocalizedTime);

  const { onOpenSidenav } = props;

  return (
    <header className="shadow-bottom z-40 bg-white py-4 pl-8 pr-2">
      <div className="container mx-auto flex h-full items-center justify-between text-blackPrimary">
        <span
          className="flex cursor-pointer items-center text-xl text-blackInput xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5 text-blackSecondary" />
        </span>
        <div className="hidden flex-1 justify-start text-sm font-normal md:flex lg:mr-32">
          {dayjs()
            .format('LLLL')
            .replace(/\d{1,2}:\d{1,2}(\s)?.*/gm, '')}
        </div>
        <div className="flex flex-shrink-0 items-center space-x-6">
          <div className="flex">
            <div className="flex items-center justify-center bg-grayText p-1 pr-6">
              <ProfileIcon />
              <p className="pl-4 text-sm font-normal text-blackPrimary">Firstname Lastname</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
