import { Link, useLocation, useNavigate } from 'react-router-dom';
import appRoutes from 'utils/constants/routes';
import ChevronRight from 'assets/icons/ChevronRight';
import CustomInput from 'components/FormElements/CustomInput';
import ButtonComponent from 'components/FormElements/Button';
import { useEffect, useState } from 'react';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import { ModalWrapper } from 'hoc/ModalWrapper';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import { checkRoute } from 'utils/helpers';
import { useFormik } from 'formik';
import { editMerchantSchema } from 'utils/formValidators';

const EditMerchant = () => {
  const { pathname } = useLocation();
  const isDashboardRoute = checkRoute(pathname, 'dashboard');

  const navigate = useNavigate();
  const [modals, setModals] = useState({
    confirmEditMerchant: false,
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
      merchantCode: '',
      merchantCIF: '',
    },
    validationSchema: editMerchantSchema,
    onSubmit: (values) => {
      openModal('confirmEditMerchant');
    },
  });

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
                    labelFor="merchantId"
                    label="Merchant ID"
                    inputType="text"
                    placeholder="Enter here"
                    maxW="w-full"
                    formik={formik}
                  />
                  <CustomInput
                    labelFor="merchantName"
                    label="Merchant Name"
                    inputType="text"
                    placeholder="Enter here"
                    maxW="w-full"
                    formik={formik}
                  />
                  <CustomInput
                    labelFor="merchantCode"
                    label="Merchant Code"
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
      {modals.confirmEditMerchant && (
        <ModalWrapper
          isOpen={modals.confirmEditMerchant}
          setIsOpen={() => closeModal('confirmEditMerchant')}
          title={'Save Changes?'}
          info={
            'You are about to save changes made to this merchant, would you want to proceed with this?'
          }
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            closeModal('confirmEditMerchant');
            openModal('editSuccessful');
          }}
        />
      )}

      {modals.editSuccessful && (
        <ModalWrapper
          isOpen={modals.editSuccessful}
          setIsOpen={() => closeModal('editSuccessful')}
          title={'Success!!'}
          info={'You have successfully saved new changes'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
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
