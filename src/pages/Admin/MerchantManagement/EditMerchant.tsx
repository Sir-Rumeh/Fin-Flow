import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import appRoutes from 'utils/constants/routes';
import ChevronRight from 'assets/icons/ChevronRight';
import CustomInput from 'components/FormElements/CustomInput';
import ButtonComponent from 'components/FormElements/Button';
import { useEffect, useState } from 'react';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import { ModalWrapper } from 'hoc/ModalWrapper';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import { checkRoute, notifyError } from 'utils/helpers';
import { useFormik } from 'formik';
import { editMerchantSchema } from 'utils/formValidators';
import { MerchantRequest } from 'utils/interfaces';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getMerchantById, updateMerchantRequest } from 'config/actions/merchant-actions';

const EditMerchant = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const merchantId = searchParams?.get('id') || '';
  const isDashboardRoute = checkRoute(pathname, 'dashboard');
  const [merchantRequest, setMerchantRequest] = useState<MerchantRequest | undefined>();

  const navigate = useNavigate();
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

  const updateMerchantRequestMutation = useMutation({
    mutationFn: (requestId: string | undefined) =>
      updateMerchantRequest(requestId, merchantRequest),
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
      merchantName: '',
      accountNumber: '',
      rcNumber: '',
      address: '',
    },
    validationSchema: editMerchantSchema,
    onSubmit: (values) => {
      const payload = {
        name: values.merchantName,
        accountNumber: values.accountNumber,
        rcNumber: values.rcNumber,
        address: values.address,
      };
      setMerchantRequest(payload);
      openModal('confirmEdit');
    },
  });

  const { data: merchantData } = useQuery({
    queryKey: ['merchants', merchantId],
    queryFn: ({ queryKey }) => getMerchantById(queryKey[1]),
  });

  useEffect(() => {
    formik.setValues({
      merchantName: merchantData?.responseData?.name || '',
      accountNumber: merchantData?.responseData?.accountNumber || '',
      rcNumber: merchantData?.responseData?.rcNumber || '',
      address: merchantData?.responseData?.address || '',
    });
  }, [merchantData]);

  return (
    <>
      <div className="px-5 py-1">
        <div className="slide-down mt-2 flex items-center gap-2 text-lg">
          <Link
            to={
              isDashboardRoute
                ? `/${appRoutes.adminDashboard.dashboard.index}`
                : `/${appRoutes.adminDashboard.merchantManagement.index}`
            }
            className="cursor-pointer text-darkgray"
          >
            {isDashboardRoute ? 'Dashboard' : 'Merchant Management'}
          </Link>{' '}
          <ChevronRight />
          <span className="text-lightPurple">Edit Merchant</span>
        </div>
        <div className="slide-down mt-3 flex items-center justify-between">
          <h2 className="mt-3 text-xl font-semibold">Modify Merchant Details</h2>
        </div>
        <div className="slide-down mt-5 rounded-lg bg-white px-5 py-10">
          <div className="w-full rounded-[5px] border-[3px] border-grayPrimary px-6 py-8 2xl:w-[80%]">
            <form onSubmit={formik.handleSubmit} noValidate className="relative w-full">
              <div className="slide-down">
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
                    labelFor="accountNumber"
                    label="Account Number"
                    inputType="text"
                    mode="numeric"
                    pattern="\d*"
                    placeholder="Enter here"
                    maxW="w-full"
                    formik={formik}
                    disabled
                  />
                  <CustomInput
                    labelFor="rcNumber"
                    label="RC Number"
                    inputType="text"
                    placeholder="Enter here"
                    maxW="w-full"
                    formik={formik}
                    disabled
                  />
                  <CustomInput
                    labelFor="address"
                    label="Address"
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
                    width="8rem"
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
            'You are about to save changes made to this merchant, would you want to proceed with this?'
          }
          icon={<RedAlertIcon />}
          type={'confirmation'}
          loading={updateMerchantRequestMutation.isPending}
          proceedAction={() => {
            closeModal('confirmEdit');
            updateMerchantRequestMutation.mutate(merchantId);
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
            navigate(
              isDashboardRoute
                ? `/${appRoutes.adminDashboard.dashboard.index}`
                : `/${appRoutes.adminDashboard.merchantManagement.index}`,
            );
          }}
        />
      )}
    </>
  );
};

export default EditMerchant;
