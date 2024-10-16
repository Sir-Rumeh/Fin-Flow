import { useSearchParams } from 'react-router-dom';

const MerchantProfiles = () => {
  const [searchParams] = useSearchParams();
  const merchantId = searchParams?.get('id') || '';
  return <div>Table here</div>;
};

export default MerchantProfiles;
