import { useCallback, useEffect, useState } from 'react';
import Tab from 'components/Tabs';
import { Link, useNavigate } from 'react-router-dom';
import { useTabContext } from '../../../context/TabContext';
import appRoutes from 'utils/constants/routes';
import CustomInput from 'components/FormElements/CustomInput';
import ButtonComponent from 'components/FormElements/Button';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import { ModalWrapper } from 'hoc/ModalWrapper';
import { ArrowRightIcon, CloseIcon, DownloadIcon, SuccessModalIcon } from 'assets/icons';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { useFormik } from 'formik';
import { createMandateSchema } from 'utils/formValidators';
import dayjs from 'dayjs';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addBulkMandateRequest, addMandateRequest } from 'config/actions/dashboard-actions';
import { MandateRequest, MerchantAuthData, QueryParams } from 'utils/interfaces';
import {
  convertExcelArrayToObjects,
  filterSelectedOption,
  formatApiDataForDropdown,
  getUserFromLocalStorage,
  isFileSizeValid,
  matchesInterface,
  notifyError,
} from 'utils/helpers';
import FormDatePicker from 'components/FormElements/FormDatePicker';
import CustomFileUpload from 'components/FormElements/CustomFileUpload';
import FormSelect from 'components/FormElements/FormSelect';
import {
  dailyFrequencyOptions,
  frequencyOptions,
  monthlyFrequencyOptions,
  serviceOptions,
  weeklyFrequencyOptions,
} from 'utils/constants';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import { getMerchants } from 'config/actions/merchant-actions';
import { getAccounts, getAccountsByMerchantId } from 'config/actions/account-actions';
import * as XLSX from 'utils/libs/xlsx.mjs';

