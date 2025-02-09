import { Link, useNavigate } from 'react-router-dom';
import appRoutes from 'utils/constants/routes';
import ChevronRight from 'assets/icons/ChevronRight';
import CustomInput from 'components/FormElements/CustomInput';
import ButtonComponent from 'components/FormElements/Button';
import { useEffect, useRef, useState } from 'react';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import { ModalWrapper } from 'hoc/ModalWrapper';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import { useFormik } from 'formik';
import FormSelect from 'components/FormElements/FormSelect';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ProfileRequest, QueryParams, Role } from 'utils/interfaces';
import { getMerchants } from 'config/actions/merchant-actions';
import { filterSelectedOption, formatApiDataForDropdown } from 'utils/helpers';
import { getAccounts, getAccountsByMerchantId } from 'config/actions/account-actions';
import { createProfileSchema } from 'utils/formValidators';
import { addProfileRequest } from 'config/actions/profile-actions';
import { getRoles } from 'config/actions/role-permission-actions';
import { Designation } from 'utils/enums';

function CreateProfile() {
  const navigate = useNavigate();
  const [merchantRoles, setMerchantRoles] = useState<Role[]>([]);
  const [profileRequest, setProfileRequest] = useState<ProfileRequest>();
  const [inputTypeState, setInputTypeState] = useState(false);

  const onHandleInputType = () => {
    setInputTypeState(!inputTypeState);
  };
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
    initialValues: {
      merchantID: '',
      merchantName: '',
      accountID: '',
      accountNumber: '',
      firstName: '',
      lastName: '',
      email: '',
      role: '',
    },
    validationSchema: createProfileSchema,
    onSubmit: (values) => {
      const payload = {
        merchantID: values.merchantID,
        profileID: '',
        accountID: values.accountID,
        userName: `${values.firstName} ${values.lastName}`,
        role: values.role,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
      };
      setProfileRequest(payload);
      openModal('confirmCreate');
    },
  });

  const [queryParams, setQueryParams] = useState<QueryParams>({
    sortBy: 'asc',
    sortOrder: 'desc',
  });

  const { data } = useQuery({
    queryKey: ['merchants', queryParams],
    queryFn: ({ queryKey }) => getMerchants(queryKey[1] as QueryParams),
  });

  const { data: accountData, refetch: refetchAccountsOptions } = useQuery({
    queryKey: ['accounts', queryParams],
    queryFn: ({ queryKey }) =>
      formik.values.merchantID
        ? getAccountsByMerchantId(formik.values.merchantID)
        : getAccounts(queryKey[1] as QueryParams),
  });

  const { data: roles } = useQuery({
    queryKey: ['roles', queryParams],
    queryFn: ({ queryKey }) => getRoles(queryKey[1] as QueryParams),
  });

  const addProfileRequestMutation = useMutation({
    mutationFn: (payload: ProfileRequest | undefined) => addProfileRequest(payload),
    onSuccess: () => {
      openModal('creationSuccessful');
    },
    onError: (error) => {
      closeModal('confirmCreate');
    },
  });

  useEffect(() => {
    const filteredRoles = roles?.responseData?.items?.filter(
      (role: Role) => role.designation === Designation.Merchant,
    );
    setMerchantRoles(filteredRoles);
  }, [roles]);

  const refetchAccountRef = useRef(false);

  useEffect(() => {
    if (formik.values.merchantName?.length > 0) {
      const merchantDetails = data?.responseData?.items.find((item: any) => {
        return item.name === formik.values.merchantName;
      });
      formik.setFieldValue('merchantID', merchantDetails?.id);
    }
  }, [formik.values.merchantName]);

  useEffect(() => {
    if (!refetchAccountRef.current) {
      refetchAccountRef.current = true;
      return;
    } else {
      const getData = async () => {
        await refetchAccountsOptions();
      };
      getData();
      formik.setFieldValue('accountNumber', '');
      formik.setFieldValue('accountID', '');
    }
  }, [formik.values.merchantID]);

  useEffect(() => {
    if (formik.values.accountNumber?.length > 0) {
      const accountDetails = accountData?.responseData?.items.find((item: any) => {
        return item.accountNumber === formik.values.accountNumber;
      });
      formik.setFieldValue('accountID', accountDetails?.id);
    }
  }, [formik.values.accountNumber]);

  return (
    <>
      <div className="px-5 py-1">
        <div className="slide-down mt-2 flex items-center gap-2 text-lg">
          <Link
            to={`/${appRoutes.adminDashboard.profileManagement.index}`}
            className="cursor-pointer text-darkgray"
          >
            Profile Management
          </Link>{' '}
          <ChevronRight />
          <span className="text-lightPurple">Add Profile</span>
        </div>
        <div className="slide-down mt-3 flex items-center justify-between">
          <h2 className="mt-3 text-xl font-semibold">Add New Profile </h2>
        </div>
        <div className="slide-down mt-5 rounded-lg bg-white px-5 py-10">
          <div className="rounded-[5px] border-[3px] border-grayPrimary px-6 py-8">
            <form onSubmit={formik.handleSubmit} noValidate className="relative w-full">
              <div className="">
                <div className="relative grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                  <FormSelect
                    labelFor="merchantName"
                    label="Merchant Name"
                    formik={formik}
                    useTouched
                    options={formatApiDataForDropdown(data?.responseData?.items, 'name', 'name')}
                    scrollableOptions
                    scrollableHeight="max-h-[15rem]"
                  />
                  <CustomInput
                    labelFor="merchantID"
                    label="Merchant ID"
                    inputType="text"
                    placeholder="Enter here"
                    maxW="w-full"
                    formik={formik}
                    disabled={formik.values.merchantID?.length > 0}
                  />
                  <FormSelect
                    labelFor="accountNumber"
                    label="Account Number"
                    formik={formik}
                    useTouched
                    options={formatApiDataForDropdown(
                      accountData?.responseData?.items,
                      'accountNumber',
                      'accountNumber',
                    )}
                    scrollableOptions
                    scrollableHeight="max-h-[15rem]"
                  />
                  <CustomInput
                    labelFor="accountID"
                    label="Account Id"
                    inputType="text"
                    placeholder="Enter here"
                    maxW="w-full"
                    formik={formik}
                    disabled={formik.values.accountID?.length > 0}
                  />
                  <CustomInput
                    labelFor="firstName"
                    label="First Name"
                    inputType="text"
                    placeholder="Enter here"
                    maxW="w-full"
                    formik={formik}
                  />
                  <CustomInput
                    labelFor="lastName"
                    label="Last Name"
                    inputType="text"
                    placeholder="Enter here"
                    maxW="w-full"
                    formik={formik}
                  />
                  <CustomInput
                    labelFor="email"
                    label="Email Address"
                    inputType="text"
                    placeholder="Enter here"
                    maxW="w-full"
                    formik={formik}
                  />
                  <div className="">
                    <FormSelect
                      labelFor="role"
                      label="Assign Role"
                      formik={formik}
                      useTouched
                      options={formatApiDataForDropdown(merchantRoles, 'name', 'id')}
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
                    title="Add Profile"
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
          title={'Add Profile?'}
          info={'You are about to add this profile, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          loading={addProfileRequestMutation.isPending}
          proceedAction={() => {
            closeModal('confirmCreate');
            addProfileRequestMutation.mutate(profileRequest);
          }}
        />
      )}

      {modals.creationSuccessful && (
        <ModalWrapper
          isOpen={modals.creationSuccessful}
          setIsOpen={() => closeModal('creationSuccessful')}
          title={'Success!!'}
          info={'You have successfully added this profile and your request is pending approval'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('creationSuccessful');
            navigate(`/${appRoutes.adminDashboard.profileManagement.index}`);
          }}
        />
      )}
    </>
  );
}

export default CreateProfile;
