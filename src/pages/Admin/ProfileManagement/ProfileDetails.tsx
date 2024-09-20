import { Link, createSearchParams, useSearchParams, useNavigate } from 'react-router-dom';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import ChevronRight from 'assets/icons/ChevronRight';
import ItemDetailsContainer from 'components/common/ItemDetailsContainer';
import appRoutes from 'utils/constants/routes';
import ApprovedIcon from 'assets/icons/ApprovedIcon';
import CustomPopover from 'hoc/PopOverWrapper';
import { useState } from 'react';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import DetailsActionButton from 'components/common/DetailsActionButton';

const ProfileDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams?.get('id') || '';

  let profileStatus = 'Disabled';

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
            to={`/${appRoutes.adminDashboard.profileManagement.index}`}
            className="cursor-pointer text-darkgray"
          >
            Profile Management
          </Link>{' '}
          <ChevronRight />
          <span className="text-lightPurple">Profile Details</span>
        </div>
        <div className="slide-down mt-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold md:text-2xl">Profile ID : Req123456</h2>
          </div>
          <div className="w-auto">
            <CustomPopover
              popoverId={1}
              buttonIcon={<DetailsActionButton />}
              translationX={8}
              translationY={54}
            >
              <div className="flex w-[7.2rem] flex-col rounded-md p-1">
                <button
                  onClick={() =>
                    navigate({
                      pathname: `/${appRoutes.adminDashboard.profileManagement.editProfile}`,
                      search: `?${createSearchParams({ id })}`,
                    })
                  }
                  type="button"
                  className="w-full px-3 py-2 text-start font-[600] hover:bg-purpleSecondary"
                >
                  Edit Details
                </button>
                {profileStatus === 'Enabled' && (
                  <button
                    type="button"
                    onClick={() => openModal('confirmDisable')}
                    className="w-full px-3 py-2 text-start font-[600] text-red-400 hover:bg-purpleSecondary"
                  >
                    Disable
                  </button>
                )}
                {profileStatus === 'Disabled' && (
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
          <div className="">
            <ItemDetailsContainer title="Profile Details">
              <DetailsCard title="Account Name" content="Fair Money" />
              <DetailsCard title="Merchant ID" content="12345" />
              <DetailsCard title="Full Name" content="John Doe" />
              <DetailsCard title="Merchant Name" content="Fair Money" />
              <DetailsCard title="Account Id" content="8907812345" />
              <DetailsCard title="Email" content="johndoe@gmail.com" />
              <DetailsCard title="CIF Number" content="12345" />
              <DetailsCard title="Role" content="Maker" />
              <DetailsCard title="Date Requested" content="12/12/2024 : 03:00pm" />
            </ItemDetailsContainer>
          </div>
          <div className="mt-10">
            <ItemDetailsContainer title="Creator Details">
              <DetailsCard title="Created By" content="John Doe" />
              <DetailsCard title="Date Created" content="12/12/2024 : 03:00pm" />
              <DetailsCard title="ID" content="9344243" />
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
          title={'Disable Profile?'}
          info={'You are about to disable this profile, would you want to proceed with this?'}
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
          info={'You have successfully disabled this profile'}
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
          title={'Enable Profile?'}
          info={'You are about to enable this profile, would you want to proceed with this?'}
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
          info={'You have successfully enabled this profile'}
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
          title={'Delete Profile?'}
          info={'You are about to delete this profile, would you want to proceed with this?'}
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
          info={'You have successfully deleted this profile'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('deleteSuccessful');
            navigate(`/${appRoutes.adminDashboard.profileManagement.index}`);
          }}
        />
      )}
    </>
  );
};

export default ProfileDetails;
