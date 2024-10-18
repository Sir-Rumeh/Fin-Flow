import { Route, Routes } from 'react-router-dom';
import NotFoundPage from 'pages/NotFoundPage';
import AccountDetails from './index';
import AccountProfiles from './AccountProfiles';
import AccountMandates from './AccountMandates';

const AccountDetailsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AccountDetails />} />
      <Route path="account-profiles" element={<AccountProfiles />} />
      <Route path="account-mandates" element={<AccountMandates />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AccountDetailsRoutes;
