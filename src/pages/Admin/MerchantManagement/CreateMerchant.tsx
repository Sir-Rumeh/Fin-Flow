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
import { onboardMerchantSchema } from 'utils/formValidators';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addMerchantRequest, validateMerchantCif } from 'config/actions/merchant-actions';
import { MerchantRequest } from 'utils/interfaces';
import { notifyError } from 'utils/helpers';

const CreateMerchant = () => {
  const [merchantRequest, setMerchantRequest] = useState<MerchantRequest | undefined>();
  const navigate = useNavigate();
  const [modals, setModals] = useState({
    confirmOnboardMerchant: false,
    onboardingSuccessful: false,
  });

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };
  const [merchantCifValidated, setMerchantCifValidated] = useState(false);
  const [validatedMerchantCif, setValidatedMerchantCif] = useState('');

  const formik = useFormik({
    initialValues: {
      merchantCIF: '',
      merchantName: '',
      accountNumber: '',
      rcNumber: '',
      address: '',
      merchantFee: '',
      merchantCifValidated,
    },
    validationSchema: onboardMerchantSchema,
    onSubmit: (values) => {
      console.log(values.merchantCIF);

      const payload = {
        merchantId: '',
        name: values.merchantName,
        accountNumber: values.accountNumber,
        rcNumber: values.rcNumber,
        address: values.address,
        InternalChargeFee: parseFloat(values.merchantFee),
        cif: values.merchantCIF,
        // cif: validatedMerchantCif,
      };
      setMerchantRequest(payload);
      openModal('confirmOnboardMerchant');
    },
  });

  const validateCifStatus = async () => {
    const res = await validateMerchantCif(formik.values.accountNumber);
    if (res.responseData) {
      setMerchantCifValidated(true);
      setValidatedMerchantCif(res.responseData?.cif);
      formik.setFieldValue('rcNumber', res.responseData?.rcNo || '');
      formik.setFieldValue('rcNumber', res.responseData?.rcNo || '');
      formik.setFieldValue('merchantCIF', res.responseData?.cif || '');
    }
  };

  const addMerchantRequestMutation = useMutation({
    mutationFn: (payload: MerchantRequest | undefined) => addMerchantRequest(payload),
    onSuccess: () => {
      closeModal('confirmOnboardMerchant');
      openModal('onboardingSuccessful');
    },
    onError: (error) => {
      closeModal('confirmOnboardMerchant');
    },
  });

  return (
    <>
      <div className="px-5 py-1">
        <div className="slide-down mt-2 flex items-center gap-2 text-lg">
          <Link
            to={`/${appRoutes.adminDashboard.merchantManagement.index}`}
            className="cursor-pointer text-darkgray"
          >
            Merchant Management
          </Link>{' '}
          <ChevronRight />
          <span className="text-lightPurple">Onboard Merchant</span>
        </div>
        <div className="slide-down mt-3 flex items-center justify-between">
          <h2 className="mt-3 text-xl font-semibold">Onboard Merchant</h2>
        </div>
        <div className="slide-down mt-5 rounded-lg bg-white px-5 py-10">
          <div className="w-full rounded-[5px] border-[3px] border-grayPrimary px-6 py-8 2xl:w-[80%]">
            <form onSubmit={formik.handleSubmit} noValidate className="relative w-full">
              <div className="mt-6 flex flex-col items-end gap-x-8 gap-y-4 md:flex-row md:items-center md:justify-between">
                <div className="w-full md:w-[80%]">
                  <CustomInput
                    labelFor="accountNumber"
                    label="Enter Merchant Account Number"
                    inputType="number"
                    placeholder="Enter here"
                    maxW="w-full"
                    formik={formik}
                    useTouched={false}
                    verticalMargin={false}
                    // disabled={merchantCifValidated && validatedMerchantCif.length > 0}
                  />
                </div>
                <ButtonComponent
                  variant="contained"
                  color="white"
                  backgroundColor="#5C068C"
                  hoverBackgroundColor="#2F0248"
                  type="button"
                  title="Continue"
                  customPaddingX="2rem"
                  onClick={() => {
                    if (!formik.values.accountNumber)
                      return formik.setFieldError('merchantCIF', 'Merchant CIF is required');
                    validateCifStatus();
                  }}
                  disabled={merchantCifValidated}
                />
              </div>
              {merchantCifValidated && (
                <div className="slide-down mt-12">
                  <div className="relative grid w-full grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
                    <CustomInput
                      labelFor="merchantName"
                      label="Merchant Name"
                      inputType="text"
                      placeholder="Enter here"
                      maxW="w-full"
                      formik={formik}
                    />
                    <CustomInput
                      labelFor="merchantCIF"
                      label="Merchant CIF"
                      inputType="text"
                      placeholder="Enter here"
                      maxW="w-full"
                      formik={formik}
                    />
                    <CustomInput
                      labelFor="rcNumber"
                      label="RC Number"
                      inputType="text"
                      placeholder="Enter here"
                      maxW="w-full"
                      formik={formik}
                    />
                    <CustomInput
                      labelFor="merchantFee"
                      label="Merchant Fee"
                      inputType="text"
                      placeholder="Enter here"
                      maxW="w-full"
                      formik={formik}
                    />
                    <div className="col-span-2">
                      <CustomInput
                        labelFor="address"
                        label="Address"
                        inputType="text"
                        placeholder="Enter here"
                        maxW="w-full"
                        formik={formik}
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-end">
                    <ButtonComponent
                      variant="contained"
                      color="white"
                      backgroundColor="#5C068C"
                      hoverBackgroundColor="#2F0248"
                      type="submit"
                      title="Onboard Merchant"
                      height="3rem"
                      customPaddingX="1.4rem"
                    />
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      {modals.confirmOnboardMerchant && (
        <ModalWrapper
          isOpen={modals.confirmOnboardMerchant}
          setIsOpen={() => closeModal('confirmOnboardMerchant')}
          title={'Onboard Merchant?'}
          info={'You are about to onboard this merchant, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          loading={addMerchantRequestMutation.isPending}
          proceedAction={() => {
            closeModal('confirmOnboardMerchant');
            addMerchantRequestMutation.mutate(merchantRequest);
            console.log(merchantRequest);
          }}
        />
      )}

      {modals.onboardingSuccessful && (
        <ModalWrapper
          isOpen={modals.onboardingSuccessful}
          setIsOpen={() => closeModal('onboardingSuccessful')}
          title={'Success!!'}
          info={'You have successfully onboarded this merchant'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            formik.resetForm();
            closeModal('onboardingSuccessful');
            navigate(`/${appRoutes.adminDashboard.merchantManagement.index}`);
          }}
        />
      )}
    </>
  );
};

export default CreateMerchant;
