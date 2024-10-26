import { Link, useSearchParams } from 'react-router-dom';
import appRoutes from 'utils/constants/routes';
import ChevronRight from 'assets/icons/ChevronRight';
import ItemDetailsContainer from 'components/common/ItemDetailsContainer';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';

const RoleDetails = () => {
  const [searchParams] = useSearchParams();
  const roleId = searchParams?.get('id') || '';
  return (
    <>
      <div className="px-5 py-1">
        <div className="slide-down mt-2 flex items-center gap-2 text-lg">
          <Link
            to={`/${appRoutes.adminDashboard.rolesPermission.index}`}
            className="cursor-pointer text-darkgray"
          >
            Roles
          </Link>{' '}
          <ChevronRight />
          <span className="text-lightPurple">Role Details</span>
        </div>
        <div className="slide-down mt-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold md:text-2xl">{`Role ID : 123456`}</h2>
          </div>
        </div>
        <div className="slide-down mt-5 rounded-lg bg-white px-5 py-8">
          <div className="">
            <ItemDetailsContainer title="Role Details">
              <DetailsCard title="Role Name" content={'Onboarding Role'} />
              <DetailsCard
                title="Role Description"
                content={`Merchant, Mandate, Account, Profiole Management`}
              />
              <DetailsCard title="Date Created" content={'10/24/2024'} />
              <DetailsCard title="Designator" content={'Merchant Users'} />
            </ItemDetailsContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoleDetails;
