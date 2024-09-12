import { lazy, Suspense } from 'react';
import LoadingIndicator from 'components/common/LoadingIndicator';
import { ThemeProvider } from '@mui/system';
import { theme } from './theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'assets/fonts/Gotham.css';
const ApplicationRoutes = lazy(() => import('./routes'));

function App() {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <ApplicationRoutes />
        </ThemeProvider>
      </LocalizationProvider>
    </Suspense>
  );
}

export default App;
