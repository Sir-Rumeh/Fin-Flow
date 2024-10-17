import { useSearchParams } from 'react-router-dom';

const AccountProfiles = () => {
  const [searchParams] = useSearchParams();
  const accountId = searchParams?.get('id') || '';
  return <div>Table here</div>;
};

export default AccountProfiles;
