import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import FormContentContainer from 'components/common/ItemDetailsContainer/FormContentContainer';
import ButtonComponent from 'components/FormElements/Button';
import CustomInput from 'components/FormElements/CustomInput';
import FormDatePicker from 'components/FormElements/FormDatePicker';
import { useFormik } from 'formik';
import { ModalWrapper } from 'hoc/ModalWrapper';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appRoutes from 'utils/constants/routes';
import CustomFileUpload from 'components/FormElements/CustomFileUpload';
import { createMandateSchema } from 'utils/formValidators';
import FormSelect from 'components/FormElements/FormSelect';
import { MandateRequest, QueryParams } from 'utils/interfaces';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addMandateRequest } from 'config/actions/dashboard-actions';
import { formatApiDataForDropdown, notifyError } from 'utils/helpers';
import dayjs from 'dayjs';
import {
  dailyFrequencyOptions,
  frequencyOptions,
  monthlyFrequencyOptions,
  serviceOptions,
  weeklyFrequencyOptions,
} from 'utils/constants';
import { getAccounts, getAccountsByMerchantId } from 'config/actions/account-actions';
import { getMerchants } from 'config/actions/merchant-actions';

const SingleUpload = () => {
  const navigate = useNavigate();
  const [mandateRequest, setMandateRequest] = useState<MandateRequest>();

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

  const addMandateRequestMutation = useMutation({
    mutationFn: (payload: MandateRequest | undefined) => addMandateRequest(payload),
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
      mandateType: '',
      merchantId: '',
      startDate: null,
      endDate: null,
      supportingDocument: '',
      productId: '',
      amount: '',
      dayToApply: '',
      frequency: '',
      service: '',
      accountName: '',
      accountNumber: '',
      accountId: '',
      bankCode: '',
      narration: '',
      payerName: '',
      payerEmailAddress: '',
      payerPhoneNumber: '',
      payerAddress: '',
      payeeName: '',
      payeeEmailAddress: '',
      payeePhoneNumber: '',
      payeeAddress: '',
      biller: '',
      billerId: '',
      billerCode: '',
      billerAccountNumber: '',
      billerAccountName: '',
      billerBankCode: '',
      billerBankName: '',
    },
    validationSchema: createMandateSchema,
    onSubmit: (values) => {
      const formattedStartDate = dayjs(values.startDate).toISOString();
      const formattedEndDate = dayjs(values.endDate).toISOString();
      const payload = {
        mandateId: '',
        mandateCode: '',
        merchantId: values.merchantId,
        accountId: values.accountId,
        productId: values.productId,
        amount: parseFloat(values.amount),
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        dayToApply: values.dayToApply,
        mandateType: values.mandateType,
        frequency: values.frequency,
        service: values.service,
        accountName: values.accountName,
        accountNumber: values.accountNumber,
        bankCode: values.bankCode,
        supportingDocument: values.supportingDocument,
        narration: values.narration,
        payerName: values.payerName,
        payeeName: values.payeeName,
        payerEmailAddress: values.payerEmailAddress,
        payerPhoneNumber: values.payerPhoneNumber,
        payerAddress: values.payerAddress,
        payeeEmailAddress: values.payeeEmailAddress,
        payeePhoneNumber: values.payeePhoneNumber,
        payeeAddress: values.payeePhoneNumber,
        biller: values.biller,
        billerID: values.billerId,
        billerCode: values.billerCode,
        billerAccountNumber: values.billerAccountNumber,
        bankName: values.billerBankName,
      };
      setMandateRequest(payload);
      openModal('confirmCreate');
    },
  });

  const getDayToApplyOptions = () => {
    if (formik.values.frequency === 'Daily') {
      return dailyFrequencyOptions;
    } else if (formik.values.frequency === 'Weekly') {
      return weeklyFrequencyOptions;
    } else if (formik.values.frequency === 'Monthly') {
      return monthlyFrequencyOptions;
    }
    return dailyFrequencyOptions;
  };

  const dayToApplyOptions = getDayToApplyOptions();

  const [queryParams, setQueryParams] = useState<QueryParams>({
    sortBy: 'asc',
    sortOrder: 'desc',
  });

  const { data: merchantData } = useQuery({
    queryKey: ['merchants', queryParams],
    queryFn: ({ queryKey }) => getMerchants(queryKey[1] as QueryParams),
  });

  const { data: accountData, refetch: refetchAccountsOptions } = useQuery({
    queryKey: ['accounts', queryParams],
    queryFn: ({ queryKey }) =>
      formik.values.merchantId
        ? getAccountsByMerchantId(formik.values.merchantId)
        : getAccounts(queryKey[1] as QueryParams),
  });

  useEffect(() => {
    refetchAccountsOptions();
  }, [formik.values.merchantId]);

  return (
    <>
      <div className="slide-down mt-5 rounded-lg bg-white px-5 py-10">
        <form onSubmit={formik.handleSubmit} noValidate className="relative w-full">
          <div className="">
            <FormContentContainer
              title="Mandate Details"
              titleExtension={
                <>
                  <div className="flex items-center justify-end gap-2 text-lg">
                    <p className="font-semibold">Mandate Type:</p>
                    <div className="relative flex items-center gap-2 rounded-lg bg-lilacPurple px-4 py-4">
                      <div className="flex items-center gap-1">
                        <label htmlFor="variable">
                          <input
                            type="radio"
                            className="h-4 w-4"
                            name="variable"
                            value={'Variable'}
                            checked={formik.values.mandateType === 'Variable'}
                            onChange={() => formik.setFieldValue('mandateType', 'Variable')}
                          />
                        </label>
                        <p>Variable</p>
                      </div>
                      <div className="ml-2 flex items-center gap-1">
                        <label htmlFor="fixed">
                          <input
                            type="radio"
                            className="h-4 w-4"
                            name="fixed"
                            value={'Fixed'}
                            checked={formik.values.mandateType === 'Fixed'}
                            onChange={() => formik.setFieldValue('mandateType', 'Fixed')}
                          />
                        </label>
                        <p>Fixed</p>
                      </div>
                      {(formik.touched.mandateType as any) &&
                        (formik.errors.mandateType as any) && (
                          <p className="absolute top-10 text-xs text-red-400">
                            {formik.errors.mandateType as any}
                          </p>
                        )}
                    </div>
                  </div>
                </>
              }
            >
              <div className="w-full md:col-span-1">
                <FormSelect
                  labelFor="merchantId"
                  label="Merchant ID"
                  formik={formik}
                  useTouched
                  options={formatApiDataForDropdown(merchantData?.responseData?.items, 'id', 'id')}
                  scrollableOptions
                  scrollableHeight="max-h-[15rem]"
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="productId"
                  label="Product ID"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="amount"
                  label="Amount"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="w-full md:col-span-1">
                <FormDatePicker
                  name={'startDate'}
                  formik={formik}
                  label="Start Date"
                  placeholder="Select date"
                  useTouched
                />
              </div>
              <div className="w-full md:col-span-1">
                <FormDatePicker
                  name={'endDate'}
                  formik={formik}
                  label="End Date"
                  placeholder="Select date"
                  useTouched
                />
              </div>
              <div className="md:col-span-1">
                <FormSelect
                  labelFor="frequency"
                  label="Frequency"
                  formik={formik}
                  options={frequencyOptions}
                  useTouched
                />
              </div>
              <div className="md:col-span-1">
                <FormSelect
                  labelFor="dayToApply"
                  label="Day to Apply"
                  formik={formik}
                  options={dayToApplyOptions}
                  useTouched
                  scrollableOptions
                />
              </div>
              <div className="md:col-span-1">
                <FormSelect
                  labelFor="service"
                  label="Service"
                  formik={formik}
                  options={serviceOptions}
                  scrollableOptions
                  scrollableHeight="max-h-[15rem]"
                  useTouched
                />
              </div>
              <div className="w-full md:col-span-1">
                <FormSelect
                  labelFor="accountName"
                  label="Account Name"
                  formik={formik}
                  useTouched
                  options={formatApiDataForDropdown(
                    accountData?.responseData?.items,
                    'accountName',
                    'accountName',
                  )}
                  scrollableOptions
                  scrollableHeight="max-h-[15rem]"
                />
              </div>
              <div className="w-full md:col-span-1">
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
              </div>
              <div className="w-full md:col-span-1">
                <FormSelect
                  labelFor="accountId"
                  label="Account Id"
                  formik={formik}
                  useTouched
                  options={formatApiDataForDropdown(accountData?.responseData?.items, 'id', 'id')}
                  scrollableOptions
                  scrollableHeight="max-h-[15rem]"
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="bankCode"
                  label="Bank Code"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomFileUpload
                  labelFor="supportingDocument"
                  label="Upload Supporting Document"
                  formik={formik}
                />
              </div>
              <div className="w-full md:col-span-2">
                <CustomInput
                  labelFor="narration"
                  label="Narration"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
            </FormContentContainer>
          </div>
          <div className="mt-10">
            <FormContentContainer title="Payer Details">
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="payerName"
                  label="Payer Name"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="payerEmailAddress"
                  label="Payer Email Address"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="payerPhoneNumber"
                  label="Payer Phone Number"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="w-full md:col-span-3">
                <CustomInput
                  labelFor="payerAddress"
                  label="Address"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
            </FormContentContainer>
          </div>
          <div className="mt-10">
            <FormContentContainer title="Payee Details">
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="payeeName"
                  label="Payee Name"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="payeeEmailAddress"
                  label="Payee Email Address"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="payeePhoneNumber"
                  label="Payee Phone Number"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="w-full md:col-span-3">
                <CustomInput
                  labelFor="payeeAddress"
                  label="Address"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
            </FormContentContainer>
          </div>
          <div className="mt-10">
            <FormContentContainer title="Biller Details">
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="biller"
                  label="Biller"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="billerId"
                  label="Biller Id"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="billerCode"
                  label="Biller Code"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="billerAccountNumber"
                  label="Biller Account Number"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="billerAccountName"
                  label="Account Name"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="billerBankCode"
                  label="Bank Code"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="billerBankName"
                  label="Bank Name"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
            </FormContentContainer>
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
                    navigate(`/${appRoutes.adminDashboard.mandateManagement.index}`);
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
                  title="Add Mandate"
                  customPaddingX="1.5rem"
                  width="10rem"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      {modals.confirmCreate && (
        <ModalWrapper
          isOpen={modals.confirmCreate}
          setIsOpen={() => closeModal('confirmCreate')}
          title={'Add Mandate?'}
          info={'You are about to add a new mandate, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          loading={addMandateRequestMutation.isPending}
          proceedAction={() => {
            closeModal('confirmCreate');
            addMandateRequestMutation.mutate(mandateRequest);
          }}
        />
      )}

      {modals.creationSuccessful && (
        <ModalWrapper
          isOpen={modals.creationSuccessful}
          setIsOpen={() => closeModal('creationSuccessful')}
          title={'Success!!'}
          info={'You have successfully added a new mandate'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            formik.resetForm();
            closeModal('creationSuccessful');
            navigate(`/${appRoutes.adminDashboard.mandateManagement.index}`);
          }}
        />
      )}
    </>
  );
};

export default SingleUpload;
