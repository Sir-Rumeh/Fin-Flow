import { Routes, Route, Navigate } from 'react-router-dom';
import MerchantDashboardLayout from 'layouts/MerchantLayout';
import { merchantRoutes } from 'routes/appRoutes';

function MerchantRoutes() {
  const getMerchantRoutes = (adminRoutes: RoutesType[]) => {
    return adminRoutes.map((route) => {
      if (route.layout === '/merchant') {
        if (route.children && route.children.length > 0) {
          return (
            <Route>
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
  return (
    <Routes>
      <Route element={<MerchantDashboardLayout />}>
        <Route path="/" element={<Navigate to="/merchant/dashboard" replace />} />
        {getMerchantRoutes(merchantRoutes)}
      </Route>
    </Routes>
  );
}
export default MerchantRoutes;
