import {
  Link,
  useLocation,
  createSearchParams,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import { CreationRequestIcon, DeleteRequestIcon, UpdateRequestIcon } from 'assets/icons';
import ChevronRight from 'assets/icons/ChevronRight';
import ItemDetailsContainer from 'components/common/ItemDetailsContainer';
import appRoutes from 'utils/constants/routes';
import DashboardCard from 'components/common/DashboardCards/DashboardCard';
import { checkRoute } from 'utils/helpers';
import SubTitleIconGreen from 'assets/icons/SubTitleIconGreen';
import SubTitleIconYellow from 'assets/icons/SubTitleIconYellow';
import ApprovedIcon from 'assets/icons/ApprovedIcon';
import ButtonComponent from 'components/FormElements/Button';
import WhiteArrowDown from 'assets/icons/WhiteArrowDown';
import CustomPopover from 'hoc/PopOverWrapper';
import { useState } from 'react';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';

const MerchantDetails = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isDashboardRoute = checkRoute(pathname, 'dashboard');
  const [searchParams] = useSearchParams();
  const id = searchParams?.get('id') || '';
  let merchantStatus = 'Enabled';

  const [modals, setModals] = useState({
    confirmDisableMerchant: false,
    disableSuccessful: false,
    confirmEnableMerchant: false,
    enableSuccessful: false,
    confirmDeleteMerchant: false,
    deleteSuccessful: false,
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
        <div className="mt-2 flex items-center gap-2 text-lg">
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
          <span className="text-lightPurple">Merchant Details</span>
        </div>
        <div className="slide-down mt-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold md:text-2xl">Merchant ID : Req123456</h2>
          </div>
          <div className="w-auto">
            <CustomPopover
              popoverId={1}
              buttonIcon={
                <ButtonComponent
                  variant="contained"
                  color="white"
                  backgroundColor="#5C068C"
                  hoverBackgroundColor="#2F0248"
                  endIcon={<WhiteArrowDown />}
                  type="button"
                  title="Actions"
                  customPaddingX="1.4rem"
                />
              }
              translationX={8}
              translationY={54}
            >
              <div className="flex w-[8rem] flex-col rounded-md p-1">
                <button
                  onClick={() =>
                    navigate({
                      pathname: isDashboardRoute
                        ? `/${appRoutes.adminDashboard.dashboard.editMerchant}`
                        : `/${appRoutes.adminDashboard.merchantManagement.editMerchant}`,
                      search: `?${createSearchParams({ id })}`,
                    })
                  }
                  type="button"
                  className="w-full px-3 py-2 text-start font-[600] hover:bg-purpleSecondary"
                >
                  Edit Details
                </button>
                {merchantStatus === 'Enabled' && (
                  <button
                    type="button"
                    onClick={() => openModal('confirmDisableMerchant')}
                    className="w-full px-3 py-2 text-start font-[600] text-red-400 hover:bg-purpleSecondary"
                  >
                    Disable
                  </button>
                )}
                {merchantStatus === 'Disabled' && (
                  <button
                    type="button"
                    onClick={() => openModal('confirmEnableMerchant')}
                    className="w-full px-3 py-2 text-start font-[600] text-green-400 hover:bg-purpleSecondary"
                  >
                    Enable
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => openModal('confirmDeleteMerchant')}
                  className="w-full px-3 py-2 text-start font-[600] text-red-400 hover:bg-purpleSecondary"
                >
                  Delete
                </button>
              </div>
            </CustomPopover>
          </div>
        </div>
        <div className="slide-down mt-5 rounded-lg bg-white px-5 py-8">
          <div className="rounded-lg bg-lilacPurple px-6 py-4">
            <h3 className="text-md font-semibold md:text-xl">Merchant Accounts</h3>
            <div className="mt-4 flex flex-col items-center justify-between gap-6 gap-x-4 md:flex-row">
              <DashboardCard
                title="Total Accounts"
                numberOfRequest={1200}
                backgroundColor="bg-white"
                textColor="text-purplePrimary"
                icon={<SubTitleIconGreen />}
                route={`/${appRoutes.adminDashboard.merchantManagement.index}`}
                // navigate to MerchantAccounts which will import table from Account Management
              />
              <DashboardCard
                title="Total Profiles"
                numberOfRequest={1200}
                backgroundColor="bg-white"
                textColor="text-purplePrimary"
                icon={<SubTitleIconYellow />}
                route={`/${appRoutes.adminDashboard.merchantManagement.index}`}
                // navigate to MerchantProfiles which will import table from Profile Management
              />
              <DashboardCard
                title="Total Mandates"
                numberOfRequest={1200}
                backgroundColor="bg-white"
                textColor="text-purplePrimary"
                icon={<SubTitleIconYellow />}
                route={`/${appRoutes.adminDashboard.merchantManagement.index}`}
                // navigate to MerchantMandates  which will import table from Mandate  Management
              />
            </div>
          </div>
          <div className="mt-10">
            <ItemDetailsContainer
              title="Merchant Details"
              titleExtension={
                <div className="flex items-center justify-end gap-2">
                  <p className="text-sm font-semibold text-darkgray">Status:</p>
                  {merchantStatus === 'Enabled' && (
                    <>
                      <CreationRequestIcon />
                      <p className="mb-[1px] font-semibold text-greenPrimary">{merchantStatus}</p>
                    </>
                  )}
                  {merchantStatus === 'Disabled' && (
                    <>
                      <DeleteRequestIcon />
                      <p className="mb-[1px] font-semibold text-redSecondary">{merchantStatus}</p>
                    </>
                  )}
                </div>
              }
            >
              <DetailsCard title="Merchant ID" content="12345" />
              <DetailsCard title="Merchant Name" content="Fair Money" />
              <DetailsCard title="Merchant Code" content="12345" />
              <DetailsCard title="CIF Number" content="12345" />
              <DetailsCard title="Date Created" content="12/12/2024 : 03:00pm" />
            </ItemDetailsContainer>
          </div>
          <div className="mt-10">
            <ItemDetailsContainer title="Creator Details">
              <DetailsCard title="ID" content="9344243" />
              <DetailsCard title="Created By" content="John Doe" />
              <DetailsCard title="Date Created" content="12/12/2024 : 03:00pm" />
              <DetailsCard title="Address" content="Ozumba Mbadiwe Avenue, Lagos State" />
            </ItemDetailsContainer>
          </div>
          <div className="mt-10">
            <ItemDetailsContainer title="Approver Details" titleExtension={<ApprovedIcon />}>
              <DetailsCard title="ID" content="9344243" />
              <DetailsCard title="Approved By" content="John Doe" />
              <DetailsCard title="Date Approved" content="12/12/2024 : 03:00pm" />
            </ItemDetailsContainer>
          </div>
        </div>
      </div>
      {modals.confirmDisableMerchant && (
        <ModalWrapper
          isOpen={modals.confirmDisableMerchant}
          setIsOpen={() => closeModal('confirmDisableMerchant')}
          title={'Disable Merchant?'}
          info={'You are about to disable this merchant, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            closeModal('confirmDisableMerchant');
            openModal('disableSuccessful');
          }}
        />
      )}
      {modals.disableSuccessful && (
        <ModalWrapper
          isOpen={modals.disableSuccessful}
          setIsOpen={() => closeModal('disableSuccessful')}
          title={'Success!!'}
          info={'You have successfully disabled this merchant'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('disableSuccessful');
          }}
        />
      )}
      {modals.confirmEnableMerchant && (
        <ModalWrapper
          isOpen={modals.confirmEnableMerchant}
          setIsOpen={() => closeModal('confirmEnableMerchant')}
          title={'Enable Merchant?'}
          info={'You are about to enable this merchant, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            closeModal('confirmEnableMerchant');
            openModal('enableSuccessful');
          }}
        />
      )}
      {modals.enableSuccessful && (
        <ModalWrapper
          isOpen={modals.enableSuccessful}
          setIsOpen={() => closeModal('enableSuccessful')}
          title={'Success!!'}
          info={'You have successfully enabled this merchant'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('enableSuccessful');
          }}
        />
      )}
      {modals.confirmDeleteMerchant && (
        <ModalWrapper
          isOpen={modals.confirmDeleteMerchant}
          setIsOpen={() => closeModal('confirmDeleteMerchant')}
          title={'Delete Merchant?'}
          info={'You are about to delete this merchant, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            closeModal('confirmDeleteMerchant');
            openModal('deleteSuccessful');
          }}
        />
      )}
      {modals.deleteSuccessful && (
        <ModalWrapper
          isOpen={modals.deleteSuccessful}
          setIsOpen={() => closeModal('deleteSuccessful')}
          title={'Success!!'}
          info={'You have successfully deleted this merchant'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('deleteSuccessful');
            navigate(
              `${isDashboardRoute ? `/${appRoutes.adminDashboard.dashboard.index}` : `/${appRoutes.adminDashboard.merchantManagement.index}`} `,
            );
          }}
        />
      )}
    </>
  );
};

export default MerchantDetails;
