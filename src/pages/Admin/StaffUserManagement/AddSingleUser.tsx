import { Link, useNavigate } from 'react-router-dom';
import appRoutes from 'utils/constants/routes';
import ChevronRight from 'assets/icons/ChevronRight';
import CustomInput from 'components/FormElements/CustomInput';
import ButtonComponent from 'components/FormElements/Button';
import { useEffect, useState } from 'react';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import { ModalWrapper } from 'hoc/ModalWrapper';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import { useFormik } from 'formik';
import FormSelect from 'components/FormElements/FormSelect';
import { QueryParams, Role, StaffUserRequest } from 'utils/interfaces';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addStaffUserRequest } from 'config/actions/staff-user-actions';
import { createStaffUserSchema } from 'utils/formValidators';
import { getRoles } from 'config/actions/role-permission-actions';
import { formatApiDataForDropdown } from 'utils/helpers';
import { Designation } from 'utils/enums';

function AddUser() {
  const navigate = useNavigate();
  const [adminRoles, setAdminRoles] = useState<Role[]>([]);
  const [staffUserRequest, setStaffUserRequest] = useState<StaffUserRequest>();
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

  const addStaffUserRequestMutation = useMutation({
    mutationFn: (payload: StaffUserRequest | undefined) => addStaffUserRequest(payload),
    onSuccess: () => {
      closeModal('confirmCreate');
      openModal('creationSuccessful');
    },
    onError: (error) => {
      closeModal('confirmCreate');
    },
  });

  const formik = useFormik({
    initialValues: {
      staffId: '',
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      branch: '',
      role: '',
      address: '',
    },
    validationSchema: createStaffUserSchema,
    onSubmit: (values) => {
      const payload = {
        staffId: values.staffId,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: `${values.phoneNumber}`,
        branch: values.branch,
        role: values.role,
        address: values.address,
      };
      setStaffUserRequest(payload);
      openModal('confirmCreate');
    },
  });

  const [queryParams, setQueryParams] = useState<QueryParams>({
    sortBy: 'asc',
    sortOrder: 'desc',
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
          <div className="w-full rounded-[5px] border-[3px] border-grayPrimary px-6 py-8 2xl:w-[80%]">
            <form onSubmit={formik.handleSubmit} noValidate className="relativew-full">
              <div className="slide-down">
                <div className="relative grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                  <CustomInput
                    labelFor="firstName"
                    label="Enter First Name"
                    inputType="text"
                    placeholder="Enter first name"
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
                    labelFor="staffId"
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
                    inputType="number"
                    placeholder="Enter phone number"
                    maxW="w-full"
                    formik={formik}
                  />
                  <CustomInput
                    labelFor="branch"
                    label="Enter Branch"
                    inputType="text"
                    placeholder="Enter branch"
                    maxW="w-full"
                    formik={formik}
                  />
                  <div className="w-full">
                    <CustomInput
                      labelFor="address"
                      label="Enter Address"
                      inputType="text"
                      placeholder="Enter Address"
                      maxW="w-full"
                      formik={formik}
                    />
                  </div>
                  <div className="">
                    <FormSelect
                      labelFor="role"
                      label="Assign Role"
                      formik={formik}
                      options={formatApiDataForDropdown(adminRoles, 'name', 'id')}
                      useTouched
                      scrollableOptions
                      scrollableHeight="max-h-[15rem]"
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
                    width="8rem"
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
            addStaffUserRequestMutation.mutate(staffUserRequest);
          }}
        />
      )}

      {modals.creationSuccessful && (
        <ModalWrapper
          isOpen={modals.creationSuccessful}
          setIsOpen={() => closeModal('creationSuccessful')}
          title={'Success!!'}
          info={'You have successfully added this user and your request is pending approval'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            formik.resetForm();
            closeModal('creationSuccessful');
            navigate(`/${appRoutes.adminDashboard.staffUserManagement.index}`);
          }}
        />
      )}
    </>
  );
}

export default AddUser;
