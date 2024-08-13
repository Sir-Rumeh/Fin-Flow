import { Routes, Route, Navigate } from 'react-router-dom';
import MerchantDashboardLayout from 'layouts/MerchantLayout';
import { merchantRoutes } from 'routes/appRoutes';
import NotFoundPage from 'pages/NotFoundPage';

function MerchantRoutes() {
  const getMerchantRoutes = (adminRoutes: RoutesType[]) => {
    return adminRoutes.map((route) => {
      if (route.layout === '/merchant') {
        if (route.children && route.children.length > 0) {
          return (
            <Route key={route.layout + route.path}>
              <Route
                path={`/${route.path}`}
                element={
                  <Navigate
                    to={`${route.layout}/${route.path}/${route.children?.[0].path}`}
                    replace
                  />
                }
              />
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
  return (
    <Routes>
      <Route element={<MerchantDashboardLayout />}>
        <Route path="/" element={<Navigate to="/merchant/dashboard" replace />} />
        {getMerchantRoutes(merchantRoutes)}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
export default MerchantRoutes;
