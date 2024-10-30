import { Link, useNavigate } from 'react-router-dom';
import ChevronRight from 'assets/icons/ChevronRight';
import appRoutes from 'utils/constants/routes';
import ButtonComponent from 'components/FormElements/Button';
import CustomInput from 'components/FormElements/CustomInput';
import { useFormik } from 'formik';
import { addRoleSchema } from 'utils/formValidators';
import { useState } from 'react';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import { useMutation } from '@tanstack/react-query';
import { RoleRequest } from 'utils/interfaces';
import { addRoleRequest } from 'config/actions/role-permission-actions';
import FormSelect from 'components/FormElements/FormSelect';
import { designationOptions } from 'utils/constants';

const AddRole = () => {
  const navigate = useNavigate();
  const [roleRequest, setRoleRequest] = useState<RoleRequest>();
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

  const addRoleRequestMutation = useMutation({
    mutationFn: (payload: RoleRequest | undefined) => addRoleRequest(payload),
    onSuccess: () => {
      closeModal('confirmAddRole');
      openModal('addRoleSuccessful');
    },
    onError: (error) => {
      closeModal('confirmAddRole');
    },
  });

  const formik = useFormik({
    initialValues: {
      roleName: '',
      roleDescription: '',
      designation: '',
    },
    validationSchema: addRoleSchema,
    onSubmit: (values) => {
      const payload = {
        name: values.roleName,
        description: values.roleDescription,
        designation: values.designation,
      };
      setRoleRequest(payload);
      openModal('confirmAddRole');
    },
  });

  return (
    <div className="p-5">
      <div className="slide-down mt-2 flex items-center gap-2 text-lg">
        <Link
          to={`/${appRoutes.adminDashboard.rolesPermission.index}`}
          className="cursor-pointer text-darkgray"
        >
          Role
        </Link>{' '}
        <ChevronRight /> <span className="text-lightPurple">Add Role</span>
      </div>
      <div className="slide-down mt-3 flex items-center justify-between">
        <h2 className="mt-3 text-xl font-semibold">Add Role</h2>
      </div>
      <div className="slide-down mt-5 rounded-lg bg-white px-10 py-10">
        <form onSubmit={formik.handleSubmit} noValidate className="relative w-full">
          <div className="grid grid-cols-2 gap-10">
            <div className="w-full">
              <CustomInput
                labelFor="roleName"
                label="Role Name"
                inputType="text"
                placeholder="Enter here"
                maxW="w-full"
                formik={formik}
              />
            </div>
            <div className="w-full">
              <CustomInput
                labelFor="roleDescription"
                label="Role Description"
                inputType="text"
                placeholder="Enter here"
                maxW="w-full"
                formik={formik}
              />
            </div>
            <div className="">
              <FormSelect
                labelFor="designation"
                label="Role Designation"
                formik={formik}
                options={designationOptions}
                useTouched
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
            addRoleRequestMutation.mutate(roleRequest);
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
            navigate(`/${appRoutes.adminDashboard.rolesPermission.index}`);
          }}
        />
      )}
    </div>
  );
};

export default AddRole;
