import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from 'components/NavigationBar';
import MerchantSidebar from 'components/SidebarComponent';

export default function MerchantLayout() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    window.addEventListener('resize', () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true),
    );
    return () => {
      window.removeEventListener('resize', () =>
        window.innerWidth < 1200 ? setOpen(false) : setOpen(true),
      );
    };
  }, []);

  const userRole = 'Merchant';

  return (
    <div className="font-circular-std flex h-screen w-full overflow-hidden">
      <MerchantSidebar open={open} onClose={() => setOpen(false)} userRole={userRole} />
      <div className="dark:!bg-navy-900 w-full overflow-y-scroll bg-backgroundColor xl:ml-[20vw]">
        <main className={`flex-none transition-all`}>
          <div className="">
            <Navbar onOpenSidenav={() => setOpen(true)} />
            <div className="no-scrollbar mx-auto mb-auto h-[90vh] bg-backgroundColor md:p-2">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
