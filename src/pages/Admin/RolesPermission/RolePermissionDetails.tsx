import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import ItemDetailsContainer from 'components/common/ItemDetailsContainer';
import { Link, useSearchParams } from 'react-router-dom';
import ChevronRight from 'assets/icons/ChevronRight';
import appRoutes from 'utils/constants/routes';

const RolePermissionDetails = () => {
  const [searchParams] = useSearchParams();
  const rolePermissionId = searchParams?.get('id') || '';
  return (
    <>
      <div className="px-5 py-1">
        <div className="slide-down mt-2 flex items-center gap-2 text-lg">
          <Link
            to={`/${appRoutes.adminDashboard.rolesPermission.index}`}
            className="cursor-pointer text-darkgray"
          >
            Role Permissions
          </Link>{' '}
          <ChevronRight />
          <span className="text-lightPurple">Role Permission Details</span>
        </div>
        <div className="slide-down mt-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold md:text-2xl">{`Role Permission ID : ih34ry8gry3rb38y2u`}</h2>
          </div>
        </div>
        <div className="slide-down mt-5 rounded-lg bg-white px-5 py-8">
          <div className="">
            <ItemDetailsContainer title="Role Permission Details">
              <DetailsCard title="Role / Group Id" content={'ih34ry8gry3rb38y2u'} />
              <DetailsCard title="Date Created" content={'10/24/2024'} />
              <div className="col-span-3 w-full">
                <div className="w-full rounded-xl bg-lilacPurple px-6 py-4 pb-6">
                  <h3 className="w-full text-base font-semibold md:text-lg">Permissions</h3>

                  <div className="mt-6 grid grid-cols-2 gap-[20px] rounded-lg bg-white p-2 sm:grid-cols-3 md:grid-cols-3 md:gap-[50px] md:px-4 md:py-3">
                    <p className="font-semibold">Dashboard</p>
                    <p className="font-semibold">Merchant</p>
                    <p className="font-semibold">Mandate</p>
                    <p className="font-semibold">Account</p>
                  </div>
                </div>
              </div>
            </ItemDetailsContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default RolePermissionDetails;
