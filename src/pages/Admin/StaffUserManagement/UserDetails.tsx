import { Link, createSearchParams, useSearchParams, useNavigate } from 'react-router-dom';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import ChevronRight from 'assets/icons/ChevronRight';
import ItemDetailsContainer from 'components/common/ItemDetailsContainer';
import appRoutes from 'utils/constants/routes';
import ApprovedIcon from 'assets/icons/ApprovedIcon';
import ButtonComponent from 'components/FormElements/Button';
import WhiteArrowDown from 'assets/icons/WhiteArrowDown';
import CustomPopover from 'hoc/PopOverWrapper';
import { useState } from 'react';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import DashboardCard from 'components/common/DashboardCards/DashboardCard';
import SubTitleIconYellow from 'assets/icons/SubTitleIconYellow';

const UserDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams?.get('id') || '';

  let accountStatus = 'Disabled';

  const [modals, setModals] = useState({
    confirmDisable: false,
    disableSuccessful: false,
    confirmEnable: false,
    enableSuccessful: false,
    confirmDelete: false,
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
            to={`/${appRoutes.adminDashboard.accountManagement.index}`}
            className="cursor-pointer text-darkgray"
          >
            Account Management
          </Link>{' '}
          <ChevronRight />
          <span className="text-lightPurple">Account Details</span>
        </div>
        <div className="slide-down mt-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold md:text-2xl">Account ID : Req123456</h2>
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
                      pathname: `/${appRoutes.adminDashboard.accountManagement.editAccount}`,
                      search: `?${createSearchParams({ id })}`,
                    })
                  }
                  type="button"
                  className="w-full px-3 py-2 text-start font-[600] hover:bg-purpleSecondary"
                >
                  Edit Details
                </button>
                {accountStatus === 'Enabled' && (
                  <button
                    type="button"
                    onClick={() => openModal('confirmDisable')}
                    className="w-full px-3 py-2 text-start font-[600] text-red-400 hover:bg-purpleSecondary"
                  >
                    Disable
                  </button>
                )}
                {accountStatus === 'Disabled' && (
                  <button
                    type="button"
                    onClick={() => openModal('confirmEnable')}
                    className="w-full px-3 py-2 text-start font-[600] text-green-400 hover:bg-purpleSecondary"
                  >
                    Enable
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => openModal('confirmDelete')}
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
                title="Total Profiles"
                numberOfRequest={1200}
                backgroundColor="bg-white"
                textColor="text-purplePrimary"
                icon={<SubTitleIconYellow />}
                route={`/${appRoutes.adminDashboard.accountManagement.index}`}
                // navigate to MerchantProfiles which will import table from Profile Management
              />
              <DashboardCard
                title="Total Mandates"
                numberOfRequest={1200}
                backgroundColor="bg-white"
                textColor="text-purplePrimary"
                icon={<SubTitleIconYellow />}
                route={`/${appRoutes.adminDashboard.accountManagement.index}`}
                // navigate to MerchantMandates  which will import table from Mandate  Management
              />
            </div>
          </div>
          <div className="mt-10">
            <ItemDetailsContainer title="Account Details">
              <DetailsCard title="Merchant ID" content="12345" />
              <DetailsCard title="Merchant Name" content="Fair Money" />
              <DetailsCard title="Date Created" content="12/12/2024 : 03:00pm" />
              <DetailsCard title="CIF Number" content="12345" />
              <DetailsCard title="Account Number" content="8907812345" />
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
      {modals.confirmDisable && (
        <ModalWrapper
          isOpen={modals.confirmDisable}
          setIsOpen={() => closeModal('confirmDisable')}
          title={'Disable Account?'}
          info={'You are about to disable this account, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            closeModal('confirmDisable');
            openModal('disableSuccessful');
          }}
        />
      )}
      {modals.disableSuccessful && (
        <ModalWrapper
          isOpen={modals.disableSuccessful}
          setIsOpen={() => closeModal('disableSuccessful')}
          title={'Success!!'}
          info={'You have successfully disabled this account'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('disableSuccessful');
          }}
        />
      )}
      {modals.confirmEnable && (
        <ModalWrapper
          isOpen={modals.confirmEnable}
          setIsOpen={() => closeModal('confirmEnable')}
          title={'Enable Account?'}
          info={'You are about to enable this account, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            closeModal('confirmEnable');
            openModal('enableSuccessful');
          }}
        />
      )}
      {modals.enableSuccessful && (
        <ModalWrapper
          isOpen={modals.enableSuccessful}
          setIsOpen={() => closeModal('enableSuccessful')}
          title={'Success!!'}
          info={'You have successfully enabled this account'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('enableSuccessful');
          }}
        />
      )}
      {modals.confirmDelete && (
        <ModalWrapper
          isOpen={modals.confirmDelete}
          setIsOpen={() => closeModal('confirmDelete')}
          title={'Delete Account?'}
          info={'You are about to delete this account, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            closeModal('confirmDelete');
            openModal('deleteSuccessful');
          }}
        />
      )}
      {modals.deleteSuccessful && (
        <ModalWrapper
          isOpen={modals.deleteSuccessful}
          setIsOpen={() => closeModal('deleteSuccessful')}
          title={'Success!!'}
          info={'You have successfully deleted this account'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('deleteSuccessful');
            navigate(`/${appRoutes.adminDashboard.accountManagement.index}`);
          }}
        />
      )}
    </>
  );
};

export default UserDetails;
