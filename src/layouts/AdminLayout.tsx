import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from 'components/NavigationBar';
import AdminSidebar from 'components/SidebarComponent';

export default function AdminLayout() {
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

  const userRole = 'Admin';

  return (
    <div className="font-circular-std flex h-screen w-full overflow-hidden">
      <AdminSidebar open={open} onClose={() => setOpen(false)} userRole={userRole} />
      <div className="dark:!bg-navy-900 w-full overflow-y-scroll bg-backgroundColor xl:ml-[20vw]">
        <main className={`flex-none transition-all`}>
          <div className="overflow-hidden">
            <Navbar onOpenSidenav={() => setOpen(true)} />
            <div className="mx-auto mb-auto min-h-[93vh] bg-backgroundColor md:p-2">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
