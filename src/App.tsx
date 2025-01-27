import { lazy, Suspense, useEffect, useState } from 'react';
import LoadingIndicator from 'components/common/LoadingIndicator';
import { ThemeProvider } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'assets/fonts/Gotham.css';
import { createTheme } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAppSelector } from './store';
import { timeout, debounce } from 'utils/constants/index';
import { useIdleTimer } from 'react-idle-timer';
import { useNavigate } from 'react-router-dom';
import { getUserFromLocalStorage, isAdminAuthData, isMerchantAuthData } from 'utils/helpers';
import { AdminAuthData, MerchantAuthData } from 'utils/interfaces';
import { logoutMerchant, logoutStaff } from 'config/actions/authentication-actions';
const ApplicationRoutes = lazy(() => import('./routes'));

function App() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [userRefreshToken, setUserRefreshToken] = useState('');

  const user = getUserFromLocalStorage();

  const { isLoading } = useAppSelector((state) => state.loading);
  const queryClient = new QueryClient();
  const theme = createTheme({
    typography: {
      fontFamily: '"Gotham", sans-serif',
    },
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
    if (user && userEmail && userRefreshToken) {
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

  const handleOnIdle = async () => {
    await logoutUser();
  };

  useIdleTimer({
    timeout,
    onIdle: handleOnIdle,
    debounce,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LoadingIndicator />}>
        {isLoading && <LoadingIndicator />}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={theme}>
            <ApplicationRoutes />
          </ThemeProvider>
        </LocalizationProvider>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
