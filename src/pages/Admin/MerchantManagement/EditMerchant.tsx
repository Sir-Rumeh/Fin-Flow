import { Dispatch } from 'react';
import { AdminDashboardPageType } from 'utils/enums';

interface AdminDashboardProps {
  setPageAction: React.Dispatch<React.SetStateAction<AdminDashboardPageType>>;
  selectedItem?: number | string;
}

const EditMerchant = ({ setPageAction, selectedItem }: AdminDashboardProps) => {
  return <div>EditMerchant</div>;
};

export default EditMerchant;
