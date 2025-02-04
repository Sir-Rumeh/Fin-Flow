import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import ItemDetailsContainer from 'components/common/ItemDetailsContainer';
import { Link, useSearchParams } from 'react-router-dom';
import ChevronRight from 'assets/icons/ChevronRight';
import appRoutes from 'utils/constants/routes';
import { useQuery } from '@tanstack/react-query';
import { getRoleById, getRolePermissionByRoleId } from 'config/actions/role-permission-actions';
import { PermissionInterface } from 'utils/interfaces';
import GoodCheckMark from 'assets/icons/GoodCheckMark';
import ErrorCheckMark from 'assets/icons/ErrorCheckMark';
import { capitalize } from 'utils/helpers';

const RolePermissionDetails = () => {
  const [searchParams] = useSearchParams();
  const permissionRoleId = searchParams?.get('id') || '';

  const { data: roleData } = useQuery({
    queryKey: ['roles-details', permissionRoleId],
    queryFn: ({ queryKey }) => getRoleById(queryKey[1]),
  });

  const { data } = useQuery({
    queryKey: ['permission-details', permissionRoleId],
    queryFn: ({ queryKey }) => getRolePermissionByRoleId(queryKey[1]),
  });

  type PermissionKeys = Exclude<keyof PermissionInterface, 'module'>;

  const permissionKeys: PermissionKeys[] = [
    'canList',
    'canListAll',
    'canDelete',
    'canRead',
    'canCreate',
    'canUpdate',
    'canEnable',
    'canDisable',
    'canApprove',
  ];

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
              <DetailsCard title="Role Name" content={capitalize(roleData?.responseData?.name)} />
              <DetailsCard title="Role Description" content={roleData?.responseData?.description} />
              <DetailsCard title="Designation" content={roleData?.responseData?.designation} />
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
                  <div className="mt-6 grid grid-cols-2 gap-x-[20px] gap-y-5 rounded-lg bg-white p-2 md:grid-cols-3 md:gap-x-[50px] md:gap-y-8 md:px-4 md:pb-6 md:pt-6 xl:grid-cols-4 xl:p-4 2xl:p-5">
                    {data?.responseData?.map((permission: PermissionInterface) => {
                      const filteredProperties = permissionKeys.map((key) => ({
                        key,
                        value: permission[key as keyof typeof permission],
                      }));
                      return (
                        <div key={permission.module} className="flex flex-col gap-1">
                          <p className="font-semibold">{permission.module}</p>
                          {filteredProperties?.map((access: any) => {
                            return (
                              <div className="text-sx flex items-center gap-x-1 font-extralight">
                                <span className="flex items-center gap-0">
                                  <p className="">{`${access.key} : `}</p>
                                  <p className="scale-[20%] transform">
                                    {access.value ? <GoodCheckMark /> : <ErrorCheckMark />}
                                  </p>
                                </span>
                              </div>
                            );
                          })}
                        </div>
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
