import { Link, useNavigate, useSearchParams } from 'react-router-dom';
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
import { getStaffUserById, updateStaffUserRequest } from 'config/actions/staff-user-actions';
import { createStaffUserSchema } from 'utils/formValidators';
import { formatApiDataForDropdown } from 'utils/helpers';
import { getRoles } from 'config/actions/role-permission-actions';
import { Designation } from 'utils/enums';

function EditUser() {
  const navigate = useNavigate();
  const [adminRoles, setAdminRoles] = useState<Role[]>([]);
  const [searchParams] = useSearchParams();
  const staffUserId = searchParams?.get('id') || '';
  const [staffUserRequest, setStaffUserRequest] = useState<StaffUserRequest>();
  const [modals, setModals] = useState({
    confirmEdit: false,
    editSuccessful: false,
  });

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const updateStaffUserRequestMutation = useMutation({
    mutationFn: (requestId: string | undefined) =>
      updateStaffUserRequest(requestId, staffUserRequest),
    onSuccess: () => {
      closeModal('confirmEdit');
      openModal('editSuccessful');
    },
    onError: (error) => {
      closeModal('confirmEdit');
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
        userName: `${values.firstName} ${values.lastName}`,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: `${values.phoneNumber}`,
        branch: values.branch,
        role: values.role,
        address: values.address,
      };
      setStaffUserRequest(payload);
      openModal('confirmEdit');
    },
  });

  const [queryParams, setQueryParams] = useState<QueryParams>({
    sortBy: 'asc',
    sortOrder: 'desc',
  });

  const { data: userData, refetch } = useQuery({
    queryKey: ['users', staffUserId],
    queryFn: ({ queryKey }) => getStaffUserById(queryKey[1]),
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
    formik.setValues({
      userName: userData?.responseData?.userName || '',
      firstName: userData?.responseData?.firstName || '',
      lastName: userData?.responseData?.lastName || '',
      staffId: userData?.responseData?.staffId || '',
      email: userData?.responseData?.email || '',
      phoneNumber: userData?.responseData?.phoneNumber || '',
      branch: userData?.responseData?.branch || '',
      role: userData?.responseData?.role || '',
      address: userData?.responseData?.address || '',
    });
  }, [userData]);

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
          <span className="text-lightPurple">Edit User</span>
        </div>
        <div className="slide-down mt-3 flex items-center justify-between">
          <h2 className="mt-3 text-xl font-semibold">Modify User Details </h2>
        </div>
        <div className="slide-down mt-5 rounded-lg bg-white px-5 py-10">
          <div className="w-full rounded-[5px] border-[3px] border-grayPrimary px-6 py-8 2xl:w-[80%]">
            <form onSubmit={formik.handleSubmit} noValidate className="relative w-full">
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
                    disabled
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
                    title="Save"
                    width="7rem"
                    customPaddingX="1.4rem"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {modals.confirmEdit && (
        <ModalWrapper
          isOpen={modals.confirmEdit}
          setIsOpen={() => closeModal('confirmEdit')}
          title={'Save Changes?'}
          info={
            'You are about to save changes made to this user, would you want to proceed with this?'
          }
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            closeModal('confirmEdit');
            updateStaffUserRequestMutation.mutate(staffUserId);
          }}
        />
      )}

      {modals.editSuccessful && (
        <ModalWrapper
          isOpen={modals.editSuccessful}
          setIsOpen={() => closeModal('editSuccessful')}
          title={'Success!!'}
          info={'You have successfully saved new changes and your request is pending approval'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            formik.resetForm();
            closeModal('editSuccessful');
            navigate(`/${appRoutes.adminDashboard.staffUserManagement.index}`);
          }}
        />
      )}
    </>
  );
}

export default EditUser;
