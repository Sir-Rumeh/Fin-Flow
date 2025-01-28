import { Route, Routes } from 'react-router-dom';
import { appRoutes } from 'utils/constants/routes';
import AdminRoutes from 'routes/AdminRoutes';
import LoginPage from 'pages/Auth/Login';
import AdminLogin from 'pages/Auth/AdminLogin';
import MerchantLogin from 'pages/Auth/MerchantLogin';
import MerchantRoutes from 'routes/MerchantRoutes';
import OTP from 'pages/Auth/OTP';
import AdminProtectedRoute from 'routes/ProtectedRoutes/AdminProtectedRoutes';
import MerchantProtectedRoute from './ProtectedRoutes/MerchantProtectedRoutes';
import ResetPassword from 'pages/Auth/ResetPassword';
import ResetForgottenPassword from 'pages/Auth/ResetForgottenPassword';
import ChangePassword from 'pages/Auth/ChangePassword';
import ForgottenPasswordOtp from 'pages/Auth/ForgottenPasswordOtp';
import ResetPasswordOtp from 'pages/Auth/ResetPasswordOtp';

export default function Routing() {
  return (
    <Routes>
      <Route path={appRoutes.login} element={<LoginPage />} />
      <Route path={`${appRoutes.adminLogin}`} element={<AdminLogin />} />
      <Route path={`${appRoutes.adminLoginOTP}`} element={<OTP />} />
      <Route path={`${appRoutes.merchantLogin}`} element={<MerchantLogin />} />
      <Route path={`${appRoutes.merchantLoginOTP}`} element={<OTP />} />
      {/*  */}
      <Route
        path={`${appRoutes.merchantLogin}/${appRoutes.resetPassword}`}
        element={<ResetPassword />}
      />
      <Route
        path={`${appRoutes.merchantLogin}/${appRoutes.resetForgottenPassword}`}
        element={<ResetForgottenPassword />}
      />
      <Route
        path={`${appRoutes.merchantLogin}/${appRoutes.changePassword}`}
        element={<ChangePassword />}
      />
      <Route
        path={`${appRoutes.merchantLogin}/${appRoutes.changePasswordOtp}`}
        element={<ForgottenPasswordOtp />}
      />
      <Route
        path={`${appRoutes.merchantLogin}/${appRoutes.resetPasswordOtp}`}
        element={<ResetPasswordOtp />}
      />
      <Route
        path={`${appRoutes.adminDashboard.dashboard.index}/*`}
        element={
          <AdminProtectedRoute>
            <AdminRoutes />
          </AdminProtectedRoute>
        }
      />
      <Route
        path={`${appRoutes.merchantDashboard.dashboard.index}/*`}
        element={
          <MerchantProtectedRoute>
            <MerchantRoutes />
          </MerchantProtectedRoute>
        }
      />
    </Routes>
  );
}
