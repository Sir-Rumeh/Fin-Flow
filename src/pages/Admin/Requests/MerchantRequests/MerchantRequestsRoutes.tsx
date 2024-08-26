import { Route, Routes } from 'react-router-dom';
import MerchantRequestsListTable from './MerchantRequestsListTable';
import AdminMerchantRequests from './index';
import NotFoundPage from 'pages/NotFoundPage';
import MerchantCreationRequestDetails from './MerchantCreationRequestDetails';
import MerchantDeletionRequestDetails from './MerchantDeletionRequestDetails';
import MerchantUpdateRequestDetails from './MerchantUpdateRequestDetails';
import MerchantDisableRequestDetails from './MerchantDisableRequestDetails';

const MerchantRequestsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminMerchantRequests />} />
      <Route path="creation-request-details" element={<MerchantCreationRequestDetails />} />
      <Route path="deletion-request-details" element={<MerchantDeletionRequestDetails />} />
      <Route path="update-request-details" element={<MerchantUpdateRequestDetails />} />
      <Route path="disable-request-details" element={<MerchantDisableRequestDetails />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default MerchantRequestsRoutes;
