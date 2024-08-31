import { Link, useLocation, useNavigate } from 'react-router-dom';
import appRoutes from 'utils/constants/routes';
import { BiChevronRight } from 'react-icons/bi';
import CustomInput from 'components/FormElements/CustomInput';
import ButtonComponent from 'components/FormElements/Button';
import { useState } from 'react';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import { ModalWrapper } from 'hoc/ModalWrapper';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import { checkRoute } from 'utils/helpers';

const EditMerchant = () => {
  const { pathname } = useLocation();
  const isDashboardRoute = checkRoute(pathname, 'dashboard');

  const navigate = useNavigate();
  const [modals, setModals] = useState({
    confirmeditMerchant: false,
    editSuccessful: false,
  });

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };
  return (
    <>
      <div className="px-5 py-1">
        <div className="slide-down flex items-center gap-2 text-lg">
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
          <BiChevronRight className="h-5 w-5 text-darkgray" />{' '}
          <span className="text-lightPurple">Edit Merchant</span>
        </div>
        <div className="slide-down mt-4 flex items-center justify-between">
          <h2 className="mt-3 text-xl font-semibold">Modify Merchant Details</h2>
        </div>
        <div className="slide-down mt-5 rounded-lg bg-white px-5 py-10">
          <div className="rounded-[5px] border-[3px] border-grayPrimary px-6 py-8">
            <div className="relative md:w-[80%] xl:w-[70%]">
              <div className="slide-down">
                <div className="relative grid w-full grid-cols-1 gap-10 md:grid-cols-2">
                  <CustomInput
                    labelFor="merchantId"
                    label="Merchant ID"
                    inputType="text"
                    placeholder="Enter here"
                    maxW="w-full"
                  />
                  <CustomInput
                    labelFor="merchantName"
                    label="Merchant Name"
                    inputType="text"
                    placeholder="Enter here"
                    maxW="w-full"
                  />
                  <CustomInput
                    labelFor="merchantCode"
                    label="Merchant Code"
                    inputType="text"
                    placeholder="Enter here"
                    maxW="w-full"
                  />
                  <CustomInput
                    labelFor="cif"
                    label="CIF"
                    inputType="text"
                    placeholder="Enter here"
                    maxW="w-full"
                  />
                </div>
                <div className="mt-10 flex items-center justify-end">
                  <ButtonComponent
                    variant="contained"
                    color="white"
                    backgroundColor="#5C068C"
                    hoverBackgroundColor="#2F0248"
                    type="button"
                    title="Save"
                    height="3rem"
                    width="8rem"
                    customPaddingX="1.4rem"
                    onClick={() => {
                      openModal('confirmeditMerchant');
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modals.confirmeditMerchant && (
        <ModalWrapper
          isOpen={modals.confirmeditMerchant}
          setIsOpen={() => closeModal('confirmeditMerchant')}
          title={'Save Changes?'}
          info={
            'You are about to save changes made to this merchant, would you want to proceed with this?'
          }
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            closeModal('confirmeditMerchant');
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
