import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import FormContentContainer from 'components/common/ItemDetailsContainer/FormContentContainer';
import ButtonComponent from 'components/FormElements/Button';
import CustomInput from 'components/FormElements/CustomInput';
import FormDatePicker from 'components/FormElements/FormDatePicker';
import { useFormik } from 'formik';
import { ModalWrapper } from 'hoc/ModalWrapper';
import { useState } from 'react';
import ChevronDown from 'assets/icons/ChevronDown';
import { useNavigate } from 'react-router-dom';
import appRoutes from 'utils/constants/routes';
import CustomFileUpload from 'components/FormElements/CustomFileUpload';
import { addSingleMandateSchema } from 'utils/formValidators';
import FormSelect from 'components/FormElements/FormSelect';

const SingleUpload = () => {
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
    initialValues: {
      mandateType: '',
      merchantId: '',
      startDate: '',
      endDate: '',
      supportingDocument: '',
    },
    validationSchema: addSingleMandateSchema,
    onSubmit: (values: any) => {
      openModal('confirmCreate');
    },
  });

  const dayToApplyOptions = [
    { value: 'Day 1', label: 'Day 1' },
    { value: 'Day 2', label: 'Day 2' },
    { value: 'Day 3', label: 'Day 3' },
    { value: 'Day 4', label: 'Day 4' },
  ];
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
                    <div className="flex items-center gap-2 rounded-lg bg-lilacPurple px-4 py-3">
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
                        <label htmlFor="variable">
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
                    </div>
                  </div>
                </>
              }
            >
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="merchantId"
                  label="Merchant ID"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="merchantCode"
                  label="Merchant Code"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="productId"
                  label="Product ID"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="amount"
                  label="Amount"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                />
              </div>
              <div className="w-full md:col-span-1">
                <FormDatePicker name={'startDate'} formik={formik} label="Start Date" />
              </div>
              <div className="w-full md:col-span-1">
                <FormDatePicker name={'endDate'} formik={formik} label="End Date" />
              </div>
              <div className="md:col-span-1">
                <FormSelect
                  labelFor="dayToApply"
                  label="Day to Apply"
                  formik={formik}
                  options={dayToApplyOptions}
                />
              </div>
              <div className="md:col-span-1">
                <FormSelect
                  labelFor="frequency"
                  label="Frequency"
                  formik={formik}
                  options={dayToApplyOptions}
                />
              </div>
              <div className="md:col-span-1">
                <FormSelect
                  labelFor="service"
                  label="Service"
                  formik={formik}
                  options={dayToApplyOptions}
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="accountName"
                  label="Account Name"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="accountNumber"
                  label="Account Number"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="bankCode"
                  label="Bank Code"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
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
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="payerEmailAddress"
                  label="Payer Email Address"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="payerPhoneNumber"
                  label="Payer Phone Number"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                />
              </div>
              <div className="w-full md:col-span-3">
                <CustomInput
                  labelFor="payerAddress"
                  label="Address"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
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
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="payeeEmailAddress"
                  label="Payee Email Address"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="payeePhoneNumber"
                  label="Payee Phone Number"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                />
              </div>
              <div className="w-full md:col-span-3">
                <CustomInput
                  labelFor="payeeAddress"
                  label="Address"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
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
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="billerId"
                  label="Biller Id"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="billerAccountNumber"
                  label="Biller Account Number"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="billerAccountName"
                  label="Account Name"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="billerBankCode"
                  label="Bank Code"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                />
              </div>
              <div className="w-full md:col-span-1">
                <CustomInput
                  labelFor="billerBankName"
                  label="Bank Name"
                  inputType="text"
                  placeholder="Enter here"
                  maxW="w-full"
                />
              </div>
            </FormContentContainer>
          </div>
          <div className="mt-10">
            <div className="flex w-full items-center justify-end gap-4">
              <div className="w-auto">
                <ButtonComponent
                  color="purplePrimary"
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
          info={'You have successfully added a new mandate'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('creationSuccessful');
            navigate(`/${appRoutes.adminDashboard.mandateManagement.index}`);
          }}
        />
      )}
    </>
  );
};

export default SingleUpload;
