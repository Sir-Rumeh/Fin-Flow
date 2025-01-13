import { useNavigate } from 'react-router-dom';
import appRoutes from 'utils/constants/routes';
import ButtonComponent from 'components/FormElements/Button';
import { useFormik } from 'formik';
import { assignRoleSchema } from 'utils/formValidators';
import { useEffect, useState } from 'react';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AssignRoleRequest, QueryParams, Role } from 'utils/interfaces';
import { assignRoleRequest, getRoles } from 'config/actions/role-permission-actions';
import FormSelect from 'components/FormElements/FormSelect';
import { Designation } from 'utils/enums';
import { formatApiDataForDropdown } from 'utils/helpers';
import { getStaffUsers } from 'config/actions/staff-user-actions';

const AssignRoleToAdmin = ({
  actionnCompleteCallBack,
}: {
  actionnCompleteCallBack: () => void;
}) => {
  const [adminRoles, setAdminRoles] = useState<Role[]>([]);
  const [staffUsers, setStaffUsers] = useState<any>([]);
  const navigate = useNavigate();
  const [assignRequest, setAssignRequest] = useState<AssignRoleRequest>();
  const [modals, setModals] = useState({
    confirmAddRole: false,
    addRoleSuccessful: false,
  });

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const formik = useFormik({
    initialValues: {
      userId: '',
      roleId: '',
    },
    validationSchema: assignRoleSchema,
    onSubmit: (values) => {
      const payload = {
        userId: values.userId,
        roleId: values.roleId,
      };
      setAssignRequest(payload);
      openModal('confirmAddRole');
    },
  });

  const [queryParams, setQueryParams] = useState<QueryParams>({
    sortBy: 'asc',
    sortOrder: 'desc',
  });

  const { data: staffUsersList } = useQuery({
    queryKey: ['users', queryParams],
    queryFn: ({ queryKey }) => getStaffUsers(queryKey[1] as QueryParams),
  });

  const { data: roles } = useQuery({
    queryKey: ['roles', queryParams],
    queryFn: ({ queryKey }) => getRoles(queryKey[1] as QueryParams),
  });

  useEffect(() => {
    const filteredRoles = roles?.responseData?.items?.filter(
      (role: Role) => role.designation === Designation.StaffUser,
    );
    setAdminRoles(filteredRoles);
  }, [roles]);
  useEffect(() => {
    const filteredStaffs = staffUsersList?.responseData?.items?.filter(
      (staff: any) => !(staff.role.length > 0),
    );
    setStaffUsers(filteredStaffs);
  }, [staffUsers]);

  const addRoleRequestMutation = useMutation({
    mutationFn: (payload: AssignRoleRequest | undefined) => assignRoleRequest(payload),
    onSuccess: () => {
      closeModal('confirmAddRole');
      openModal('addRoleSuccessful');
    },
    onError: (error) => {
      closeModal('confirmAddRole');
    },
  });

  return (
    <div className="">
      <div className="slide-down mt-8 rounded-lg bg-white p-2 md:p-5">
        <div className="slide-down flex items-center justify-between">
          <h2 className="text-xl font-semibold">Add Role</h2>
        </div>
        <form onSubmit={formik.handleSubmit} noValidate className="relative mt-8 w-full">
          <div className="grid grid-cols-2 gap-10">
            <div className="">
              <FormSelect
                labelFor="userId"
                label="Staff Users Without Role"
                formik={formik}
                options={formatApiDataForDropdown(staffUsers, 'email', 'id')}
                useTouched
                scrollableOptions
                scrollableHeight="max-h-[15rem]"
              />
            </div>
            <div className="">
              <FormSelect
                labelFor="roleId"
                label="Assign Role"
                formik={formik}
                options={formatApiDataForDropdown(adminRoles, 'name', 'id')}
                useTouched
                scrollableOptions
                scrollableHeight="max-h-[15rem]"
              />
            </div>
          </div>
          <div className="mt-6">
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
                    actionnCompleteCallBack();
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
                  title="Add Role"
                  customPaddingX="1.5rem"
                  width="10rem"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      {modals.confirmAddRole && (
        <ModalWrapper
          isOpen={modals.confirmAddRole}
          setIsOpen={() => closeModal('confirmAddRole')}
          title={'Add Role?'}
          info={'You are about to add a new role, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            addRoleRequestMutation.mutate(assignRequest);
          }}
        />
      )}
      {modals.addRoleSuccessful && (
        <ModalWrapper
          isOpen={modals.addRoleSuccessful}
          setIsOpen={() => closeModal('addRoleSuccessful')}
          title={'Success!!'}
          info={'You have successfully added a new role'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            formik.resetForm();
            closeModal('addRoleSuccessful');
            actionnCompleteCallBack();
          }}
        />
      )}
    </div>
  );
};

export default AssignRoleToAdmin;
