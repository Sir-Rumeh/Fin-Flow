import { Routes, Route, Navigate } from 'react-router-dom';
import MerchantDashboardLayout from 'layouts/MerchantLayout';
import { merchantRoutes } from 'routes/appRoutes';
import NotFoundPage from 'pages/NotFoundPage';
import {
  decodeToken,
  getUserFromLocalStorage,
  hasAccessToModule,
  notifyError,
} from 'utils/helpers';
import { useEffect, useRef } from 'react';

function MerchantRoutes() {
  const user = getUserFromLocalStorage();
  const userDetails = decodeToken(user?.token);
  const documentLoaderRef = useRef(false);
  useEffect(() => {
    documentLoaderRef.current = true;
  }, []);
  const getMerchantRoutes = (adminRoutes: RoutesType[]) => {
    if (!userDetails?.permission && documentLoaderRef.current) {
      notifyError('You do not have this module permission. Please contact an admin');
    }
    return adminRoutes.map((route) => {
      const isAccessAllowed = hasAccessToModule(userDetails?.permission, route.moduleValue);
      if (!isAccessAllowed) return null;
      if (route.layout === '/merchant') {
        if (route.children && route.children.length > 0) {
          return (
            <Route key={route.layout + route.path}>
              {route.willChildLinkShow ? (
                <Route
                  path={`/${route.path}`}
                  element={
                    <Navigate
                      to={`${route.layout}/${route.path}/${route.children?.[0].path}`}
                      replace
                    />
                  }
                  key={route.layout + route.path + route.children?.[0].path}
                />
              ) : (
                <Route
                  path={`/${route.path}`}
                  element={route.component}
                  key={route.layout + route.path}
                />
              )}
              <Route path="*" element={<NotFoundPage />} />

              {route.children?.map((child) => {
                return (
                  <Route
                    path={`/${route.path}/${child.path}`}
                    element={child.component}
                    key={route.layout + route.path + child.path}
                  />
                );
              })}
            </Route>
          );
        } else {
          return (
            <Route
              path={`/${route.path}`}
              element={route.component}
              key={route.layout + route.path}
            />
          );
        }
      } else {
        return null;
      }
    });
  };
  const isDashboardAccessAllowed = hasAccessToModule(userDetails?.permission, 'Dashboard');
  return (
    <Routes>
      <Route element={<MerchantDashboardLayout />}>
        {isDashboardAccessAllowed && (
          <Route path="/" element={<Navigate to="/merchant/dashboard" replace />} />
        )}
        {getMerchantRoutes(merchantRoutes)}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
export default MerchantRoutes;
