import { Navigate } from 'react-router-dom';
import { UserLoginRoles } from 'utils/enums';
import { getUserFromLocalStorage, isAdminAuthData, isMerchantAuthData } from 'utils/helpers';
import { AdminAuthData, MerchantAuthData } from 'utils/interfaces';

interface AdminProtectedRouteProps {
  children: JSX.Element;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const user = getUserFromLocalStorage();
  const getUserType = (user: AdminAuthData | MerchantAuthData) => {
    if (isAdminAuthData(user)) {
      return UserLoginRoles.Admin;
    } else if (isMerchantAuthData(user)) {
      return UserLoginRoles.Merchant;
    }
    return '';
  };
  return user && getUserType(user) === UserLoginRoles.Admin ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
};

export default AdminProtectedRoute;
