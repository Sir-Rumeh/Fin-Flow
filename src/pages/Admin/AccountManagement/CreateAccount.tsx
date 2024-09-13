import { Link, useNavigate } from 'react-router-dom';
import appRoutes from 'utils/constants/routes';
import ChevronRight from 'assets/icons/ChevronRight';
import CustomInput from 'components/FormElements/CustomInput';
import ButtonComponent from 'components/FormElements/Button';
import { useState } from 'react';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import { ModalWrapper } from 'hoc/ModalWrapper';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import { useFormik } from 'formik';

function CreateAccount() {
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
    initialValues: {},

    onSubmit: (values) => {
      openModal('confirmCreate');
    },
  });

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
          <span className="text-lightPurple">Add Account</span>
        </div>
        <div className="slide-down mt-3 flex items-center justify-between">
          <h2 className="mt-3 text-xl font-semibold">Add New Account </h2>
        </div>
        <div className="slide-down mt-5 rounded-lg bg-white px-5 py-10">
          <div className="rounded-[5px] border-[3px] border-grayPrimary px-6 py-8">
            <form onSubmit={formik.handleSubmit} noValidate className="relative w-full 2xl:w-[80%]">
              <div className="slide-down">
                <div className="relative grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
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
                    labelFor="cif"
                    label="CIF"
                    inputType="text"
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

                  <div className="md:col-span-2">
                    <CustomInput
                      labelFor="accountNumber"
                      label="Account Number"
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
                    title="Add Account"
                    width="10rem"
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
          title={'Add Account?'}
          info={'You are about to add this account, would you want to proceed with this?'}
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
          info={'You have successfully added this account'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('creationSuccessful');
            navigate(`/${appRoutes.adminDashboard.accountManagement.index}`);
          }}
        />
      )}
    </>
  );
}

export default CreateAccount;
