import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { TabContextProvider } from './context/TabContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="font-Gotham">
      <TabContextProvider>
        <App />
      </TabContextProvider>
    </div>
  </StrictMode>,
);
