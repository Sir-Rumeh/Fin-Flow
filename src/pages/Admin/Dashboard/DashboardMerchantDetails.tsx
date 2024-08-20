import { Link } from 'react-router-dom';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import { CreationRequestIcon, UpdateRequestIcon } from 'assets/icons';
import { BiChevronRight } from 'react-icons/bi';
import ItemDetailsContainer from 'components/common/ItemDetailsContainer';
import appRoutes from 'utils/constants/routes';
import DashboardCard from 'components/common/DashboardCards/DashboardCard';
import MerchantDetails from '../MerchantManagement/MerchantDetails';

const DashboardMerchantDetails = () => {
  return <MerchantDetails />;
};

export default DashboardMerchantDetails;
