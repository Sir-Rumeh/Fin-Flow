import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboardLayout from 'layouts/AdminLayout';
import { adminRoutes } from 'routes/appRoutes';
import NotFoundPage from 'pages/NotFoundPage';
import {
  decodeToken,
  getUserFromLocalStorage,
  hasAccessToModule,
  notifyError,
} from 'utils/helpers';
import { useEffect, useRef, useState } from 'react';

const CustomNotFoundPage = ({ isLoadingPermissions }: { isLoadingPermissions: boolean }) => {
  return isLoadingPermissions ? (
    <div className="fixed inset-0 z-[9999] flex size-full bg-[#00000066]" />
  ) : (
    <NotFoundPage />
  );
};

function AdminRoutes() {
  const [isLoadingPermissions, setIsLoadingPermissions] = useState(true);
  const user = getUserFromLocalStorage();
  const userDetails = decodeToken(user?.token);
  const getAdminRoutes = (routes: RoutesType[]) => {
    const [hasModuleAccess, setHasModuleAccess] = useState(false);
    useEffect(() => {
      const hasMatchingModuleValue = routes.some((route) => {
        const permissions = userDetails?.permission;
        if (!permissions) return false;
        if (typeof permissions === 'string') {
          return permissions.includes(route.moduleValue);
        }
        if (Array.isArray(permissions)) {
          return permissions.some((perm) => perm.includes(route.moduleValue)); // Handle array case
        }
        return false;
        // userDetails?.permission?.some((string: any) => string.includes(route.moduleValue)),
      });

      if (hasMatchingModuleValue) {
        setHasModuleAccess(true);
      }
      setTimeout(() => {
        setIsLoadingPermissions(false);
      }, 1000);
    });
    if (!userDetails?.permission || !hasModuleAccess) {
      return (
        <Route
          path="*"
          element={<CustomNotFoundPage isLoadingPermissions={isLoadingPermissions} />}
          key={'*'}
        />
      );
    }

    return adminRoutes.map((route) => {
      const isAccessAllowed = hasAccessToModule(userDetails?.permission, route.moduleValue);
      if (!isAccessAllowed) return null;
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
  const isDashboardAccessAllowed = hasAccessToModule(userDetails?.permission, 'Dashboard');
  return (
    <Routes>
      <Route element={<AdminDashboardLayout />}>
        {isDashboardAccessAllowed && (
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        )}
        {getAdminRoutes(adminRoutes)}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
export default AdminRoutes;
