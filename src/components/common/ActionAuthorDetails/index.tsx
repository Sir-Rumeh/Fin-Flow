import useActionAuthor from 'hooks/useActionAuthor';
import React from 'react';
import DetailsCard from '../DashboardCards/DetailsCard';
import { checkRoute, getUserFromLocalStorage, isAdminAuthData } from 'utils/helpers';
import { useLocation } from 'react-router-dom';

export enum AuthorActionType {
  CreatedBy = 'CreatedBy',
  ApprovedBy = 'ApprovedBy',
  RejectedBy = 'RejectedBy',
  RequestedBy = 'RequestedBy',
}

const ActionAuthorDetails = ({
  id,
  actionType,
  actionDate,
  requestType,
}: {
  id: string;
  actionType: AuthorActionType;
  actionDate: string;
  requestType?: string;
}) => {
  const details = useActionAuthor(id);
  const user = getUserFromLocalStorage();
  const { pathname } = useLocation();
  const isRequestRoute =
    checkRoute(pathname, 'requests') || checkRoute(pathname, 'staff-user-requests');
  const detailsDisplay = () => {
    switch (actionType) {
      case AuthorActionType.CreatedBy:
        return requestType !== 'Creation' && isRequestRoute ? (
          <>
            <DetailsCard title="ID" content={details?.authorId} />
            <DetailsCard title="Requested By" content={details?.authorName} />
            <DetailsCard
              title="Date Requested"
              content={actionDate && new Date(actionDate).toLocaleDateString()}
            />
            {user && isAdminAuthData(user) && (
              <DetailsCard title="Address" content={details?.authorAddress} />
            )}
          </>
        ) : (
          <>
            <DetailsCard title="ID" content={details?.authorId} />
            <DetailsCard title="Created By" content={details?.authorName} />
            <DetailsCard
              title="Date Created"
              content={actionDate && new Date(actionDate).toLocaleDateString()}
            />
            {user && isAdminAuthData(user) && (
              <DetailsCard title="Address" content={details?.authorAddress} />
            )}
          </>
        );
      case AuthorActionType.ApprovedBy:
        return (
          <>
            <DetailsCard title="ID" content={details?.authorId} />
            <DetailsCard title="Approved By" content={details?.authorName} />
            <DetailsCard
              title="Date Approved"
              content={actionDate && new Date(actionDate).toLocaleDateString()}
            />
            {user && isAdminAuthData(user) && (
              <DetailsCard title="Address" content={details?.authorAddress} />
            )}
          </>
        );
      case AuthorActionType.RejectedBy:
        return (
          <>
            <DetailsCard title="ID" content={details?.authorId} />
            <DetailsCard title="Rejected By" content={details?.authorName} />
            <DetailsCard
              title="Date Rejected"
              content={actionDate && new Date(actionDate).toLocaleDateString()}
            />
            {user && isAdminAuthData(user) && (
              <DetailsCard title="Address" content={details?.authorAddress} />
            )}
          </>
        );
      // case AuthorActionType.RequestedBy:
      //   return (
      //     <>
      //       <DetailsCard title="ID" content={details?.authorId} />
      //       <DetailsCard title="Requested By" content={details?.authorName} />
      //       <DetailsCard
      //         title="Date Requested"
      //         content={actionDate && new Date(actionDate).toLocaleDateString()}
      //       />
      //       {user && isAdminAuthData(user) && (
      //         <DetailsCard title="Address" content={details?.authorAddress} />
      //       )}
      //     </>
      //   );
      default:
        return null;
    }
  };

  return <>{detailsDisplay()}</>;
};

export default ActionAuthorDetails;
