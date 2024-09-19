import { lazy, Suspense } from 'react';
import LoadingIndicator from 'components/common/LoadingIndicator';
import 'assets/fonts/Gotham.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const ApplicationRoutes = lazy(() => import('./routes'));

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LoadingIndicator />}>
        <ApplicationRoutes />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
