import { lazy, Suspense } from 'react';
import LoadingIndicator from 'components/common/LoadingIndicator';
import { ThemeProvider } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'assets/fonts/Gotham.css';
import { createTheme } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAppSelector } from './store';
const ApplicationRoutes = lazy(() => import('./routes'));

function App() {
  const { isLoading } = useAppSelector((state) => state.loading);
  const queryClient = new QueryClient();
  const theme = createTheme({
    typography: {
      fontFamily: '"Gotham", sans-serif',
    },
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
