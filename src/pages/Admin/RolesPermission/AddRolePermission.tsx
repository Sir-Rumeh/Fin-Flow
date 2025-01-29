import { Link, useNavigate } from 'react-router-dom';
import ChevronRight from 'assets/icons/ChevronRight';
import appRoutes from 'utils/constants/routes';
import ButtonComponent from 'components/FormElements/Button';
import { useFormik } from 'formik';
import { addRolePermissionSchema } from 'utils/formValidators';
import { useEffect, useState } from 'react';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import FormSelect from 'components/FormElements/FormSelect';
import ToggleSwitch from 'components/FormElements/ToggleSwitch';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  PermissionInterface,
  PermissionAccess,
  QueryParams,
  RolePermissionRequest,
} from 'utils/interfaces';
import {
  addRolePermissionRequest,
  getRolePermissionByRoleId,
  getRoles,
} from 'config/actions/role-permission-actions';
import { formatApiDataForDropdown, notifyError } from 'utils/helpers';
import { adminAccessRights, merchantAccessRights } from 'routes/appRoutes';
import { Designation } from 'utils/enums';
import { Checkbox } from '@mui/material';

const AddRolePermission = () => {
  const navigate = useNavigate();
  const [addPermissionRequest, setAddPermissionRequest] = useState<
    RolePermissionRequest | undefined
  >();
  const [selectedRole, setSelectedRole] = useState<any>();

  const [modals, setModals] = useState({
    confirmAddRolePermission: false,
    addRolePermissionSuccessful: false,
  });

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const formik = useFormik({
    initialValues: {
      groupId: '',
      groupRoleId: '',
      permissions: [] as PermissionInterface[],
    },
    validationSchema: addRolePermissionSchema,
    onSubmit: (values) => {
      const payload = {
        roleId: values.groupId,
        permissions: values.permissions,
      };
      setAddPermissionRequest(payload);
      openModal('confirmAddRolePermission');
    },
  });

  const [queryParams, setQueryParams] = useState<QueryParams>({
    sortBy: 'asc',
    sortOrder: 'desc',
  });

  const { data, refetch } = useQuery({
    queryKey: ['roles', queryParams],
    queryFn: ({ queryKey }) => getRoles(queryKey[1] as QueryParams),
  });

  //
  function removeUnwantedProperties(data: any[]) {
    return data.map(
      ({ id, isActive, createdBy, createdAt, updatedBy, updatedAt, isDeleted, ...rest }) => rest,
    );
  }

  useEffect(() => {
    const role = data?.responseData?.items.filter(
      (role: any) => role.id === formik.values.groupId,
    )[0];
    const getRolePermissions = async () => {
      const res = await getRolePermissionByRoleId(formik.values.groupId);
      if (res) {
        const formattedRes = removeUnwantedProperties(res.responseData);
        formik.setFieldValue('permissions', formattedRes);
      }
    };
    setSelectedRole(role);
    getRolePermissions();
  }, [formik.values.groupId]);

  const addRolePermissionRequestMutation = useMutation({
    mutationFn: (payload: RolePermissionRequest | undefined) => addRolePermissionRequest(payload),
    onSuccess: () => {
      closeModal('confirmAddRolePermission');
      openModal('addRolePermissionSuccessful');
    },
    onError: (error) => {
      closeModal('confirmAddRolePermission');
    },
  });

  const adminPermissionsAccess: PermissionAccess[] = [
    {
      id: 1,
      accessName: 'Can List',
      accessTag: 'canList',
    },
    {
      id: 2,
      accessName: 'Can List All',
      accessTag: 'canListAll',
    },
    {
      id: 3,
      accessName: 'Can Delete',
      accessTag: 'canDelete',
    },
    {
      id: 4,
      accessName: 'Can Read',
      accessTag: 'canRead',
    },
    {
      id: 5,
      accessName: 'Can Create',
      accessTag: 'canCreate',
    },
    {
      id: 6,
      accessName: 'Can Update',
      accessTag: 'canUpdate',
    },
    {
      id: 7,
      accessName: 'Can Enable',
      accessTag: 'canEnable',
    },
    {
      id: 8,
      accessName: 'Can Disable',
      accessTag: 'canDisable',
    },
    {
      id: 9,
      accessName: 'Can Approve',
      accessTag: 'canApprove',
    },
  ];
  const merchantPermissionsAccess: PermissionAccess[] = [
    {
      id: 1,
      accessName: 'Can List',
      accessTag: 'canList',
    },
    {
      id: 2,
      accessName: 'Can Delete',
      accessTag: 'canDelete',
    },
    {
      id: 3,
      accessName: 'Can Read',
      accessTag: 'canRead',
    },
    {
      id: 4,
      accessName: 'Can Create',
      accessTag: 'canCreate',
    },
    {
      id: 5,
      accessName: 'Can Update',
      accessTag: 'canUpdate',
    },
    {
      id: 6,
      accessName: 'Can Enable',
      accessTag: 'canEnable',
    },
    {
      id: 7,
      accessName: 'Can Disable',
      accessTag: 'canDisable',
    },
    {
      id: 8,
      accessName: 'Can Approve',
      accessTag: 'canApprove',
    },
  ];

  const handleChecked =
    (module: string, accessTag: keyof PermissionInterface) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const permissionToAssignAccess = formik.values.permissions.find(
        (permission: PermissionInterface) =>
          permission.module.toLocaleLowerCase() === module.toLocaleLowerCase(),
      );
      if (
        !formik.values.permissions.some(
          (permission: PermissionInterface) =>
            permission.module.toLocaleLowerCase() === module.toLocaleLowerCase(),
        )
      ) {
        notifyError('Select module before checking box');
        return;
      } else {
        if (permissionToAssignAccess) {
          (permissionToAssignAccess[accessTag as keyof PermissionInterface] as boolean) =
            event.target.checked;
          console.log('event', event.target.checked);
        }
      }
    };

  const handleToggleChange = (module: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPermission: PermissionInterface = {
      module: module,
      canList: false,
      canListAll: false,
      canDelete: false,
      canRead: false,
      canCreate: false,
      canUpdate: false,
      canEnable: false,
      canDisable: false,
      canApprove: false,
    };
    if (event.target.checked) {
      formik.setFieldValue('permissions', [...(formik.values.permissions || []), newPermission]);
    } else {
      formik.setFieldValue(
        'permissions',
        formik.values.permissions.filter(
          (permission: PermissionInterface) => permission.module !== module,
        ),
      );
    }
  };

  const handleSelectAll = () => {
    if (!selectedRole) return formik.setFieldError('groupRoleId', 'Role name is required');
    let permissionsToAssign: PermissionInterface[] = [];
    const availableRights =
      selectedRole?.designation === Designation.Merchant ? merchantAccessRights : adminAccessRights;
    availableRights.forEach((right) => {
      const permission: PermissionInterface = {
        module: right.moduleValue,
        canList: true,
        canListAll: true,
        canDelete: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canEnable: true,
        canDisable: true,
        canApprove: true,
      };
      permissionsToAssign.push(permission);
    });
    formik.setFieldValue('permissions', permissionsToAssign);
  };

  return (
    <>
      <div className="p-5">
        <div className="slide-down mt-2 flex items-center gap-2 text-lg">
          <Link
            to={`/${appRoutes.adminDashboard.rolesPermission.index}`}
            className="cursor-pointer text-darkgray"
          >
            Role
          </Link>{' '}
          <ChevronRight /> <span className="text-lightPurple">Add Role Permission</span>
        </div>
        <div className="slide-down mt-3 flex items-center justify-between">
          <h2 className="mt-3 text-xl font-semibold">Add Role Permission</h2>
        </div>
        <div className="slide-down mt-5 rounded-lg bg-white px-2 py-10 sm:px-4 md:px-10">
          <form onSubmit={formik.handleSubmit} noValidate className="relative w-full">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-5">
              <div className="relative w-full xl:col-span-2">
                <FormSelect
                  labelFor="groupId"
                  label="Role Name"
                  formik={formik}
                  options={formatApiDataForDropdown(data?.responseData?.items, 'name', 'id')}
                  scrollableOptions
                  scrollableHeight="h-[20rem]"
                  useTouched
                />
              </div>
              {formik?.errors['groupRoleId'] && (
                <p className={`absolute top-20 text-xs italic text-red-400`}>
                  {formik?.errors['groupRoleId']}
                </p>
              )}
            </div>

            <div className="mt-4 flex w-full items-center justify-between p-3">
              <div className="mt-4 font-semibold">
                {selectedRole ? (
                  <h3>{selectedRole?.designation} Permissions</h3>
                ) : (
                  <h3>{`${Designation.StaffUser} Permissions`}</h3>
                )}
              </div>
              <div className="w-auto">
                <ButtonComponent
                  variant="contained"
                  color="white"
                  backgroundColor="#5C068C"
                  hoverBackgroundColor="#2F0248"
                  type="button"
                  title="Select All"
                  customPaddingX="1.2rem"
                  height="2rem"
                  width="8rem"
                  onClick={() => {
                    handleSelectAll();
                  }}
                />
              </div>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-20 rounded-lg border p-2 md:grid-cols-3 xl:grid-cols-4 xl:p-4 2xl:p-5">
              {!selectedRole && (
                <>
                  {adminAccessRights.map((right) => (
                    <div key={right.id} className="flex flex-col gap-2">
                      <ToggleSwitch
                        key={right.id}
                        id={right.id}
                        toggleLabel={right.module}
                        checked={formik.values.permissions.some(
                          (mod: PermissionInterface) =>
                            mod.module.toLocaleLowerCase() ===
                            right.moduleValue.toLocaleLowerCase(),
                        )}
                        onChange={handleToggleChange(right.moduleValue)}
                      />
                      {adminPermissionsAccess.map((access) => {
                        return (
                          <div
                            className="gap- flex w-[90%] items-center justify-between text-xs"
                            key={access.id}
                          >
                            <span>{access.accessName}</span>
                            <Checkbox
                              onChange={handleChecked(
                                right.moduleValue,
                                access.accessTag as keyof PermissionInterface,
                              )}
                              disabled={
                                !formik.values.permissions.some(
                                  (permission: PermissionInterface) =>
                                    permission.module === right.moduleValue,
                                )
                              }
                              inputProps={{ 'aria-label': 'controlled checkbox' }}
                              sx={{
                                color: '#5C068C',
                                '&.Mui-checked': { color: '#5C068C' },
                                p: 0.3,
                                '& .MuiSvgIcon-root': {
                                  fontSize: 16,
                                },
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </>
              )}

              {selectedRole && selectedRole?.designation === Designation.StaffUser && (
                <>
                  {adminAccessRights.map((right) => (
                    <div key={right.id} className="flex flex-col gap-2">
                      <ToggleSwitch
                        key={right.id}
                        id={right.id}
                        toggleLabel={right.module}
                        checked={formik.values.permissions.some(
                          (mod: PermissionInterface) =>
                            mod.module.toLocaleLowerCase() ===
                            right.moduleValue.toLocaleLowerCase(),
                        )}
                        onChange={handleToggleChange(right.moduleValue)}
                      />
                      {adminPermissionsAccess.map((access) => {
                        return (
                          <div
                            className="gap- flex w-[90%] items-center justify-between text-xs"
                            key={access.id}
                          >
                            <span>{access.accessName}</span>
                            <Checkbox
                              checked={formik.values.permissions.some(
                                (permission: PermissionInterface) =>
                                  permission.module === right.moduleValue &&
                                  permission[access.accessTag as keyof PermissionInterface],
                              )}
                              onChange={handleChecked(
                                right.moduleValue,
                                access.accessTag as keyof PermissionInterface,
                              )}
                              disabled={
                                !formik.values.permissions.some(
                                  (permission: PermissionInterface) =>
                                    permission.module === right.moduleValue,
                                )
                              }
                              inputProps={{ 'aria-label': 'controlled checkbox' }}
                              sx={{
                                color: '#5C068C',
                                '&.Mui-checked': { color: '#5C068C' },
                                p: 0.3,
                                '& .MuiSvgIcon-root': {
                                  fontSize: 16,
                                },
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </>
              )}

              {selectedRole && selectedRole?.designation === Designation.Merchant && (
                <>
                  {merchantAccessRights.map((right) => (
                    <div key={right.id} className="flex flex-col gap-2">
                      <ToggleSwitch
                        key={right.id}
                        id={right.id}
                        toggleLabel={right.module}
                        checked={formik.values.permissions.some(
                          (mod: PermissionInterface) =>
                            mod.module.toLocaleLowerCase() ===
                            right.moduleValue.toLocaleLowerCase(),
                        )}
                        onChange={handleToggleChange(right.moduleValue)}
                      />
                      {merchantPermissionsAccess.map((access) => {
                        return (
                          <div
                            className="gap- flex w-[90%] items-center justify-between text-xs"
                            key={access.id}
                          >
                            <span>{access.accessName}</span>
                            <Checkbox
                              checked={formik.values.permissions.some(
                                (permission: PermissionInterface) =>
                                  permission.module === right.moduleValue &&
                                  permission[access.accessTag as keyof PermissionInterface],
                              )}
                              onChange={handleChecked(
                                right.moduleValue,
                                access.accessTag as keyof PermissionInterface,
                              )}
                              disabled={
                                !formik.values.permissions.some(
                                  (permission: PermissionInterface) =>
                                    permission.module === right.moduleValue,
                                )
                              }
                              inputProps={{ 'aria-label': 'controlled checkbox' }}
                              sx={{
                                color: '#5C068C',
                                '&.Mui-checked': { color: '#5C068C' },
                                p: 0.3,
                                '& .MuiSvgIcon-root': {
                                  fontSize: 16,
                                },
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </>
              )}

              {selectedRole && !selectedRole?.designation ? (
                <>
                  <div className="slide-down col-span-4 mt-4 flex h-[30vh] w-full flex-col items-center justify-center p-4 pb-8">
                    <div>
                      <RedAlertIcon />
                    </div>
                    <h3 className="mt-8 text-center text-2xl font-bold md:w-[70%]">
                      Oops! This role group is not designated to any user type, hence no permission
                      exists to be assigned
                    </h3>
                  </div>
                </>
              ) : null}
            </div>
            <div className="">
              {formik?.touched.permissions && formik?.errors.permissions && (
                <p className={`absolute bottom-14 text-xs italic text-red-400`}>
                  {formik?.errors.permissions as any}
                </p>
              )}
            </div>
            <div className="mt-10">
              <div className="flex w-full items-center justify-end gap-4">
                <div className="w-auto">
                  <ButtonComponent
                    color="#5C068C"
                    borderColor="#5C068C"
                    variant="outlined"
                    type="button"
                    title="Cancel"
                    customPaddingX="1.5rem"
                    width="10rem"
                    onClick={() => {
                      navigate(`/${appRoutes.adminDashboard.rolesPermission.index}`);
                    }}
                  />
                </div>
                <div className="w-auto">
                  <ButtonComponent
                    variant="contained"
                    color="white"
                    backgroundColor="#5C068C"
                    hoverBackgroundColor="#2F0248"
                    type="submit"
                    title="Save"
                    customPaddingX="1.5rem"
                    width="10rem"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {modals.confirmAddRolePermission && (
        <ModalWrapper
          isOpen={modals.confirmAddRolePermission}
          setIsOpen={() => closeModal('confirmAddRolePermission')}
          title={'Add Role Permission?'}
          info={'You are about to add a new role permission, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            closeModal('confirmAddRolePermission');
            addRolePermissionRequestMutation.mutate(addPermissionRequest);
          }}
        />
      )}
      {modals.addRolePermissionSuccessful && (
        <ModalWrapper
          isOpen={modals.addRolePermissionSuccessful}
          setIsOpen={() => closeModal('addRolePermissionSuccessful')}
          title={'Success!!'}
          info={'You have successfully added a new role permission'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            formik.resetForm();
            closeModal('addRolePermissionSuccessful');
            navigate(`/${appRoutes.adminDashboard.rolesPermission.index}`);
          }}
        />
      )}
    </>
  );
};

export default AddRolePermission;
