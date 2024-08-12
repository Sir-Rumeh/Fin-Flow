import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { appRoutes } from 'utils/constants/routes';
import AdminRoutes from 'routes/AdminRoutes';
import LoginPage from 'pages/Auth/Login';
import AdminLogin from 'pages/Auth/AdminLogin';
import MerchantLogin from 'pages/Auth/MerchantLogin';
import MerchantRoutes from 'routes/MerchantRoutes';

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={appRoutes.login} element={<LoginPage />} />
        <Route path={`${appRoutes.adminLogin}`} element={<AdminLogin />} />
        <Route path={`${appRoutes.merchantLogin}`} element={<MerchantLogin />} />
        <Route path={`${appRoutes.adminDashboard.index}/*`} element={<AdminRoutes />} />
        <Route path={`${appRoutes.merchantDashboard.index}/*`} element={<MerchantRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}
