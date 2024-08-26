import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboardLayout from 'layouts/AdminLayout';
import { adminRoutes } from 'routes/appRoutes';
import NotFoundPage from 'pages/NotFoundPage';

function AdminRoutes() {
  const getAdminRoutes = (adminRoutes: RoutesType[]) => {
    return adminRoutes.map((route) => {
      if (route.layout === '/admin') {
        if (route.children && route.children.length > 0) {
          return (
            <Route key={route.layout + route.path}>
              {route.willChildLinkShow ? (
                <Route
                  path={`/${route.path}`}
                  element={
                    <Navigate
                      to={`${route.layout}/${route.path}/${route.children?.[0].path.replace('/*', '')}`}
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

              <Route path="*" element={<NotFoundPage />} key={route.layout + route.path + '*'} />

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
      <Route element={<AdminDashboardLayout />}>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        {getAdminRoutes(adminRoutes)}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
export default AdminRoutes;
