import { useSearchParams } from 'react-router-dom';

const AccountMandates = () => {
  const [searchParams] = useSearchParams();
  const accountId = searchParams?.get('id') || '';
  return <div>Table here</div>;
};

export default AccountMandates;