const CreateMandate = () => {
  const { tab, setTab } = useTabContext();

  const [mandateRequest, setMandateRequest] = useState<MandateRequest>();
  const navigate = useNavigate();
  const [jsonData, setJsonData] = useState<any[]>([]);
  const [formattedBulkData, setFormattedBulkData] = useState<MandateRequest[]>([]);

  const [modals, setModals] = useState({
    addMandate: false,
    confirmAddMandate: false,
    addBulkMandate: false,
    confirmAddBulkMandate: false,
  });

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    try {
      acceptedFiles.forEach((file: FileWithPath) => {
        if (file) {
          if (!isFileSizeValid(file.size, 500)) {
            throw 'File should be lesser than or equal to 100MB';
          }
          const reader = new FileReader();
          reader.onload = (e) => {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const sheetJson = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            setJsonData(sheetJson);
          };
          reader.readAsArrayBuffer(file);
        }
      });
    } catch (error: any) {
      notifyError(error);
    }
  }, []);

  let { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls', '.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx', '.csv'],
    },
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[] | undefined>();

  const clearFiles = () => {
    setUploadedFiles([]);
    acceptedFiles = [];
  };

  useEffect(() => {
    setUploadedFiles(acceptedFiles as any);
  }, [acceptedFiles]);

  const referenceObject: MandateRequest = {
    mandateId: '',
    merchantId: '',
    accountId: '',
    mandateCode: '',
    productId: '',
    amount: 0,
    startDate: '',
    endDate: '',
    dayToApply: '',
    mandateType: '',
    frequency: '',
    service: '',
    accountName: '',
    accountNumber: '',
    bankCode: '',
    supportingDocument: '',
    narration: '',
    payerName: '',
    payeeName: '',
    payerEmailAddress: '',
    payerPhoneNumber: '',
    payerAddress: '',
    payeeEmailAddress: '',
    payeePhoneNumber: '',
    payeeAddress: '',
    biller: '',
    billerID: '',
    billerAccountNumber: '',
    billerCode: '',
    bankName: '',
  };

  useEffect(() => {
    const newDataArray = convertExcelArrayToObjects(
      jsonData,
      ['mandateId', 'mandateCode', 'supportingDocument'],
      ['mandateId', 'mandateCode', 'supportingDocument'],
    );
    const dataMatch = newDataArray.some((obj) => matchesInterface(obj, referenceObject));
    if (jsonData.length > 0 && !dataMatch) {
      notifyError('Incorrect data format');
      clearFiles();
      return;
    } else {
      setFormattedBulkData(newDataArray as MandateRequest[]);
    }
  }, [jsonData]);

  const files = acceptedFiles.map((file, index) => (
    <li key={index}>
      {file.name} - {file.size} bytes
    </li>
  ));

  const formik = useFormik({
    initialValues: {
      variableType: '',
      merchantId: '',
      productId: '',
      amount: '',
      startDate: null,
      endDate: null,
      dayToApply: '',
      mandateType: '',
      frequency: '',
      service: '',
      accountName: '',
      accountNumber: '',
      accountId: '',
      bankCode: '',
      supportingDocument: '',
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
        productId: values.productId,
        amount: parseFloat(values.amount),
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        dayToApply: values.dayToApply,
        mandateType: values.mandateType,
        frequency: values.frequency,
        service: values.service,
        accountName: values.accountName,
        accountNumber: `${values.accountNumber}`,
        accountId: values.accountId,
        bankCode: values.bankCode,
        supportingDocument: values.supportingDocument,
        narration: values.narration,
        payerName: values.payerName,
        payeeName: values.payeeName,
        payerEmailAddress: values.payerEmailAddress,
        payerPhoneNumber: `${values.payerPhoneNumber}`,
        payerAddress: values.payerAddress,
        payeeEmailAddress: values.payeeEmailAddress,
        payeePhoneNumber: `${values.payeePhoneNumber}`,
        payeeAddress: values.payeeAddress,
        biller: values.biller,
        billerID: values.billerId,
        billerCode: values.billerCode,
        billerAccountNumber: `${values.billerAccountNumber}`,
        bankName: values.billerBankName,
      };
      setMandateRequest(payload);
      openModal('addMandate');
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

  const user = getUserFromLocalStorage() as MerchantAuthData;
  const loggedInMerchantId = user?.profileData?.merchantID;

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

  const addMandateRequestMutation = useMutation({
    mutationFn: (payload: MandateRequest | undefined) => addMandateRequest(payload),
    onSuccess: () => {
      closeModal('addMandate');
      openModal('confirmAddMandate');
    },
    onError: (error) => {
      closeModal('addMandate');
    },
  });

  const addBulkMandateMutation = useMutation({
    mutationFn: (payload: MandateRequest[] | undefined) => addBulkMandateRequest(payload),
    onSuccess: () => {
      closeModal('addBulkMandate');
      openModal('confirmAddBulkMandate');
    },
    onError: (error) => {
      closeModal('addBulkMandate');
    },
  });

  useEffect(() => {
    refetchAccountsOptions();
  }, [formik.values.merchantId]);

  const minStartDate = () => {
    const date = new Date();
    return date.setDate(date.getDate() + 30);
  };

  return (
    <>
      <div className="px-5 py-5">
        <div className="flex items-center gap-4">
          <Link
            to={`/${appRoutes.merchantDashboard.mandateManagement.index}`}
            className="cursor-pointer text-sm text-darkgray"
          >
            Mandate Management
          </Link>
          <ArrowRightIcon />
          <span className="text-sm font-semibold text-lightPurple">Create Mandate</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <h2 className="mt-3 text-xl font-semibold">Create Mandate</h2>
        </div>
        <div className="mt-5 flex items-center gap-8">
          <Tab
            label="Single Upload"
            isActive={tab === 1}
            onClick={() => setTab(1)}
            inactiveColor="text-[#334335]"
          />
          <Tab
            label="Bulk Upload"
            isActive={tab === 2}
            onClick={() => setTab(2)}
            inactiveColor="text-[#334335]"
          />
        </div>
        {tab === 1 && (
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-5 rounded-lg bg-white px-5 py-10">
              <div className="rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
                <div className="flex items-center justify-between">
                  <p className="my-3 text-lg font-semibold">Mandate Details</p>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Mandate Type:</p>
                    <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-3">
                      <div className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="mandateType"
                          value="Variable"
                          className="h-4 w-4"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          checked={formik.values.mandateType === 'Variable'}
                        />
                        <label htmlFor="variableType-variable">Variable</label>
                      </div>
                      <div className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="mandateType"
                          value="Fixed"
                          className="h-4 w-4"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          checked={formik.values.mandateType === 'Fixed'}
                        />
                        <label htmlFor="mandateType-fixed">Fixed</label>
                      </div>
                      {formik.touched.variableType && formik.errors.variableType && (
                        <p className="text-red-400">{formik.errors.variableType}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-2 h-[2px] w-full bg-grayPrimary"></div>
                <div className="mt-5 pb-10">
                  <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
                    <FormSelect
                      labelFor="merchantId"
                      label="Merchant ID"
                      formik={formik}
                      useTouched
                      options={formatApiDataForDropdown(
                        filterSelectedOption(
                          loggedInMerchantId,
                          'id',
                          merchantData?.responseData?.items,
                        ),
                        'id',
                        'id',
                      )}
                      scrollableOptions
                      scrollableHeight="max-h-[15rem]"
                    />
                    <CustomInput
                      labelFor="bankCode"
                      label="Bank Code"
                      containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 w-full"
                      inputStyles="h-[40px] w-full px-2 focus:outline-none focus:ring-0"
                      inputType="text"
                      placeholder="Enter here"
                      formik={formik}
                    />
                    <CustomInput
                      labelFor="productId"
                      label="Product ID"
                      containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 w-full"
                      inputStyles="h-[40px] w-full px-2 focus:outline-none focus:ring-0"
                      inputType="text"
                      placeholder="Enter here"
                      formik={formik}
                    />
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
                    <CustomInput
                      labelFor="amount"
                      label="Amount"
                      containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 w-full"
                      inputStyles="h-[40px] w-full px-2 focus:outline-none focus:ring-0"
                      inputType="number"
                      placeholder="Enter here"
                      formik={formik}
                    />
                    <FormDatePicker
                      name={'startDate'}
                      formik={formik}
                      label="Start Date"
                      placeholder="Select date"
                      height="50px"
                      minDate={minStartDate()}
                    />
                    <FormDatePicker
                      name={'endDate'}
                      formik={formik}
                      label="End Date"
                      placeholder="Select date"
                      height="50px"
                    />
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-20 lg:grid-cols-3 lg:gap-10">
                    <FormSelect
                      labelFor="frequency"
                      label="Frequency"
                      formik={formik}
                      options={frequencyOptions}
                    />

                    <FormSelect
                      labelFor="dayToApply"
                      label="Day to Apply"
                      formik={formik}
                      options={dayToApplyOptions}
                    />

                    <FormSelect
                      labelFor="service"
                      label="Service"
                      formik={formik}
                      options={serviceOptions}
                    />
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
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
                    <FormSelect
                      labelFor="accountId"
                      label="Account Id"
                      formik={formik}
                      useTouched
                      options={formatApiDataForDropdown(
                        accountData?.responseData?.items,
                        'id',
                        'id',
                      )}
                      scrollableOptions
                      scrollableHeight="max-h-[15rem]"
                    />
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
                    <div className="col-span-3 lg:col-span-1">
                      <CustomFileUpload
                        labelFor="supportingDocument"
                        label="Upload Supporting Document"
                        formik={formik}
                      />
                    </div>
                    <div className="col-span-3 lg:col-span-2">
                      <CustomInput
                        labelFor="narration"
                        label="Narration"
                        containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 w-full"
                        inputStyles="h-[40px] w-full px-2 focus:outline-none focus:ring-0"
                        inputType="text"
                        placeholder="Enter here"
                        formik={formik}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
                <div className="flex items-center justify-between">
                  <p className="my-3 text-lg font-semibold">Payer Details</p>
                </div>
                <div className="mt-2 h-[2px] w-full bg-grayPrimary"></div>
                <div className="mt-10 pb-10">
                  <div className="mt-5 grid grid-cols-1 gap-10 lg:grid-cols-3">
                    <CustomInput
                      labelFor="payerName"
                      label="Payer Name"
                      containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 w-full"
                      inputStyles="h-[40px] w-full px-2 focus:outline-none focus:ring-0"
                      inputType="text"
                      placeholder="Enter here"
                      formik={formik}
                    />
                    <CustomInput
                      labelFor="payerEmailAddress"
                      label="Payer Email Address"
                      containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 w-full"
                      inputStyles="h-[40px] w-full px-2 focus:outline-none focus:ring-0"
                      inputType="text"
                      placeholder="Enter here"
                      formik={formik}
                    />
                    <CustomInput
                      labelFor="payerPhoneNumber"
                      label="Payer Phone Number"
                      containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 w-full"
                      inputStyles="h-[40px] w-full px-2 focus:outline-none focus:ring-0"
                      inputType="text"
                      mode="numeric"
                      pattern="\d*"
                      placeholder="Enter here"
                      formik={formik}
                    />
                  </div>

                  <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
                    <div className="col-span-3">
                      <CustomInput
                        labelFor="payerAddress"
                        label="Payer Address"
                        containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 w-full"
                        inputStyles="h-[40px] w-full px-2 focus:outline-none focus:ring-0"
                        inputType="text"
                        placeholder="Enter here"
                        formik={formik}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
                <div className="flex items-center justify-between">
                  <p className="my-3 text-lg font-semibold">Payee Details</p>
                </div>
                <div className="mt-2 h-[2px] w-full bg-grayPrimary"></div>
                <div className="mt-10 pb-10">
                  <div className="mt-5 grid grid-cols-1 gap-10 lg:grid-cols-3">
                    <CustomInput
                      labelFor="payeeName"
                      label="Payee Name"
                      containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 w-full"
                      inputStyles="h-[40px] w-full px-2 focus:outline-none focus:ring-0"
                      inputType="text"
                      placeholder="Enter here"
                      formik={formik}
                    />
                    <CustomInput
                      labelFor="payeeEmailAddress"
                      label="Payee Email Address"
                      containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 w-full"
                      inputStyles="h-[40px] w-full px-2 focus:outline-none focus:ring-0"
                      inputType="text"
                      placeholder="Enter here"
                      formik={formik}
                    />
                    <CustomInput
                      labelFor="payeePhoneNumber"
                      label="Payee Phone Number"
                      containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 w-full"
                      inputStyles="h-[40px] w-full px-2 focus:outline-none focus:ring-0"
                      inputType="text"
                      mode="numeric"
                      pattern="\d*"
                      placeholder="Enter here"
                      formik={formik}
                    />
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
                    <div className="col-span-3">
                      <CustomInput
                        labelFor="payeeAddress"
                        label="Payee Address"
                        containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 w-full"
                        inputStyles="h-[40px] w-full px-2 focus:outline-none focus:ring-0"
                        inputType="text"
                        placeholder="Enter here"
                        formik={formik}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
                <div className="flex items-center justify-between">
                  <p className="my-3 text-lg font-semibold">Biller Details</p>
                </div>
                <div className="mt-2 h-[2px] w-full bg-grayPrimary"></div>
                <div className="mt-10 pb-10">
                  <div className="mt-5 grid grid-cols-1 gap-10 lg:grid-cols-3">
                    <CustomInput
                      labelFor="biller"
                      label="Biller"
                      containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 w-full"
                      inputStyles="h-[40px] w-full px-2 focus:outline-none focus:ring-0"
                      inputType="text"
                      placeholder="Enter here"
                      formik={formik}
                    />
                    <CustomInput
                      labelFor="billerId"
                      label="Biller ID"
                      containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 w-full"
                      inputStyles="h-[40px] w-full px-2 focus:outline-none focus:ring-0"
                      inputType="text"
                      placeholder="Enter here"
                      formik={formik}
                    />
                    <CustomInput
                      labelFor="billerAccountNumber"
                      label="Biller Account Number"
                      containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 w-full"
                      inputStyles="h-[40px] w-full px-2 focus:outline-none focus:ring-0"
                      inputType="text"
                      mode="numeric"
                      pattern="\d*"
                      placeholder="Enter here"
                      formik={formik}
                    />
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
                    <CustomInput
                      labelFor="billerAccountName"
                      label="Biller Account Name"
                      containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 w-full"
                      inputStyles="h-[40px] w-full px-2 focus:outline-none focus:ring-0"
                      inputType="text"
                      placeholder="Enter here"
                      formik={formik}
                    />
                    <CustomInput
                      labelFor="billerBankCode"
                      label="Biller Bank Code"
                      containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 w-full"
                      inputStyles="h-[40px] w-full px-2 focus:outline-none focus:ring-0"
                      inputType="text"
                      placeholder="Enter here"
                      formik={formik}
                    />
                    <CustomInput
                      labelFor="billerBankName"
                      label="Biller Bank Name"
                      containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 w-full"
                      inputStyles="h-[40px] w-full px-2 focus:outline-none focus:ring-0"
                      inputType="text"
                      placeholder="Enter here"
                      formik={formik}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-end">
                <div className="flex items-center gap-5">
                  <ButtonComponent
                    onClick={() => closeModal('addMandate')}
                    title="Cancel"
                    border={1}
                    borderColor="#5C067C"
                    color="#5C067C"
                    width="150px"
                    height="40px"
                    fontWeight={600}
                  />
                  <ButtonComponent
                    title="Add Mandate"
                    backgroundColor="#5C068C"
                    hoverBackgroundColor="#5C067C"
                    type="submit"
                    color="white"
                    width="150px"
                    height="40px"
                    fontWeight={600}
                  />
                </div>
              </div>
            </div>
          </form>
        )}
        {tab === 2 && (
          <div className="mt-5 rounded-lg bg-white px-5 py-10">
            <div className="flex items-center justify-around rounded-[5px] border-[3px] border-dashed border-gray-200 px-6 py-10">
              <div className="flex h-auto w-auto items-center justify-around rounded-md bg-[#F0F0F0] px-40 py-10">
                <section>
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p className="text-center font-semibold">Drag and drop excel sheet</p>
                    <p className="text-center font-semibold">or</p>
                    <div className="flex items-center justify-around">
                      <button className="mt-2 flex items-center gap-2 rounded-lg border border-lightPurple px-4 py-2 text-center text-lightPurple">
                        <DownloadIcon /> Browse Document
                      </button>
                    </div>
                  </div>
                  <aside className="mt-4 flex flex-col">
                    <div className="text-sm text-lightPurple">{files}</div>
                  </aside>
                  {uploadedFiles && uploadedFiles.length > 0 && (
                    <button
                      onClick={clearFiles}
                      className="mt-3 flex scale-[90%] items-center justify-center rounded-full border border-lightPurple bg-gradient-to-r from-[#2F0248] via-yellow-800 to-[#5C068C] bg-clip-text p-1 text-center font-semibold text-transparent"
                    >
                      <CloseIcon />
                    </button>
                  )}
                </section>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-end">
              <div className="flex items-center gap-5">
                <ButtonComponent
                  onClick={() => closeModal('addMandate')}
                  title="Cancel"
                  border={1}
                  borderColor="#5C067C"
                  color="#5C067C"
                  width="143px"
                  height="40px"
                  fontWeight={600}
                />
                <ButtonComponent
                  onClick={() => {
                    if (!(jsonData.length > 0)) {
                      notifyError(
                        'Kindly upload excel file with the right data format to continue',
                      );
                      return;
                    }
                    openModal('addMandate');
                  }}
                  title="Upload Bulk Mandates"
                  backgroundColor="#5C068C"
                  hoverBackgroundColor="#5C067C"
                  color="white"
                  width="143px"
                  height="40px"
                  fontWeight={600}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {modals.addMandate && (
        <ModalWrapper
          isOpen={modals.addMandate}
          setIsOpen={() => closeModal('addMandate')}
          title={'Add Mandate?'}
          info={'You are about to add a new mandate, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            addMandateRequestMutation.mutate(mandateRequest);
            closeModal('addMandate');
          }}
        />
      )}
      {modals.confirmAddMandate && (
        <ModalWrapper
          isOpen={modals.confirmAddMandate}
          setIsOpen={() => closeModal('confirmAddMandate')}
          title={'Success!!'}
          info={'You have successfully added this mandate and your request is pending approval'}
          icon={<SuccessModalIcon />}
          type={'completed'}
          proceedAction={() => {
            formik.resetForm();
            closeModal('confirmAddMandate');
            navigate(`/${appRoutes.merchantDashboard.requests.index}`);
          }}
        />
      )}
      {modals.addBulkMandate && (
        <ModalWrapper
          isOpen={modals.addBulkMandate}
          setIsOpen={() => closeModal('addBulkMandate')}
          title={'Add Mandate?'}
          info={'You are about to add a new mandate, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            addBulkMandateMutation.mutate(formattedBulkData);
            closeModal('addBulkMandate');
          }}
        />
      )}

      {modals.confirmAddBulkMandate && (
        <ModalWrapper
          isOpen={modals.confirmAddBulkMandate}
          setIsOpen={() => closeModal('confirmAddBulkMandate')}
          title={'Success!!'}
          info={'You have successfully added a new mandate and your request is pending approval'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('confirmAddBulkMandate');
            navigate(`/${appRoutes.adminDashboard.mandateManagement.index}`);
          }}
        />
      )}
    </>
  );
};

export default CreateMandate;
