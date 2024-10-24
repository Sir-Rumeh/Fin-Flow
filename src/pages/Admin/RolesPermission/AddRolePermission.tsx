import { Link, useNavigate } from 'react-router-dom';
import ChevronRight from 'assets/icons/ChevronRight';
import appRoutes from 'utils/constants/routes';
import ButtonComponent from 'components/FormElements/Button';
import { useFormik } from 'formik';
import { addRolePermissionSchema, addRoleSchema } from 'utils/formValidators';
import { useState } from 'react';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import FormSelect from 'components/FormElements/FormSelect';
import ToggleSwitch from 'components/FormElements/ToggleSwitch';
import { accessRights } from 'utils/constants';

const AddRolePermission = () => {
  const navigate = useNavigate();
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

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
      groupName: '',
    },
    validationSchema: addRolePermissionSchema,
    onSubmit: (values) => {
      console.log('Form values:', values);
      console.log('Selected toggle values:', selectedModules);
      openModal('confirmAddRolePermission');
    },
  });

  const groupNameOptions = [
    { value: 'Syscon Staff', label: 'Syscon Staff' },
    { value: 'Merchant', label: 'Merchant' },
    { value: 'Staff Admin', label: 'Staff Admin' },
  ];

  const handleToggleChange = (module: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedModules((prev) => [...prev, module]);
    } else {
      setSelectedModules((prev) => prev.filter((mod) => mod !== module));
    }
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
        <div className="slide-down mt-5 rounded-lg bg-white px-10 py-10">
          <form onSubmit={formik.handleSubmit} noValidate className="relative w-full">
            <div className="grid grid-cols-2 gap-10">
              <div className="w-full">
                <FormSelect
                  labelFor="groupName"
                  label="Group Name"
                  formik={formik}
                  options={groupNameOptions}
                  useTouched
                />
              </div>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-20 md:grid-cols-4">
              {accessRights.map((right) => (
                <ToggleSwitch
                  key={right.id}
                  id={right.id}
                  toggleLabel={right.module}
                  checked={selectedModules.includes(right.module)}
                  onChange={handleToggleChange(right.module)}
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
            closeModal('confirmAddRolePermission');
            openModal('addRolePermissionSuccessful');
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
            closeModal('addRolePermissionSuccessful');
          }}
        />
      )}
    </>
  );
};

export default AddRolePermission;
