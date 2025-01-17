import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from 'components/NavigationBar';
import AdminSidebar from 'components/SidebarComponent';
import { useIdleTimer } from 'react-idle-timer';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import { getUserFromLocalStorage, isAdminAuthData, isMerchantAuthData } from 'utils/helpers';
import { logoutMerchant, logoutStaff } from 'config/actions/authentication-actions';
import { AdminAuthData, MerchantAuthData } from 'utils/interfaces';
import { UserLoginRoles } from 'utils/enums';

export default function AdminLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [userRefreshToken, setUserRefreshToken] = useState('');
  const user = getUserFromLocalStorage();

  const [modals, setModals] = useState({
    isSessionTimedOut: false,
  });

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

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

  const onIdle = async () => {
    openModal('isSessionTimedOut');
  };

  useIdleTimer({
    timeout: 60_000 * 5,
    onIdle,
    debounce: 500,
  });

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
    if (user) {
      try {
        const isAdmin = isAdminAuthData(user);
        const isMerchant = isMerchantAuthData(user);
        isAdmin
          ? await logoutStaff({ email: userEmail, refreshToken: userRefreshToken })
          : isMerchant
            ? await logoutMerchant({ email: userEmail, refreshToken: userRefreshToken })
            : null;
        localStorage.clear();
        navigate('/');
      } catch (error) {
        localStorage.clear();
        navigate('/');
        console.error(error);
      }
    } else {
      localStorage.clear();
      navigate('/');
    }
  };

  return (
    <>
      <div className="font-circular-std flex h-screen w-full overflow-hidden">
        <AdminSidebar open={open} onClose={() => setOpen(false)} userRole={UserLoginRoles.Admin} />
        <div className="dark:!bg-navy-900 w-full overflow-y-scroll bg-backgroundColor xl:ml-[20vw]">
          <main className={`flex-none transition-all`}>
            <div className="overflow-hidden">
              <Navbar onOpenSidenav={() => setOpen(true)} />
              <div className="no-scrollbar mx-auto mb-auto h-[90vh] overflow-y-scroll bg-backgroundColor md:p-2">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
      {modals.isSessionTimedOut && (
        <ModalWrapper
          isOpen={modals.isSessionTimedOut}
          setIsOpen={() => closeModal('isSessionTimedOut')}
          title={'Session Timeout'}
          info={'Your session has expired.'}
          icon={<RedAlertIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('isSessionTimedOut');
            logoutUser();
          }}
        />
      )}
    </>
  );
}
