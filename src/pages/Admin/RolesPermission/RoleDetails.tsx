import { Link, useSearchParams } from 'react-router-dom';
import appRoutes from 'utils/constants/routes';
import ChevronRight from 'assets/icons/ChevronRight';
import ItemDetailsContainer from 'components/common/ItemDetailsContainer';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import { useQuery } from '@tanstack/react-query';
import { getRoleById } from 'config/actions/role-permission-actions';

const RoleDetails = () => {
  const [searchParams] = useSearchParams();
  const roleId = searchParams?.get('id') || '';

  const { data } = useQuery({
    queryKey: ['roles', roleId],
    queryFn: ({ queryKey }) => getRoleById(queryKey[1]),
  });

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
            <h2 className="text-lg font-semibold md:text-2xl">{`Role ID : ${data?.responseData?.id ? data?.responseData?.id : ''}`}</h2>
          </div>
        </div>
        <div className="slide-down mt-5 rounded-lg bg-white px-5 py-8">
          <div className="">
            <ItemDetailsContainer title="Role Details">
              <DetailsCard title="Role Name" content={data?.responseData?.name} />
              <DetailsCard title="Role Description" content={data?.responseData?.description} />
              <DetailsCard title="Designator" content={data?.responseData?.designation} />
              <DetailsCard
                title="Date Created"
                content={
                  data?.responseData?.createdAt &&
                  new Date(data.responseData.createdAt).toLocaleDateString()
                }
              />
            </ItemDetailsContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoleDetails;
