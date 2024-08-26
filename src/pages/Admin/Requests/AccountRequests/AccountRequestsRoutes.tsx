import { Route, Routes } from 'react-router-dom';
import AdminAccountRequests from './index';
import NotFoundPage from 'pages/NotFoundPage';
import AccountCreationRequestDetails from './AccountCreationRequestDetails';
import AccountDeletionRequestDetails from './AccountDeletionRequestDetails';
import AccountUpdateRequestDetails from './AccountUpdateRequestDetails';
import AccountDisableRequestDetails from './AccountDisableRequestDetails';

const AccountRequestsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminAccountRequests />} />
      <Route path="creation-request-details" element={<AccountCreationRequestDetails />} />
      <Route path="deletion-request-details" element={<AccountDeletionRequestDetails />} />
      <Route path="update-request-details" element={<AccountUpdateRequestDetails />} />
      <Route path="disable-request-details" element={<AccountDisableRequestDetails />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AccountRequestsRoutes;
