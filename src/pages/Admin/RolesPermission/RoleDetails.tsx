import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import appRoutes from 'utils/constants/routes';
import ChevronRight from 'assets/icons/ChevronRight';
import ItemDetailsContainer from 'components/common/ItemDetailsContainer';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import { useQuery } from '@tanstack/react-query';
import { getRoleById, getRolePermissionByRoleId } from 'config/actions/role-permission-actions';
import { PermissionInterface } from 'utils/interfaces';
import TableLogo from 'assets/images/table_logo.png';
import ButtonComponent from 'components/FormElements/Button';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import GoodCheckMark from 'assets/icons/GoodCheckMark';
import ErrorCheckMark from 'assets/icons/ErrorCheckMark';
import { capitalize } from 'utils/helpers';

const RoleDetails = () => {
  const [searchParams] = useSearchParams();
  const roleId = searchParams?.get('id') || '';
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['roles-details', roleId],
    queryFn: ({ queryKey }) => getRoleById(queryKey[1]),
  });

  const { data: rolePermissionData } = useQuery({
    queryKey: ['permission-details', roleId],
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
              <DetailsCard title="Role ID" content={data?.responseData?.id} />
              <DetailsCard title="Role Name" content={capitalize(data?.responseData?.name)} />
              <DetailsCard title="Role Description" content={data?.responseData?.description} />
              <DetailsCard title="Designation" content={data?.responseData?.designation} />
              <DetailsCard
                title="Date Created"
                content={
                  data?.responseData?.createdAt &&
                  new Date(data.responseData.createdAt).toLocaleDateString()
                }
              />
              <div className="col-span-3 w-full">
                <div className="w-full rounded-xl bg-lilacPurple px-6 py-4 pb-12">
                  {rolePermissionData?.responseData?.length > 0 && (
                    <>
                      <h3 className="w-full text-base font-semibold md:text-lg">Permissions</h3>
                      <div className="mt-6 grid grid-cols-2 gap-x-[20px] gap-y-5 rounded-lg bg-white p-2 md:grid-cols-3 md:gap-x-[50px] md:gap-y-8 md:px-4 md:pb-6 md:pt-6 xl:grid-cols-4 xl:p-4 2xl:p-5">
                        {rolePermissionData?.responseData?.map(
                          (permission: PermissionInterface) => {
                            const filteredProperties = permissionKeys.map((key) => ({
                              key,
                              value: permission[key as keyof typeof permission],
                            }));
                            return (
                              <div key={permission.module} className="flex flex-col gap-1">
                                <p className="font-semibold">{permission.module}</p>
                                {filteredProperties?.map((access: any) => {
                                  return (
                                    <div className="text-sx flex items-center font-extralight">
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
                          },
                        )}
                      </div>
                    </>
                  )}

                  {rolePermissionData && !(rolePermissionData?.responseData?.length > 0) && (
                    <>
                      <div className="slide-down mt-8 flex h-[30vh] flex-col items-center justify-center p-4 pb-8">
                        <div>
                          <img src={TableLogo} alt="group_logo" />
                        </div>
                        <div className="mt-8 text-center">
                          <h3 className="text-2xl font-bold">
                            Oops! No Permissions Exist for This Role. Add Permissions to Roles Below
                          </h3>
                        </div>
                        <div className="mt-8 text-center">
                          <div className="w-auto">
                            <ButtonComponent
                              variant="contained"
                              color="white"
                              backgroundColor="#5C068C"
                              hoverBackgroundColor="#2F0248"
                              type="button"
                              title="Add Permissions To Role"
                              customPaddingX="1.4rem"
                              onClick={() => {
                                navigate({
                                  pathname: `/${appRoutes.adminDashboard.rolesPermission.addRolePermission}`,
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </ItemDetailsContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoleDetails;
