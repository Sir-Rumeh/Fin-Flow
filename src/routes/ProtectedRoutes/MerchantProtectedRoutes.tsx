import { Navigate } from 'react-router-dom';
import { UserLoginRoles } from 'utils/enums';
import { getUserFromLocalStorage, isAdminAuthData, isMerchantAuthData } from 'utils/helpers';
import { AdminAuthData, MerchantAuthData } from 'utils/interfaces';

interface MerchantProtectedRouteProps {
  children: JSX.Element;
}

const MerchantProtectedRoute: React.FC<MerchantProtectedRouteProps> = ({ children }) => {
  const user = getUserFromLocalStorage();
  const getUserType = (user: AdminAuthData | MerchantAuthData) => {
    if (isAdminAuthData(user)) {
      return UserLoginRoles.Admin;
    } else if (isMerchantAuthData(user)) {
      return UserLoginRoles.Merchant;
    }
    return '';
  };
  return user && getUserType(user) === UserLoginRoles.Merchant ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
};

export default MerchantProtectedRoute;
