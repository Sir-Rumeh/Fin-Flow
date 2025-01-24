import React, { useEffect, useState } from 'react';
import {
  decodeToken,
  getFirstSegmentFromHref,
  getSecondSegmentFormatted,
  getSlashCount,
  getUserFromLocalStorage,
  hasAccessToModule,
} from 'utils/helpers';

const NotFoundPage = () => {
  const user = getUserFromLocalStorage();
  const userDetails = decodeToken(user?.token);
  const currentUrl = window.location.href;
  const [failedAccess, setFailedAccess] = useState(false);

  useEffect(() => {
    const currentRouteLevel = getSlashCount(currentUrl);
    if (currentRouteLevel === 1) {
      const currentBaseLayout = getFirstSegmentFromHref(currentUrl);
      if (currentBaseLayout === 'merchant' || 'admin') {
        setFailedAccess(true);
      }
    } else if (currentRouteLevel === 2) {
      const currentChildRoute = getSecondSegmentFormatted(currentUrl);
      if (currentChildRoute) {
        const isAccessAllowed = hasAccessToModule(userDetails?.permission, currentChildRoute);
        if (!isAccessAllowed) {
          setFailedAccess(true);
        } else {
          setFailedAccess(false);
        }
      }
    }
  }, [currentUrl]);

  return (
    <div className="flex h-[100%] w-full items-center justify-center space-y-10 text-2xl opacity-50 md:text-4xl">
      {failedAccess ? (
        <div className="space-y-2 text-center">
          <h1>You do not have permission to view this module.</h1>
          <h1>Please contact an admin.</h1>
        </div>
      ) : (
        <div className="text-center">
          <h1>404 Error</h1>
          <h1>Page Not Found</h1>
        </div>
      )}
    </div>
  );
};

export default NotFoundPage;
