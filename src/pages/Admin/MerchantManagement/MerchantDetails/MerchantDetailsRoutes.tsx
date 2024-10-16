import { Route, Routes } from 'react-router-dom';
import NotFoundPage from 'pages/NotFoundPage';
import MerchantDetails from './index';
import MerchantAccounts from './MerchantAccounts';
import MerchantProfiles from './MerchantProfiles';
import MerchantMandates from './MerchantMandates';

const MerchantDetailsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MerchantDetails />} />
      <Route path="merchant-accounts" element={<MerchantAccounts />} />
      <Route path="merchant-profiles" element={<MerchantProfiles />} />
      <Route path="merchant-mandates" element={<MerchantMandates />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default MerchantDetailsRoutes;
