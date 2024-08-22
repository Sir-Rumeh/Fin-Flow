import { Route, Routes } from 'react-router-dom';
import AdminMandateRequests from './index';
import NotFoundPage from 'pages/NotFoundPage';
import MandateCreationRequestDetails from './MandateCreationRequestDetails';
import MandateDeletionRequestDetails from './MandateDeletionRequestDetails';
import MandateUpdateRequestDetails from './MandateUpdateRequestDetails';
import MandateDisableRequestDetails from './MandateDisableRequestDetails';

const MandateRequestsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminMandateRequests />} />
      <Route path="creation-request-details" element={<MandateCreationRequestDetails />} />
      <Route path="deletion-request-details" element={<MandateDeletionRequestDetails />} />
      <Route path="update-request-details" element={<MandateUpdateRequestDetails />} />
      <Route path="disable-request-details" element={<MandateDisableRequestDetails />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default MandateRequestsRoutes;
