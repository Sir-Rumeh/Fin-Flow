import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import ItemDetailsContainer from 'components/common/ItemDetailsContainer';
import { Link, useSearchParams } from 'react-router-dom';
import ChevronRight from 'assets/icons/ChevronRight';
import appRoutes from 'utils/constants/routes';
import { useQuery } from '@tanstack/react-query';
import { getRolePermissionByRoleId } from 'config/actions/role-permission-actions';
import { Permission } from 'utils/interfaces';

const RolePermissionDetails = () => {
  const [searchParams] = useSearchParams();
  const permissionRoleId = searchParams?.get('id') || '';

  const { data } = useQuery({
    queryKey: ['permission-details', permissionRoleId],
    queryFn: ({ queryKey }) => getRolePermissionByRoleId(queryKey[1]),
  });

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
            <h2 className="text-lg font-semibold md:text-2xl">{`Permission Role ID : ${permissionRoleId}`}</h2>
          </div>
        </div>
        <div className="slide-down mt-5 rounded-lg bg-white px-5 py-8">
          <div className="">
            <ItemDetailsContainer title="Role Permission Details">
              <DetailsCard title="Role / Group Id" content={permissionRoleId} />
              <DetailsCard
                title="Date Created"
                content={
                  data?.responseData[0]?.createdAt &&
                  new Date(data.responseData[0].createdAt).toLocaleDateString()
                }
              />
              <div className="col-span-3 w-full">
                <div className="w-full rounded-xl bg-lilacPurple px-6 py-4 pb-6">
                  <h3 className="w-full text-base font-semibold md:text-lg">Permissions</h3>
                  <div className="mt-6 grid grid-cols-1 gap-x-[20px] gap-y-5 rounded-lg bg-white p-2 sm:grid-cols-2 md:grid-cols-3 md:gap-x-[50px] md:gap-y-8 md:px-4 md:pb-6 md:pt-6">
                    {data?.responseData?.map((permission: Permission) => {
                      return (
                        <p key={permission.module} className="font-semibold">
                          {permission.module}
                        </p>
                      );
                    })}
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
