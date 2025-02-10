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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AccountRequest, QueryParams } from 'utils/interfaces';
import { createAccountSchema } from 'utils/formValidators';
import { getAccountById, updateAccountRequest } from 'config/actions/account-actions';
import { getMerchants, validateMerchantCif } from 'config/actions/merchant-actions';
import FormSelect from 'components/FormElements/FormSelect';
import { formatApiDataForDropdown, notifyError, notifySuccess } from 'utils/helpers';

function EditAccount() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const accountId = searchParams?.get('id') || undefined;
  const [accountRequest, setAccountRequest] = useState<AccountRequest>();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [merchantAccountValidated, setMerchantAccountValidated] = useState(false);

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

  const formik = useFormik({
    initialValues: {
      merchantId: '',
      merchantName: '',
      accountName: '',
      accountNumber: '',
    },
    validationSchema: createAccountSchema,
    onSubmit: (values) => {
      if (!merchantAccountValidated) {
        return notifyError(
          'Account number needs to be validated successfully before you can proceed',
        );
      }
      const payload = {
        accountId: accountId,
        merchantId: values.merchantId,
        merchantName: values.merchantName,
        accountName: values.accountName,
        accountNumber: values.accountNumber,
      };
      setAccountRequest(payload);
      openModal('confirmEdit');
    },
  });

  const { data: accountData } = useQuery({
    queryKey: ['accounts', accountId],
    queryFn: ({ queryKey }) => getAccountById(queryKey[1]),
  });

  useEffect(() => {
    formik.setValues({
      merchantId: accountData?.responseData?.merchantId || '',
      merchantName: accountData?.responseData?.merchantName || '',
      accountName: accountData?.responseData?.accountName || '',
      accountNumber: accountData?.responseData?.accountNumber || '',
    });
  }, [accountData]);

  const [queryParams, setQueryParams] = useState<QueryParams>({
    sortBy: 'asc',
    sortOrder: 'desc',
  });

  const { data } = useQuery({
    queryKey: ['merchants', queryParams],
    queryFn: ({ queryKey }) => getMerchants(queryKey[1] as QueryParams),
  });

  const updateAccountMutation = useMutation({
    mutationFn: ({
      requestId,
      payload,
    }: {
      requestId: string | undefined;
      payload: AccountRequest | undefined;
    }) => updateAccountRequest(requestId, payload),
    onSuccess: () => {
      openModal('editSuccessful');
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
    onError: (error) => {
      closeModal('editSuccessful');
    },
  });

  const validateAccountNumber = async () => {
    setMerchantAccountValidated(false);
    const res = await validateMerchantCif(formik.values.accountNumber);
    if (res && res.responseData?.businessName.length > 0) {
      setMerchantAccountValidated(true);
      formik.setFieldValue('accountName', res.responseData?.businessName || '');
      notifySuccess('Account name retrieved successfully');
    }
  };

  useEffect(() => {
    if (formik.values.merchantName?.length > 0) {
      const merchantDetails = data?.responseData?.items.find((item: any) => {
        return item.name === formik.values.merchantName;
      });
      formik.setFieldValue('merchantId', merchantDetails?.id);
    }
  }, [formik.values.merchantName]);

  useEffect(() => {
    const accountNumber = formik.values.accountNumber;
    if (accountNumber.length === 10) {
      if (timeoutId) clearTimeout(timeoutId);
      const newTimeoutId = setTimeout(() => {
        validateAccountNumber();
      }, 1000);
      setTimeoutId(newTimeoutId);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [formik.values.accountNumber]);
  return (
    <>
      <div className="px-5 py-1">
        <div className="slide-down mt-2 flex items-center gap-2 text-lg">
          <Link
            to={`/${appRoutes.adminDashboard.accountManagement.index}`}
            className="cursor-pointer text-darkgray"
          >
            Account Management
          </Link>{' '}
          <ChevronRight />
          <span className="text-lightPurple">Edit Account</span>
        </div>
        <div className="slide-down mt-3 flex items-center justify-between">
          <h2 className="mt-3 text-xl font-semibold">Modify Account Details</h2>
        </div>
        <div className="slide-down mt-5 rounded-lg bg-white px-5 py-10">
          <div className="w-full rounded-[5px] border-[3px] border-grayPrimary px-6 py-8 2xl:w-[80%]">
            <form onSubmit={formik.handleSubmit} noValidate className="relative w-full">
              <div className="slide-down">
                <div className="relative grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
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
                    labelFor="merchantId"
                    label="Merchant ID"
                    inputType="text"
                    placeholder="Enter here"
                    maxW="w-full"
                    formik={formik}
                    disabled
                    // disabled={
                    //   formik.values.merchantName?.length > 0 && formik.values.merchantId?.length > 0
                    // }
                  />
                  <CustomInput
                    labelFor="accountNumber"
                    label="Account Number"
                    inputType="text"
                    mode="numeric"
                    pattern="\d*"
                    placeholder="Enter here"
                    maxW="w-full"
                    formik={formik}
                  />
                  <CustomInput
                    labelFor="accountName"
                    label="Account Name"
                    inputType="text"
                    placeholder="Enter here"
                    maxW="w-full"
                    formik={formik}
                  />
                </div>
                <div className="mt-6 flex items-center justify-end">
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
            'You are about to save changes made to this account, would you want to proceed with this?'
          }
          icon={<RedAlertIcon />}
          type={'confirmation'}
          loading={updateAccountMutation.isPending}
          proceedAction={() => {
            closeModal('confirmEdit');
            updateAccountMutation.mutate({ requestId: accountId, payload: accountRequest });
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
            closeModal('editSuccessful');
            navigate(`/${appRoutes.adminDashboard.accountManagement.index}`);
          }}
        />
      )}
    </>
  );
}

export default EditAccount;
