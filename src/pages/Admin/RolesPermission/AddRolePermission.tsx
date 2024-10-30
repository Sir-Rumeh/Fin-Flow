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
import { Permission, QueryParams, RolePermissionRequest } from 'utils/interfaces';
import { addRolePermissionRequest, getRoles } from 'config/actions/role-permission-actions';
import { capitalize, formatApiDataForDropdown } from 'utils/helpers';
import { adminAccessRights, merchantAccessRights } from 'routes/appRoutes';

const AddRolePermission = () => {
  const navigate = useNavigate();
  const [selectedModules, setSelectedModules] = useState<Permission[]>([]);
  const [addPermissionRequest, setAddPermissionRequest] = useState<
    RolePermissionRequest | undefined
  >();
  const [role, setRole] = useState<any>();

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
    },
    validationSchema: addRolePermissionSchema,
    onSubmit: (values) => {
      const payload = {
        roleId: values.groupId,
        permissions: selectedModules,
      };
      setAddPermissionRequest(payload);
      openModal('confirmAddRolePermission');
    },
  });

  const handleToggleChange = (module: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const permission = {
      module: module,
      canList: true,
      canListAll: true,
      canDelete: true,
      canRead: true,
      canCreate: true,
      canUpdate: true,
    };
    if (event.target.checked) {
      setSelectedModules((prev) => [...prev, permission]);
    } else {
      setSelectedModules((prev) => prev.filter((mod) => mod.module !== module));
    }
  };

  const [queryParams, setQueryParams] = useState<QueryParams>({
    sortBy: 'asc',
    sortOrder: 'desc',
  });

  const { data, refetch } = useQuery({
    queryKey: ['roles', queryParams],
    queryFn: ({ queryKey }) => getRoles(queryKey[1] as QueryParams),
  });

  useEffect(() => {
    const selectedRole = data?.responseData?.items.filter(
      (role: any) => role.id === formik.values.groupId,
    )[0];
    setRole(selectedRole);
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
        <div className="slide-down mt-5 rounded-lg bg-white px-10 py-10">
          <form onSubmit={formik.handleSubmit} noValidate className="relative w-full">
            <div className="grid grid-cols-2 gap-10">
              <div className="w-full">
                <FormSelect
                  labelFor="groupId"
                  label="Group Name"
                  formik={formik}
                  options={formatApiDataForDropdown(data?.responseData?.items, 'name', 'id')}
                  scrollableOptions
                  useTouched
                />
              </div>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-20 rounded-lg border p-2 md:grid-cols-4 md:p-3 2xl:p-4">
              {role?.designation === 'StaffUser'
                ? adminAccessRights.map((right) => (
                    <ToggleSwitch
                      key={right.id}
                      id={right.id}
                      toggleLabel={right.module}
                      checked={selectedModules.some(
                        (mod: Permission) =>
                          mod.module.toLocaleLowerCase() === right.moduleValue.toLocaleLowerCase(),
                      )}
                      onChange={handleToggleChange(right.moduleValue)}
                    />
                  ))
                : role?.designation === 'Merchant'
                  ? merchantAccessRights.map((right) => (
                      <ToggleSwitch
                        key={right.id}
                        id={right.id}
                        toggleLabel={right.module}
                        checked={selectedModules.some(
                          (mod: Permission) =>
                            mod.module.toLocaleLowerCase() ===
                            right.moduleValue.toLocaleLowerCase(),
                        )}
                        onChange={handleToggleChange(right.moduleValue)}
                      />
                    ))
                  : adminAccessRights.map((right) => (
                      <ToggleSwitch
                        key={right.id}
                        id={right.id}
                        toggleLabel={right.module}
                        checked={selectedModules.some(
                          (mod: Permission) =>
                            mod.module.toLocaleLowerCase() ===
                            right.moduleValue.toLocaleLowerCase(),
                        )}
                        onChange={handleToggleChange(right.moduleValue)}
                      />
                    ))}
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
