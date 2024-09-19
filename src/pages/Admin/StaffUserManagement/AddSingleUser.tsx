import { Link, useNavigate } from 'react-router-dom';
import appRoutes from 'utils/constants/routes';
import ChevronRight from 'assets/icons/ChevronRight';
import CustomInput from 'components/FormElements/CustomInput';
import ButtonComponent from 'components/FormElements/Button';
import { useState } from 'react';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import { ModalWrapper } from 'hoc/ModalWrapper';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import { useFormik } from 'formik';
import FormSelect from 'components/FormElements/FormSelect';

function AddUser() {
  const navigate = useNavigate();
  const [modals, setModals] = useState({
    confirmCreate: false,
    creationSuccessful: false,
  });

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const formik = useFormik({
    initialValues: {},

    onSubmit: (values) => {
      openModal('confirmCreate');
    },
  });

  const roles = [
    { value: 'Admin Role', label: 'Admin Role' },
    { value: 'Onboarding Role', label: 'Onboarding Role' },
    { value: 'Audit Role', label: 'Audit Role' },
    { value: 'Reporting Role', label: 'Reporting Role' },
  ];
  return (
    <>
      <div className="px-5 py-1">
        <div className="slide-down mt-2 flex items-center gap-2 text-lg">
          <Link
            to={`/${appRoutes.adminDashboard.staffUserManagement.index}`}
            className="cursor-pointer text-darkgray"
          >
            Staff User Management
          </Link>{' '}
          <ChevronRight />
          <span className="text-lightPurple">Add User</span>
        </div>
        <div className="slide-down mt-3 flex items-center justify-between">
          <h2 className="mt-3 text-xl font-semibold">Add New Staff User </h2>
        </div>
        <div className="slide-down mt-5 rounded-lg bg-white px-5 py-10">
          <div className="rounded-[5px] border-[3px] border-grayPrimary px-6 py-8">
            <form onSubmit={formik.handleSubmit} noValidate className="relative w-full">
              <div className="slide-down">
                <div className="relative grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                  <CustomInput
                    labelFor="userName"
                    label="Enter User Name"
                    inputType="text"
                    placeholder="Enter user name"
                    maxW="w-full"
                    formik={formik}
                  />
                  <CustomInput
                    labelFor="firstName"
                    label="Enter First Name"
                    inputType="text"
                    placeholder="Enter first name"
                    maxW="w-full"
                    formik={formik}
                  />
                  <CustomInput
                    labelFor="middleName"
                    label="Enter Middle Name"
                    inputType="text"
                    placeholder="Enter middle name"
                    maxW="w-full"
                    formik={formik}
                  />
                  <CustomInput
                    labelFor="lastName"
                    label="Enter Last Name"
                    inputType="text"
                    placeholder="Enter last name"
                    maxW="w-full"
                    formik={formik}
                  />
                  <CustomInput
                    labelFor="employeeId"
                    label="Enter Employee ID"
                    inputType="text"
                    placeholder="Enter employee ID"
                    maxW="w-full"
                    formik={formik}
                  />
                  <CustomInput
                    labelFor="email"
                    label="Enter Email Address"
                    inputType="text"
                    placeholder="Enter email address"
                    maxW="w-full"
                    formik={formik}
                  />
                  <CustomInput
                    labelFor="phoneNumber"
                    label="Enter Phone Number"
                    inputType="text"
                    placeholder="Enter phone number"
                    maxW="w-full"
                    formik={formik}
                  />
                  <div className="md:col-span-2">
                    <FormSelect
                      labelFor="role"
                      label="Assign Role"
                      formik={formik}
                      options={roles}
                    />
                  </div>
                </div>
                <div className="mt-6 flex w-full items-center justify-end">
                  <ButtonComponent
                    variant="contained"
                    color="white"
                    backgroundColor="#5C068C"
                    hoverBackgroundColor="#2F0248"
                    type="submit"
                    title="Add User"
                    customPaddingX="1.4rem"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {modals.confirmCreate && (
        <ModalWrapper
          isOpen={modals.confirmCreate}
          setIsOpen={() => closeModal('confirmCreate')}
          title={'Add user?'}
          info={'You are about to add this user, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            closeModal('confirmCreate');
            openModal('creationSuccessful');
          }}
        />
      )}

      {modals.creationSuccessful && (
        <ModalWrapper
          isOpen={modals.creationSuccessful}
          setIsOpen={() => closeModal('creationSuccessful')}
          title={'Success!!'}
          info={'You have successfully added this user'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('creationSuccessful');
            navigate(`/${appRoutes.adminDashboard.staffUserManagement.index}`);
          }}
        />
      )}
    </>
  );
}

export default AddUser;
