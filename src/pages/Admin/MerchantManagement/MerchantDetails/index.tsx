import { Link, useLocation } from 'react-router-dom';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import { CreationRequestIcon, UpdateRequestIcon } from 'assets/icons';
import { BiChevronRight } from 'react-icons/bi';
import ItemDetailsContainer from 'components/common/ItemDetailsContainer';
import appRoutes from 'utils/constants/routes';
import DashboardCard from 'components/common/DashboardCards/DashboardCard';
import { checkRoute } from 'utils/helpers';
import SubTitleIconGreen from 'assets/icons/SubTitleIconGreen';
import SubTitleIconYellow from 'assets/icons/SubTitleIconYellow';
import ApprovedIcon from 'assets/icons/ApprovedIcon';

const MerchantDetails = () => {
  const { pathname } = useLocation();
  const isDashboardRoute = checkRoute(pathname, 'dashboard');

  return (
    <div className="px-5 py-1">
      <div className="flex items-center gap-2 text-lg">
        <Link
          to={
            isDashboardRoute
              ? `/${appRoutes.adminDashboard.dashboard.index}`
              : `/${appRoutes.adminDashboard.merchantManagement.index}`
          }
          className="cursor-pointer text-darkgray"
        >
          {isDashboardRoute ? 'Dashboard' : 'Merchant Management'}
        </Link>{' '}
        <BiChevronRight className="h-5 w-5 text-darkgray" />{' '}
        <span className="text-lightPurple">Merchant Details</span>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold md:text-2xl">Request ID : Req123456</h2>
      </div>
      <div className="mt-5 rounded-lg bg-white px-5 py-8">
        <div className="bg-lilacPurple rounded-lg px-6 py-4">
          <h3 className="text-md font-semibold md:text-xl">Merchant Accounts</h3>
          <div className="mt-4 flex flex-col items-center justify-between gap-6 gap-x-4 md:flex-row">
            <DashboardCard
              title="Total Accounts"
              numberOfRequest={1200}
              backgroundColor="bg-white"
              textColor="text-purplePrimary"
              icon={<SubTitleIconGreen />}
              route={`/${appRoutes.adminDashboard.merchantManagement.index}`}
              // navigate to MerchantAccounts which will import table from Account Management
            />
            <DashboardCard
              title="Total Profiles"
              numberOfRequest={1200}
              backgroundColor="bg-white"
              textColor="text-purplePrimary"
              icon={<SubTitleIconYellow />}
              route={`/${appRoutes.adminDashboard.merchantManagement.index}`}
              // navigate to MerchantProfiles which will import table from Profile Management
            />
            <DashboardCard
              title="Total Mandates"
              numberOfRequest={1200}
              backgroundColor="bg-white"
              textColor="text-purplePrimary"
              icon={<SubTitleIconYellow />}
              route={`/${appRoutes.adminDashboard.merchantManagement.index}`}
              // navigate to MerchantMandates  which will import table from Mandate  Management
            />
          </div>
        </div>
        <div className="mt-10">
          <ItemDetailsContainer title="Merchant Details">
            <div className="flex w-[300px] flex-col gap-10">
              <DetailsCard title="Merchant ID" content="12345" />
              <DetailsCard title="CIF Number" content="12345" />
            </div>
            <div className="flex w-[300px] flex-col gap-10">
              <DetailsCard title="Merchant Name" content="Fair Money" />
              <DetailsCard title="Date Created" content="12/12/2024 : 03:00pm" />
            </div>
            <div className="flex w-[300px] flex-col gap-10">
              <DetailsCard title="Merchant Code" content="12345" />
            </div>
          </ItemDetailsContainer>
        </div>
        <div className="mt-10">
          <ItemDetailsContainer title="Creator Details">
            <div className="flex w-[300px] flex-col gap-10">
              <DetailsCard title="ID" content="9344243" />
              <DetailsCard title="Address" content="Ozumba Mbadiwe Avenue, Lagos State" />
            </div>
            <div className="flex w-[300px] flex-col gap-10">
              <DetailsCard title="Created By" content="John Doe" />
            </div>
            <div className="flex w-[300px] flex-col gap-10">
              <DetailsCard title="Date Created" content="12/12/2024 : 03:00pm" />
            </div>
          </ItemDetailsContainer>
        </div>
        <div className="mt-10">
          <ItemDetailsContainer title="Approver Details" titleExtension={<ApprovedIcon />}>
            <div className="flex w-[300px] flex-col gap-10">
              <DetailsCard title="ID" content="9344243" />
            </div>
            <div className="flex w-[300px] flex-col gap-10">
              <DetailsCard title="Approved By" content="John Doe" />
            </div>
            <div className="flex w-[300px] flex-col gap-10">
              <DetailsCard title="Date Approved" content="12/12/2024 : 03:00pm" />
            </div>
          </ItemDetailsContainer>
        </div>
      </div>
    </div>
  );
};

export default MerchantDetails;
