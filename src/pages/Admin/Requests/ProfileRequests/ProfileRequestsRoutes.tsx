import { Route, Routes } from 'react-router-dom';
import AdminProfileRequests from './index';
import NotFoundPage from 'pages/NotFoundPage';
import ProfileCreationRequestDetails from './ProfileCreationRequestDetails';
import ProfileDeletionRequestDetails from './ProfileDeletionRequestDetails';
import ProfileUpdateRequestDetails from './ProfileUpdateRequestDetails';
import ProfileDisableRequestDetails from './ProfileDisableRequestDetails';

const ProfileRequestsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminProfileRequests />} />
      <Route path="creation-request-details" element={<ProfileCreationRequestDetails />} />
      <Route path="deletion-request-details" element={<ProfileDeletionRequestDetails />} />
      <Route path="update-request-details" element={<ProfileUpdateRequestDetails />} />
      <Route path="disable-request-details" element={<ProfileDisableRequestDetails />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default ProfileRequestsRoutes;
