import { Dispatch } from 'react';
import { AdminDashboardPageType } from 'utils/enums';

interface AdminDashboardProps {
  setPageAction: React.Dispatch<React.SetStateAction<AdminDashboardPageType>>;
  selectedItem?: number | string;
}

const MerchantDetails = ({ setPageAction, selectedItem }: AdminDashboardProps) => {
  return <div>MerchantDetails</div>;
};

export default MerchantDetails;
